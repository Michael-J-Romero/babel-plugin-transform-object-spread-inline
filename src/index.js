import 'better-log/install';
import template from "babel-template";
const buildBegin = template(`
	var KEYS, L, I, SOURCE, KEY, RESULT = {};
`);
const buildFor = template(`
	for(
		SOURCE = OBJECT,
		KEYS = Object.keys(SOURCE),
		L = KEYS.length,
		I = 0;

		I < L;

		I++
	) {
		KEY = KEYS[I];
		RESULT[KEY] = SOURCE[KEY];
	}
`);

export default function({
	types: t
}) {
	function hasSpread(node) {
		for (let prop of node.properties) {
			if (t.isSpreadProperty(prop)) {
				return true;
			}
		}
		return false;
	}

	return {
		inherits: require("babel-plugin-syntax-object-rest-spread"),

		visitor: {
			RestElement(path) {
				console.log(path)
			},

			ObjectExpression(path, file) {
				if (!hasSpread(path.node)) return;
				const generated = [];
				const vars = {};

				for(const varName of ['L', 'I', 'SOURCE', 'KEYS', 'KEY', 'RESULT']) {
					vars[varName] = path.scope.generateUidIdentifier(varName.toLowerCase())
				}

				generated.push(buildBegin(vars));

				for (let prop of path.node.properties) {
					if (t.isSpreadProperty(prop)) {
						generated.push(buildFor(Object.assign(vars, {
							OBJECT: prop.argument
						})));
					} else {
						// TODO how to add semicolon?
						generated.push(t.assignmentExpression(
							'=',
							t.memberExpression(
								vars.RESULT,
								prop.key
							),
							prop.value
						));
					}
				}

				let myPath = path;

				while(path.scope.path != myPath.parentPath) {
					myPath = myPath.parentPath;
				}

				myPath.insertBefore(generated);

				path.replaceWith(vars.RESULT);
			}
		}
	};
}
