# babel-plugin-transform-object-spread-inline [![npm version](https://badge.fury.io/js/babel-plugin-transform-object-spread-inline.svg)](https://badge.fury.io/js/babel-plugin-transform-object-spread-inline)

> Transpiles object spread into fast inline code.

```js
a = { b, c, ...d, e, f };
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

**Warning**: This plugin doesn't transpile object rest syntax.
