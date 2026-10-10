## [`swc-walk`](https://www.npmjs.com/package/swc-walk)

![CI](https://github.com/morganney/swc-walk/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/morganney/swc-walk/graph/badge.svg?token=C3C73MY1ZT)](https://codecov.io/gh/morganney/swc-walk)
[![NPM version](https://img.shields.io/npm/v/swc-walk.svg)](https://www.npmjs.com/package/swc-walk)

Walk an AST from SWC and visit each node type.

## Requirements

- Node.js 22.x, 24.x, or 26.x.
- v3 targets the AST emitted by `@swc/core` 1.16.13; use that version or a later release with a compatible AST shape.
- Types are based on [`@swc/types`](https://github.com/swc-project/swc/tree/main/packages/types), with local corrections for function bodies and object accessors.
- Older SWC AST shapes are not part of the v3 compatibility contract.

## Version Notes

- For v1 to v2 breaking changes, see [`docs/v1-v2-migration.md`](./docs/v1-v2-migration.md).
- For v2 to v3 migration guidance, see [`docs/v2-v3-migration.md`](./docs/v2-v3-migration.md).

## Example

`swc-walk` provides a SWC-native walker API inspired by `acorn-walk`.

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
