## [`swc-walk`](https://www.npmjs.com/package/swc-walk)

![CI](https://github.com/morganney/swc-walk/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/morganney/swc-walk/graph/badge.svg?token=C3C73MY1ZT)](https://codecov.io/gh/morganney/swc-walk)
[![NPM version](https://img.shields.io/npm/v/swc-walk.svg)](https://www.npmjs.com/package/swc-walk)

Walk an AST from SWC and visit each node type.

## Requirements

- AST is as defined by [`@swc/types`](https://github.com/swc-project/swc/tree/main/packages/types).

## Example

`swc-walk` wraps [`acorn-walk`](https://github.com/acornjs/acorn/blob/master/acorn-walk/README.md) walkers.

```ts
import { simple } from 'swc-walk'
import { parseSync } from '@swc/core'
import assert from 'node:assert/strict'

type WalkState = {
  [k: string]: string
}
const state = {
  search: 'const foo',
}
const ast = parseSync('const foo: string = "bar"', { syntax: 'typescript' })

simple<WalkState>(
  ast,
  {
    VariableDeclaration(node, state) {
      assert.equal(node.type, 'VariableDeclaration')
      assert.ok(typeof state.search === 'string')
    },
  },
  undefined,
  state,
)
```
