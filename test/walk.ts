import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import { reparseSync } from '@knighted/reparse'

import { simple } from '../src/walk.js'

type WalkState = {
  [k: string]: string | number
}
const state: WalkState = {
  search: 'const foo',
  times: 1,
}

describe('swc-walk', () => {
  it('walks an swc ast', () => {
    const ast = reparseSync(`
      let foo = bar = () => {}
      const [a, b]: [number, number] = [1,2]
      const arrow = (arg: string) => {
        try {
          throw new Error('boom')
        } catch(err) {
          console.log(err)
        } finally {
          return 'foo'
        }
      }
    `)

    simple<WalkState>(
      ast,
      {
        ArrayExpression(node) {
          assert.equal(node.type, 'ArrayExpression')
        },
        ArrayPattern(node) {
          assert.equal(node.type, 'ArrayPattern')
        },
        AssignmentExpression(node) {
          assert.equal(node.type, 'AssignmentExpression')
        },
        ArrowFunctionExpression(node) {
          assert.equal(node.type, 'ArrowFunctionExpression')
        },
        Identifier(node) {
          assert.equal(node.type, 'Identifier')
        },
        StringLiteral(node) {
          assert.equal(node.type, 'StringLiteral')
        },
        VariableDeclaration(node, st) {
          assert.equal(node.type, 'VariableDeclaration')
          assert.ok(typeof st.times === 'number')
          assert.ok(typeof st.search === 'string')
        },
      },
      undefined,
      state,
    )
  })
})
