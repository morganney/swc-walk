import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import { parseSync } from '@swc/core'

import { simple, ancestor } from '#swc-walk'
import { assertNodeType, type Node, type RecursiveVisitors } from '#swc-walk/types'

type WalkState = {
  [k: string]: string | number
}
const state: WalkState = {
  search: 'const foo',
  times: 1,
}

describe('swc-walk', () => {
  it('walks an swc ast', () => {
    const ast = parseSync(
      `
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
    `,
      { syntax: 'typescript' },
    )

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

    simple(parseSync(`type SetInputText = Dispatch<SetStateAction<string>>`, { syntax: 'typescript' }), {
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

    simple(parseSync('interface List<T extends S> extends U, V { items: T[] }', { syntax: 'typescript' }), {
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

  it('walks an swc ast with ancestors', () => {
    const ast = parseSync(`function foo(): string { return 'bar' }`, { syntax: 'typescript' })

    ancestor<WalkState>(
      ast,
      {
        StringLiteral(node, st, ancestors) {
          assert.equal(node.type, 'StringLiteral')
          assert.equal(ancestors.length, 5)
          assert.equal(ancestors[4].type, 'StringLiteral')
          assert.equal(ancestors[3].type, 'ReturnStatement')
          assert.equal(ancestors[2].type, 'BlockStatement')
          assert.equal(ancestors[1].type, 'FunctionDeclaration')
          assert.equal(ancestors[0].type, 'Module')
        },
      },
      undefined,
      state,
    )
  })

  it('allows accessing node.span without manual narrowing', () => {
    const program = parseSync(`type Foo = Namespace.Type`, { syntax: 'typescript' })

    assertNodeType(program, 'Module')

    const declaration = program.body[0]

    assertNodeType(declaration, 'TsTypeAliasDeclaration')

    const typeAnnotation = declaration.typeAnnotation

    assertNodeType(typeAnnotation, 'TsTypeReference')

    const qualifiedName = typeAnnotation.typeName

    assertNodeType(qualifiedName, 'TsQualifiedName')

    // Simulate a missing 'span' property to test runtime behavior where span may be undefined.
    const deleted = Reflect.deleteProperty(qualifiedName, 'span')

    assert.ok(deleted, "Failed to delete 'span' property; object may be frozen or sealed")
    assert.strictEqual(qualifiedName.span, undefined, "'span' property should be undefined after deletion")

    const spans: Array<Node['span']> = []

    simple(program, {
      TsQualifiedName(node) {
        spans.push(node.span)
      },
    })

    assert.ok(spans.length >= 1)
    assert.ok(spans.some(span => span === undefined))
  })

  it('keeps spans accessible for nodes that normally include them', () => {
    const program = parseSync(`function demo(value: string) { return value }`, { syntax: 'typescript' })
    const spans: Array<Node['span']> = []

    simple(program, {
      ReturnStatement(node) {
        spans.push(node.span)
      },
    })

    assert.ok(spans.length >= 1)
    assert.ok(spans.every(span => span !== undefined))
  })

  it('throws when assertNodeType receives the wrong node kind', () => {
    const program = parseSync(`const answer = 42`, { syntax: 'typescript' })

    assertNodeType(program, 'Module')

    const declaration = program.body[0]

    assert.throws(() => {
      assertNodeType(declaration, 'ExpressionStatement')
    }, /Expected node of type ExpressionStatement, received VariableDeclaration/)
  })

  it('throws when a custom base visitor is missing a required handler', () => {
    const ast = parseSync('const answer = 42', { syntax: 'typescript' })
    const partialBase: RecursiveVisitors<WalkState> = {
      Module(node, st, cb) {
        for (const statement of node.body) {
          cb(statement, st)
        }
      },
    }

    assert.throws(() => {
      simple(ast, {}, partialBase, state)
    }, /No base visitor found for VariableDeclaration/)
  })

  it('throws in ancestor when a custom base visitor is missing a required handler', () => {
    const ast = parseSync('const answer = 42', { syntax: 'typescript' })
    const partialBase: RecursiveVisitors<WalkState> = {
      Module(node, st, cb) {
        for (const statement of node.body) {
          cb(statement, st)
        }
      },
    }

    assert.throws(() => {
      ancestor(ast, {}, partialBase, state)
    }, /No base visitor found for VariableDeclaration/)
  })

  it('throws when root node is not walkable', () => {
    const nonNodeAst = {} as unknown as Parameters<typeof simple<WalkState>>[0]

    assert.throws(() => {
      simple(nonNodeAst, {}, undefined, state)
    }, /Root AST node must have a string type property/)
  })

  it('ignores non-walkable nodes provided by custom base callbacks', () => {
    const ast = parseSync('const answer = 42', { syntax: 'typescript' })
    let simpleVisitorCalls = 0
    let ancestorVisitorCalls = 0
    const base: RecursiveVisitors<WalkState> = {
      Module(node, st, cb) {
        cb({} as Node, st)

        for (const statement of node.body) {
          cb(statement, st)
        }
      },
      VariableDeclaration() {
        // Intentionally empty for this test.
      },
    }

    simple(
      ast,
      {
        Identifier() {
          simpleVisitorCalls++
        },
      },
      base,
      state,
    )

    ancestor(
      ast,
      {
        Identifier() {
          ancestorVisitorCalls++
        },
      },
      base,
      state,
    )

    assert.equal(simpleVisitorCalls, 0)
    assert.equal(ancestorVisitorCalls, 0)
  })

  it('throws in ancestor when override dispatch points to a missing base handler', () => {
    const ast = parseSync('foo', { syntax: 'typescript' })
    const base: RecursiveVisitors<WalkState> = {
      Module(node, st, cb) {
        for (const statement of node.body) {
          cb(statement, st, 'ExpressionStatement')
        }
      },
      Identifier() {
        // Intentionally empty for this test.
      },
    }

    assert.throws(() => {
      ancestor(ast, {}, base, state)
    }, /No base visitor found for ExpressionStatement/)
  })

  it('supports base override type dispatch', () => {
    const ast = parseSync('foo', { syntax: 'typescript' })
    let overrideVisitorCalls = 0
    const base: RecursiveVisitors<WalkState> = {
      Module(node, st, cb) {
        for (const statement of node.body) {
          cb(statement, st, 'ExpressionStatement')
        }
      },
      ExpressionStatement(node, st, cb) {
        overrideVisitorCalls++
        cb(node.expression, st)
      },
      Identifier() {
        // Intentionally empty for this test.
      },
    }

    simple(ast, {}, base, state)

    assert.equal(overrideVisitorCalls, 1)
  })

  it('walks simple visitors in post-order (children before parent)', () => {
    const ast = parseSync('const value = foo + bar', { syntax: 'typescript' })
    const visited: string[] = []

    simple(ast, {
      Identifier(node) {
        visited.push(`Identifier:${node.value}`)
      },
      BinaryExpression() {
        visited.push('BinaryExpression')
      },
      VariableDeclarator() {
        visited.push('VariableDeclarator')
      },
      VariableDeclaration() {
        visited.push('VariableDeclaration')
      },
      Module() {
        visited.push('Module')
      },
    })

    assert.deepEqual(visited, [
      'Identifier:value',
      'Identifier:foo',
      'Identifier:bar',
      'BinaryExpression',
      'VariableDeclarator',
      'VariableDeclaration',
      'Module',
    ])
  })

  it('maintains ancestor path invariants across siblings', () => {
    const ast = parseSync('const one = first; const two = second', { syntax: 'typescript' })
    const identifierPaths: string[] = []

    ancestor(ast, {
      Identifier(node, _st, ancestors) {
        if (node.value !== 'first' && node.value !== 'second') {
          return
        }

        assert.equal(ancestors[0]?.type, 'Module')
        assert.equal(ancestors[ancestors.length - 1]?.type, 'Identifier')

        identifierPaths.push(ancestors.map(ancestorNode => ancestorNode.type).join(' > '))
      },
    })

    assert.deepEqual(identifierPaths, [
      'Module > VariableDeclaration > VariableDeclarator > Identifier',
      'Module > VariableDeclaration > VariableDeclarator > Identifier',
    ])
  })

  it('supports nested override dispatch in base visitors', () => {
    const ast = parseSync('foo', { syntax: 'typescript' })
    const visited: string[] = []
    const base: RecursiveVisitors<WalkState> = {
      Module(node, st, cb) {
        for (const statement of node.body) {
          cb(statement, st, 'ExpressionStatement')
        }
      },
      ExpressionStatement(node, st, cb) {
        visited.push('ExpressionStatement')
        cb(node.expression, st, 'Identifier')
      },
      Identifier() {
        visited.push('Identifier')
      },
    }

    simple(ast, {}, base, state)

    assert.deepEqual(visited, ['ExpressionStatement', 'Identifier'])
  })

  it('threads the same state object through simple and ancestor callbacks', () => {
    const ast = parseSync('const item = value', { syntax: 'typescript' })
    const simpleState = { hits: 0 }
    const ancestorState = { hits: 0 }
    const seenBySimple: Array<typeof simpleState> = []
    const seenByAncestor: Array<typeof ancestorState> = []

    simple(
      ast,
      {
        Identifier(_node, st) {
          st.hits++
          seenBySimple.push(st)
        },
      },
      undefined,
      simpleState,
    )

    ancestor(
      ast,
      {
        Identifier(_node, st) {
          st.hits++
          seenByAncestor.push(st)
        },
      },
      undefined,
      ancestorState,
    )

    assert.ok(seenBySimple.every(st => st === simpleState))
    assert.ok(seenByAncestor.every(st => st === ancestorState))
    assert.equal(simpleState.hits, 2)
    assert.equal(ancestorState.hits, 2)
  })
})
