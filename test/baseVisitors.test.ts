import { test } from 'node:test'
import assert from 'node:assert'

import { parseSync } from '@swc/core'

import BaseVisitor from '#swc-walk/baseVisitor'
import { assertNodeType, isNodeOfType, type Node } from '#swc-walk/types'
import { type Test, expect, given } from './utils.js'

const tests: Array<Test> = [
  { type: 'ArrayExpression', code: '[]' },
  { type: 'ArrayPattern', code: 'const [] = []' },
  { type: 'ArrowFunctionExpression', code: '() => {}' },
  { type: 'AssignmentExpression', code: 'a = 1' },
  { type: 'AssignmentPattern', code: 'function foo(a: number = 1) { }' },
  { type: 'AssignmentPatternProperty', code: 'const {a = 1} = {}' },
  {
    type: 'AssignmentProperty',
    /**
     * SWC only emits AssignmentProperty nodes for object literals that use
     * default initializers. Destructuring defaults produce AssignmentPatternProperty,
     * so we intentionally use this non-standard-looking snippet to cover the visitor.
     */
    code: 'const foo = { a = 1 }',
  },
  { type: 'AwaitExpression', code: 'await foo()' },
  { type: 'BigIntLiteral', code: '1n' },
  { type: 'BinaryExpression', code: '1 + 1' },
  { type: 'BlockStatement', code: '{}' },
  { type: 'BooleanLiteral', code: 'true' },
  { type: 'BreakStatement', code: 'foo: for (const toto of []) {break foo;}' },
  { type: 'CallExpression', code: 'foo()' },
  { type: 'CatchClause', code: 'try {} catch(e) {}' },
  { type: 'ClassDeclaration', code: 'class Foo<T> extends Baz<T> implements Bar {}' },
  { type: 'ClassExpression', code: 'const Foo = @foo class Foo<T> extends Baz<T> implements Bar { method() {} }' },
  { type: 'ClassMethod', code: 'class Foo { @foo method<T>(param: T): void {} }' },
  { type: 'ClassProperty', code: 'class Foo { @foo a: number = 1 }' },
  { type: 'Computed', code: 'const a = b[0]' },
  { type: 'ConditionalExpression', code: 'true ? 1 : 2' },
  { type: 'Constructor', code: 'class Foo { constructor() {} }' },
  { type: 'ContinueStatement', code: 'foo: for (const bar of []) {continue foo;}' },
  { type: 'DebuggerStatement', code: 'debugger;' },
  { type: 'Decorator', code: '@foo class Foo {}' },
  { type: 'DoWhileStatement', code: 'do {} while (true)' },
  { type: 'EmptyStatement', code: ';' },
  {
    type: 'ExportAllDeclaration',
    code: 'export * from "foo" assert { type: "json" }',
    parserOptions: { syntax: 'ecmascript', importAttributes: true },
  },
  { type: 'ExportDeclaration', code: 'export const foo = ""' },
  { type: 'ExportDefaultDeclaration', code: 'export default function foo() {}' },
  { type: 'ExportDefaultExpression', code: 'export default ""' },
  {
    type: 'ExportDefaultSpecifier',
    code: 'export default from "foo"',
    parserOptions: { exportDefaultFrom: true, syntax: 'ecmascript' },
  },
  {
    type: 'ExportNamedDeclaration',
    code: 'export {a} from "foo" assert { type: "typescript" }',
    parserOptions: { syntax: 'ecmascript', importAttributes: true },
  },
  { type: 'ExportNamespaceSpecifier', code: "export * as a from 'foo'" },
  { type: 'ExportSpecifier', code: 'export {a as b}' },
  { type: 'ExpressionStatement', code: '1' },
  { type: 'ForInStatement', code: 'for (const a in b) {}' },
  { type: 'ForOfStatement', code: 'for (const a of b) {}' },
  { type: 'ForStatement', code: 'for (let foo = 1 ;foo < 10; foo++) {}' },
  { type: 'FunctionDeclaration', code: '@bar function foo<T>() {}' },
  { type: 'FunctionExpression', code: 'const foo = function<T>(param:T):void {}' },
  { type: 'GetterProperty', code: 'const foo = { get a(): string {} }' },
  { type: 'Identifier', code: 'a' },
  { type: 'IfStatement', code: 'if (true) {} else {}' },
  { type: 'Import', code: 'import()' },
  {
    type: 'ImportDeclaration',
    code: 'import "foo" assert { type: "any" }',
    parserOptions: { syntax: 'ecmascript', importAttributes: true },
  },
  { type: 'ImportDefaultSpecifier', code: 'import a from "foo"' },
  { type: 'ImportNamespaceSpecifier', code: 'import * as a from "foo"' },
  { type: 'ImportSpecifier', code: 'import {a as b} from "foo"' },
  { type: 'Invalid', code: '//', skip: "Could not find a valid code snippet for 'Invalid' node" },
  { type: 'JSXAttribute', code: '<a b="c" />', parserOptions: { tsx: true } },
  { type: 'JSXClosingElement', code: '<a></a>', parserOptions: { tsx: true } },
  { type: 'JSXClosingFragment', code: '<></>', parserOptions: { tsx: true } },
  { type: 'JSXElement', code: '<a />', parserOptions: { tsx: true } },
  { type: 'JSXEmptyExpression', code: '<a>{}</a>', parserOptions: { tsx: true } },
  { type: 'JSXExpressionContainer', code: '<a>{b}</a>', parserOptions: { tsx: true } },
  { type: 'JSXFragment', code: '<></>', parserOptions: { tsx: true } },
  { type: 'JSXMemberExpression', code: '<a.b />', parserOptions: { tsx: true } },
  { type: 'JSXNamespacedName', code: '<a:b />', parserOptions: { tsx: true } },
  { type: 'JSXOpeningElement', code: '<Foo<Bat> />', parserOptions: { tsx: true } },
  { type: 'JSXOpeningFragment', code: '<></>', parserOptions: { tsx: true } },
  { type: 'JSXText', code: '<a>foo</a>', parserOptions: { tsx: true } },
  { type: 'KeyValuePatternProperty', code: 'const {a: b} = {}' },
  { type: 'KeyValueProperty', code: 'const foo = {a: "b"}' },
  { type: 'LabeledStatement', code: 'foo: {}' },
  { type: 'MemberExpression', code: 'a.b' },
  { type: 'MetaProperty', code: 'import.meta' },
  { type: 'MethodProperty', code: 'const foo = { method<T>(param: T): void {} }' },
  { type: 'Module', code: 'export {}' },
  { type: 'NewExpression', code: 'new Foo()' },
  { type: 'NullLiteral', code: 'null' },
  { type: 'NumericLiteral', code: '1' },
  { type: 'ObjectExpression', code: 'const a = {}' },
  { type: 'ObjectPattern', code: 'const {}: object = {}' },
  { type: 'OptionalChainingExpression', code: 'a?.b' },
  { type: 'Parameter', code: 'function foo(@bar a) {}' },
  { type: 'ParenthesisExpression', code: '(a)' },
  { type: 'PrivateMethod', code: 'class Foo {@foo #method<T>(param: T): void {} }' },
  { type: 'PrivateName', code: 'class Foo { #a }' },
  { type: 'PrivateProperty', code: 'class Foo { @foo #a: number = 1;}' },
  { type: 'RegExpLiteral', code: '/foo/g' },
  { type: 'RestElement', code: 'function foo(...a: unknown[]) {}' },
  { type: 'ReturnStatement', code: '() => {return 1}' },
  { type: 'Script', code: '', parserOptions: { isModule: false } },
  { type: 'SequenceExpression', code: '1, 2' },
  { type: 'SetterProperty', code: 'const foo = { set a(b) {} }' },
  { type: 'SpreadElement', code: 'const foo = {...bar}' },
  { type: 'StaticBlock', code: 'class Foo { static {} }' },
  { type: 'StringLiteral', code: '"foo"' },
  { type: 'Super', code: 'class Foo {constructor(){super()}}' },
  { type: 'SuperPropExpression', code: 'class Foo {method(){super.foo}}' },
  { type: 'SwitchCase', code: 'switch(1){case 1: break;}' },
  { type: 'SwitchStatement', code: 'switch(1){case 1: break;}' },
  { type: 'TaggedTemplateExpression', code: 'foo<T>`bar ${baz}`' },
  { type: 'TemplateElement', code: 'foo`bar`' },
  { type: 'TemplateLiteral', code: 'foo`bar`' },
  { type: 'TemplateLiteral', code: 'type foo = `${bar}`' },
  { type: 'ThisExpression', code: 'this' },
  { type: 'ThrowStatement', code: 'throw 1' },
  { type: 'TryStatement', code: 'try {} catch(e) {}' },
  { type: 'TsExpressionWithTypeArguments', code: 'interface Foo<T> extends Baz<T> {}' },
  { type: 'TsInterfaceDeclaration', code: 'interface Foo {}' },
  { type: 'TsInterfaceBody', code: 'interface Foo {}' },
  { type: 'TsKeywordType', code: 'type foo = string' },
  { type: 'TsPropertySignature', code: 'type foo = {a:string}' },
  { type: 'TsAsExpression', code: 'a as b' },
  { type: 'TsCallSignatureDeclaration', code: 'interface Foo {  <T>(params: T): void }' },
  { type: 'JSXSpreadChild', code: '<>{...a}</>', parserOptions: { tsx: true } },
  { type: 'TsArrayType', code: 'type foo = string[]' },
  { type: 'TsConditionalType', code: 'type foo = T extends U ? X : Y' },
  { type: 'TsConstAssertion', code: 'const a = 1 as const' },
  { type: 'TsConstructorType', code: 'type foo = new <T>(param: T) => void' },
  { type: 'TsConstructSignatureDeclaration', code: 'interface Foo { new<T>(param:T): void }' },
  { type: 'TsEnumDeclaration', code: 'enum Foo {}' },
  { type: 'TsEnumMember', code: 'enum Foo {a = 1}' },
  { type: 'TsExportAssignment', code: 'export = 1' },
  { type: 'TsExternalModuleReference', code: 'import a = require("foo")' },
  { type: 'TsFunctionType', code: 'type foo = <T>(a: T) => void' },
  { type: 'TsGetterSignature', code: 'interface Foo { get a(): void }' },
  { type: 'TsImportEqualsDeclaration', code: 'import a = b' },
  { type: 'TsImportType', code: 'type A = import("foo").Bar<T>' },
  { type: 'TsIndexedAccessType', code: 'type Foo<T, U> = T[U]' },
  { type: 'TsIndexSignature', code: 'interface Foo { [a: string]: string }' },
  { type: 'TsInferType', code: 'type foo = infer T' },
  { type: 'TsInstantiation', code: 'const b3 = f<number>?.();' },
  { type: 'TsIntersectionType', code: 'type foo = T & U' },
  { type: 'TsLiteralType', code: 'type foo = "a"' },
  { type: 'TsMappedType', code: 'type foo = { [K in keyof T as U]: U }' },
  { type: 'TsMethodSignature', code: 'interface Foo { foo<T>(a: T): void }' },
  { type: 'TsModuleBlock', code: 'module "module" {;}' },
  { type: 'TsModuleDeclaration', code: 'module foo {}' },
  { type: 'TsNamespaceDeclaration', code: 'namespace A.B { }' },
  { type: 'TsNamespaceExportDeclaration', code: 'export as namespace A;' },
  { type: 'TsNonNullExpression', code: 'a!' },
  { type: 'TsOptionalType', code: 'function foo(...args: [number, string?, ...number[]]) {}' },
  { type: 'TsParameterProperty', code: 'class Foo { constructor(@foo private a: string) {} }' },
  { type: 'TsParenthesizedType', code: 'type Foo = (Bar | Baz)' },
  { type: 'TsQualifiedName', code: 'const toto: Namespace.Type = ""' },
  { type: 'TsRestType', code: 'type Foo<T extends any[]> = T extends [...infer U, infer R] ? R : never' },
  { type: 'TsSatisfiesExpression', code: 'const foo = {} satisfies U' },
  { type: 'TsSetterSignature', code: 'interface Foo { set a(foo: string) }' },
  { type: 'TsTupleElement', code: 'type Foo = [labeled: string, number]', times: 2 },
  { type: 'TsTupleType', code: 'type Foo = [string, number]' },
  { type: 'TsTypeAliasDeclaration', code: 'type foo = string' },
  { type: 'TsTypeAnnotation', code: 'function foo(a: string) {}' },
  { type: 'TsTypeParameter', code: 'type foo<T = unknown> = T' },
  { type: 'TsTypeParameterDeclaration', code: 'type foo<T> = T' },
  { type: 'TsTypeAssertion', code: 'const a = <string>b' },
  { type: 'TsTypeLiteral', code: 'type foo = { a: string }' },
  { type: 'TsTypeOperator', code: 'type foo = keyof Bar' },
  { type: 'TsTypeParameterInstantiation', code: 'type foo = Bar<string>' },
  { type: 'TsTypeReference', code: 'type foo = Bar' },
  { type: 'TsTypePredicate', code: 'function foo(a: unknown): a is string {}' },
  { type: 'TsTypeQuery', code: 'type Foo<T> = typeof bar<T>' },
  { type: 'TsUnionType', code: 'type foo = string | number' },
  { type: 'UnaryExpression', code: '-1' },
  { type: 'UpdateExpression', code: 'a++' },
  { type: 'VariableDeclaration', code: 'const a = 1' },
  { type: 'VariableDeclarator', code: 'const a = 1' },
  { type: 'WhileStatement', code: 'while (true) {}' },
  {
    type: 'WithStatement',
    code: 'with (obj) { obj.foo }',
    parserOptions: { syntax: 'ecmascript', isModule: false },
  },
  { type: 'YieldExpression', code: 'function* foo() { yield 1 }' },
]

for (const options of tests) {
  test(`should call ${options.type}`, () => {
    if (options.skip) {
      global.console.log(`Skipping ${options.type}: ${options.skip}`)

      return
    }

    expect(given(options)).toHaveBeenCalledTimes(options.times ?? 1)
  })
}

test('ArrowFunctionExpression visits parameters and return type', () => {
  const program = parseSync('const arrow = (param: Foo): Bar => param', { syntax: 'typescript' })

  assertNodeType(program, 'Module')

  const declaration = program.body[0]

  assertNodeType(declaration, 'VariableDeclaration')

  const init = declaration.declarations[0].init

  assert.ok(init)
  assertNodeType(init, 'ArrowFunctionExpression')

  const visitor = new BaseVisitor()
  let paramVisited = false
  let returnTypeVisited = false

  visitor.ArrowFunctionExpression(init, undefined, node => {
    if (node === init.params[0]) {
      paramVisited = true
    }

    if (init.returnType && node === init.returnType) {
      returnTypeVisited = true
    }
  })

  assert.ok(paramVisited)
  assert.ok(returnTypeVisited)
})

test('AssignmentProperty visits key before value', () => {
  const program = parseSync('const value = { assignmentKey = init }', { syntax: 'typescript' })

  assertNodeType(program, 'Module')

  const declaration = program.body[0]

  assertNodeType(declaration, 'VariableDeclaration')

  const init = declaration.declarations[0].init

  assert.ok(init)
  assertNodeType(init, 'ObjectExpression')

  const assignmentProperty = init.properties.find(property => isNodeOfType(property, 'AssignmentProperty'))

  assert.ok(assignmentProperty)

  const visitor = new BaseVisitor()
  const visitedNodes: Node[] = []

  visitor.AssignmentProperty(assignmentProperty, undefined, node => {
    visitedNodes.push(node)
  })

  assert.equal(visitedNodes.length, 2)
  assert.strictEqual(visitedNodes[0], assignmentProperty.key)
  assert.strictEqual(visitedNodes[1], assignmentProperty.value)
})

test('all methods should been tested', () => {
  const methods = Object.getOwnPropertyNames(BaseVisitor.prototype).filter(method => method !== 'constructor')

  assert.ok(
    methods.every(method => tests.some(test => test.type === method)),
    `Missing tests for ${methods.filter(method => !tests.some(test => test.type === method)).join(', ')}`,
  )
})
