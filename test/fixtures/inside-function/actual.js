function test1() {
	return function test2() {
		var foo = 'bar';
		const a = ({ b, c, ...d, e, f: 42 });
	}
}
