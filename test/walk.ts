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
      let foo = bar = <baz>(p: baz): baz => {return p}
      const [a, b]: [number, number] = [1,2]
      const arrow = (arg: string) => {
        try {
          throw new Error<string>('boom')
        } catch(err) {
          console.log<object>(err)
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

    let typeParameterDeclarationNodes = 0

    simple(reparseSync(`type SetInputText = Dispatch<SetStateAction<string>>`), {
      TsTypeAliasDeclaration(node) {
        assert.equal(node.type, 'TsTypeAliasDeclaration')
      },
      TsTypeParameterInstantiation(node) {
        assert.equal(node.type, 'TsTypeParameterInstantiation')
        typeParameterDeclarationNodes++
      },
      TsTypeReference(node) {
        assert.equal(node.type, 'TsTypeReference')
      },
    })

    assert.equal(typeParameterDeclarationNodes, 2)

    let tsTypeParameterNodes = 0

    simple(reparseSync('interface List<T extends S> extends U, V { items: T[] }'), {
      TsArrayType(node) {
        assert.equal(node.type, 'TsArrayType')
      },
      TsInterfaceBody(node) {
        assert.equal(node.type, 'TsInterfaceBody')
      },
      TsTypeParameter(node) {
        assert.equal(node.type, 'TsTypeParameter')
        tsTypeParameterNodes++
      },
    })

    assert.equal(tsTypeParameterNodes, 1)
  })
})
