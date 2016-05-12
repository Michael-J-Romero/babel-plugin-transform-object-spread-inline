# babel-plugin-transform-object-spread-inline [![npm version](https://badge.fury.io/js/babel-plugin-transform-object-spread-inline.svg)](https://badge.fury.io/js/babel-plugin-transform-object-spread-inline)

> Transpiles object spread to fast inline code.

```js
a = { b, c, ...d, e, f: 42 };
```

Converted to:

```js
"use strict";
var _keys,
    _l,
    _i,
    _source,
    _key,
    _result = {};

_result.b = b
_result.c = c

for (_source = d, _keys = Object.keys(_source), _l = _keys.length, _i = 0; _i < _l; _i++) {
  _key = _keys[_i];
  _result[_key] = _source[_key];
}

_result.e = e
_result.f = 42
a = _result;
```

Instead of:
```js
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

a = _extends({ b: b, c: c }, d, { e: e, f: 42 });
```

**Warning**: This plugin doesn't transpile object rest syntax.
