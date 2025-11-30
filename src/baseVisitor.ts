import type { Node, Callback, NodeByType, RecursiveVisitors } from './types.js'

const ignore = <S>(_n: Node, _st: S, _cb: Callback<S>) => {}

/**
 * @see https://github.com/swc-project/swc/blob/main/packages/core/src/Visitor.ts
 */
export class BaseVisitor implements Required<RecursiveVisitors<unknown>> {
  ArrayExpression<S>(n: NodeByType<'ArrayExpression'>, st: S, cb: Callback<S>) {
    for (const el of n.elements) {
      if (el) {
        cb(el.expression, st)
      }
    }
  }
  ArrayPattern<S>(n: NodeByType<'ArrayPattern'>, st: S, cb: Callback<S>) {
    for (const el of n.elements) {
      if (el) {
        cb(el, st)
      }
    }
  }
  ArrowFunctionExpression<S>(n: NodeByType<'ArrowFunctionExpression'>, st: S, cb: Callback<S>) {
    for (const param of n.params) {
      cb(param, st)
    }

    cb(n.body, st)

    if (n.returnType) {
      cb(n.returnType, st)
    }

    if (n.typeParameters) {
      cb(n.typeParameters, st)
    }
  }
  AssignmentExpression<S>(n: NodeByType<'AssignmentExpression'>, st: S, cb: Callback<S>) {
    cb(n.left, st)
    cb(n.right, st)
  }
  AssignmentPattern<S>(n: NodeByType<'AssignmentPattern'>, st: S, cb: Callback<S>) {
    cb(n.left, st)
    cb(n.right, st)

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }
  }
  AssignmentPatternProperty<S>(n: NodeByType<'AssignmentPatternProperty'>, st: S, cb: Callback<S>) {
    cb(n.key, st)

    if (n.value) {
      cb(n.value, st)
    }
  }
  AssignmentProperty<S>(n: NodeByType<'AssignmentProperty'>, st: S, cb: Callback<S>) {
    cb(n.key, st)
    cb(n.value, st)
  }
  AwaitExpression<S>(n: NodeByType<'AwaitExpression'>, st: S, cb: Callback<S>) {
    cb(n.argument, st)
  }
  BigIntLiteral = ignore
  BinaryExpression<S>(n: NodeByType<'BinaryExpression'>, st: S, cb: Callback<S>) {
    cb(n.left, st)
    cb(n.right, st)
  }
  BlockStatement<S>(n: NodeByType<'BlockStatement'>, st: S, cb: Callback<S>) {
    for (const stmt of n.stmts) {
      cb(stmt, st)
    }
  }
  BooleanLiteral = ignore
  BreakStatement<S>(n: NodeByType<'BreakStatement'>, st: S, cb: Callback<S>) {
    if (n.label) {
      cb(n.label, st)
    }
  }
  CallExpression<S>(n: NodeByType<'CallExpression'>, st: S, cb: Callback<S>) {
    cb(n.callee, st)

    for (const arg of n.arguments) {
      cb(arg.expression, st)
    }

    if (n.typeArguments) {
      cb(n.typeArguments, st)
    }
  }
  CatchClause<S>(n: NodeByType<'CatchClause'>, st: S, cb: Callback<S>) {
    if (n.param) {
      cb(n.param, st)
    }

    cb(n.body, st)
  }
  ClassDeclaration<S>(n: NodeByType<'ClassDeclaration'>, st: S, cb: Callback<S>) {
    for (const decorator of n.decorators ?? []) {
      cb(decorator, st)
    }

    cb(n.identifier, st)

    for (const implement of n.implements) {
      cb(implement, st)
    }

    if (n.superClass) {
      cb(n.superClass, st)
    }

    if (n.superTypeParams) {
      cb(n.superTypeParams, st)
    }

    if (n.typeParams) {
      cb(n.typeParams, st)
    }

    for (const member of n.body) {
      cb(member, st)
    }
  }
  ClassExpression<S>(n: NodeByType<'ClassExpression'>, st: S, cb: Callback<S>) {
    for (const decorator of n.decorators ?? []) {
      cb(decorator, st)
    }

    if (n.identifier) {
      cb(n.identifier, st)
    }

    for (const implement of n.implements) {
      cb(implement, st)
    }

    if (n.superClass) {
      cb(n.superClass, st)
    }

    if (n.superTypeParams) {
      cb(n.superTypeParams, st)
    }

    if (n.typeParams) {
      cb(n.typeParams, st)
    }

    for (const member of n.body) {
      cb(member, st)
    }
  }
  ClassMethod<S>(n: NodeByType<'ClassMethod'>, st: S, cb: Callback<S>) {
    cb(n.key, st)

    for (const decorator of n.function.decorators ?? []) {
      cb(decorator, st)
    }

    for (const param of n.function.params) {
      cb(param, st)
    }

    if (n.function.returnType) {
      cb(n.function.returnType, st)
    }

    if (n.function.typeParameters) {
      cb(n.function.typeParameters, st)
    }

    if (n.function.body) {
      cb(n.function.body, st)
    }
  }
  ClassProperty<S>(n: NodeByType<'ClassProperty'>, st: S, cb: Callback<S>) {
    for (const decorator of n.decorators ?? []) {
      cb(decorator, st)
    }

    cb(n.key, st)

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }

    if (n.value) {
      cb(n.value, st)
    }
  }
  Computed<S>(n: NodeByType<'Computed'>, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  ConditionalExpression<S>(n: NodeByType<'ConditionalExpression'>, st: S, cb: Callback<S>) {
    cb(n.test, st)
    cb(n.consequent, st)
    cb(n.alternate, st)
  }
  Constructor<S>(n: NodeByType<'Constructor'>, st: S, cb: Callback<S>) {
    cb(n.key, st)

    for (const param of n.params) {
      cb(param, st)
    }

    if (n.body) {
      cb(n.body, st)
    }
  }
  ContinueStatement<S>(n: NodeByType<'ContinueStatement'>, st: S, cb: Callback<S>) {
    if (n.label) {
      cb(n.label, st)
    }
  }
  DebuggerStatement = ignore
  Decorator<S>(n: NodeByType<'Decorator'>, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  DoWhileStatement<S>(n: NodeByType<'DoWhileStatement'>, st: S, cb: Callback<S>) {
    cb(n.body, st)
    cb(n.test, st)
  }
  EmptyStatement = ignore
  ExportAllDeclaration<S>(n: NodeByType<'ExportAllDeclaration'>, st: S, cb: Callback<S>) {
    cb(n.source, st)

    // @ts-expect-error -- asserts is not typed in ExportAllDeclaration
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    n.asserts = n.asserts ?? n.with

    if (n.asserts) {
      cb(n.asserts, st)
    }
  }
  ExportDeclaration<S>(n: NodeByType<'ExportDeclaration'>, st: S, cb: Callback<S>) {
    cb(n.declaration, st)
  }
  ExportDefaultDeclaration<S>(n: NodeByType<'ExportDefaultDeclaration'>, st: S, cb: Callback<S>) {
    cb(n.decl, st)
  }
  ExportDefaultExpression<S>(n: NodeByType<'ExportDefaultExpression'>, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  ExportDefaultSpecifier<S>(n: NodeByType<'ExportDefaultSpecifier'>, st: S, cb: Callback<S>) {
    cb(n.exported, st)
  }
  ExportNamedDeclaration<S>(n: NodeByType<'ExportNamedDeclaration'>, st: S, cb: Callback<S>) {
    for (const specifier of n.specifiers) {
      cb(specifier, st)
    }

    if (n.source) {
      cb(n.source, st)
    }

    // @ts-expect-error -- asserts is not typed in ExportAllDeclaration
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    n.asserts = n.asserts ?? n.with

    if (n.asserts) {
      cb(n.asserts, st)
    }
  }
  ExportNamespaceSpecifier<S>(n: NodeByType<'ExportNamespaceSpecifier'>, st: S, cb: Callback<S>) {
    cb(n.name, st)
  }
  ExportSpecifier<S>(n: NodeByType<'ExportSpecifier'>, st: S, cb: Callback<S>) {
    if (n.exported) {
      cb(n.exported, st)
    }

    cb(n.orig, st)
  }
  ExpressionStatement<S>(n: NodeByType<'ExpressionStatement'>, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  ForInStatement<S>(n: NodeByType<'ForInStatement'>, st: S, cb: Callback<S>) {
    cb(n.left, st)
    cb(n.right, st)
    cb(n.body, st)
  }
  ForOfStatement<S>(n: NodeByType<'ForOfStatement'>, st: S, cb: Callback<S>) {
    cb(n.left, st)
    cb(n.right, st)
    cb(n.body, st)
  }
  ForStatement<S>(n: NodeByType<'ForStatement'>, st: S, cb: Callback<S>) {
    if (n.init) {
      cb(n.init, st)
    }

    if (n.test) {
      cb(n.test, st)
    }

    if (n.update) {
      cb(n.update, st)
    }

    cb(n.body, st)
  }
  FunctionDeclaration<S>(n: NodeByType<'FunctionDeclaration'>, st: S, cb: Callback<S>) {
    for (const decorator of n.decorators ?? []) {
      cb(decorator, st)
    }

    cb(n.identifier, st)

    for (const param of n.params) {
      cb(param, st)
    }

    if (n.returnType) {
      cb(n.returnType, st)
    }

    if (n.typeParameters) {
      cb(n.typeParameters, st)
    }

    if (n.body) {
      cb(n.body, st)
    }
  }
  FunctionExpression<S>(n: NodeByType<'FunctionExpression'>, st: S, cb: Callback<S>) {
    for (const decorator of n.decorators ?? []) {
      cb(decorator, st)
    }

    if (n.identifier) {
      cb(n.identifier, st)
    }

    for (const param of n.params) {
      cb(param, st)
    }

    if (n.returnType) {
      cb(n.returnType, st)
    }

    if (n.typeParameters) {
      cb(n.typeParameters, st)
    }

    if (n.body) {
      cb(n.body, st)
    }
  }
  GetterProperty<S>(n: NodeByType<'GetterProperty'>, st: S, cb: Callback<S>) {
    cb(n.key, st)

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }

    if (n.body) {
      cb(n.body, st)
    }
  }
  Identifier<S>(n: NodeByType<'Identifier'>, st: S, cb: Callback<S>) {
    if ('typeAnnotation' in n && n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }
  }
  IfStatement<S>(n: NodeByType<'IfStatement'>, st: S, cb: Callback<S>) {
    cb(n.test, st)
    cb(n.consequent, st)

    if (n.alternate) {
      cb(n.alternate, st)
    }
  }
  Import = ignore
  ImportDeclaration<S>(n: NodeByType<'ImportDeclaration'>, st: S, cb: Callback<S>) {
    for (const specifier of n.specifiers) {
      cb(specifier, st)
    }

    cb(n.source, st)

    // @ts-expect-error -- asserts is not typed in ExportAllDeclaration
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    n.asserts = n.asserts ?? n.with

    if (n.asserts) {
      cb(n.asserts, st)
    }
  }
  ImportDefaultSpecifier<S>(n: NodeByType<'ImportDefaultSpecifier'>, st: S, cb: Callback<S>) {
    cb(n.local, st)
  }
  ImportNamespaceSpecifier<S>(n: NodeByType<'ImportNamespaceSpecifier'>, st: S, cb: Callback<S>) {
    cb(n.local, st)
  }
  ImportSpecifier<S>(n: NodeByType<'ImportSpecifier'>, st: S, cb: Callback<S>) {
    if (n.imported) {
      cb(n.imported, st)
    }

    cb(n.local, st)
  }
  Invalid = ignore
  JSXAttribute<S>(n: NodeByType<'JSXAttribute'>, st: S, cb: Callback<S>) {
    cb(n.name, st)

    if (n.value) {
      cb(n.value, st)
    }
  }
  JSXClosingElement<S>(n: NodeByType<'JSXClosingElement'>, st: S, cb: Callback<S>) {
    cb(n.name, st)
  }
  JSXClosingFragment = ignore
  JSXElement<S>(n: NodeByType<'JSXElement'>, st: S, cb: Callback<S>) {
    cb(n.opening, st)

    for (const child of n.children) {
      cb(child, st)
    }

    if (n.closing) {
      cb(n.closing, st)
    }
  }
  JSXEmptyExpression = ignore
  JSXExpressionContainer<S>(n: NodeByType<'JSXExpressionContainer'>, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  JSXFragment<S>(n: NodeByType<'JSXFragment'>, st: S, cb: Callback<S>) {
    cb(n.opening, st)

    for (const child of n.children) {
      cb(child, st)
    }

    cb(n.closing, st)
  }
  JSXMemberExpression<S>(n: NodeByType<'JSXMemberExpression'>, st: S, cb: Callback<S>) {
    cb(n.property, st)
    cb(n.object, st)
  }
  JSXNamespacedName<S>(n: NodeByType<'JSXNamespacedName'>, st: S, cb: Callback<S>) {
    cb(n.namespace, st)
    cb(n.name, st)
  }
  JSXOpeningElement<S>(n: NodeByType<'JSXOpeningElement'>, st: S, cb: Callback<S>) {
    cb(n.name, st)

    for (const attr of n.attributes) {
      cb(attr, st)
    }

    if (n.typeArguments) {
      cb(n.typeArguments, st)
    }
  }
  JSXOpeningFragment = ignore
  JSXSpreadChild<S>(n: NodeByType<'JSXSpreadChild'>, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  JSXText = ignore
  KeyValuePatternProperty<S>(n: NodeByType<'KeyValuePatternProperty'>, st: S, cb: Callback<S>) {
    cb(n.key, st)
    cb(n.value, st)
  }
  KeyValueProperty<S>(n: NodeByType<'KeyValueProperty'>, st: S, cb: Callback<S>) {
    cb(n.key, st)
    cb(n.value, st)
  }
  LabeledStatement<S>(n: NodeByType<'LabeledStatement'>, st: S, cb: Callback<S>) {
    cb(n.label, st)
    cb(n.body, st)
  }
  MemberExpression<S>(n: NodeByType<'MemberExpression'>, st: S, cb: Callback<S>) {
    cb(n.object, st)
    cb(n.property, st)
  }
  MetaProperty = ignore
  MethodProperty<S>(n: NodeByType<'MethodProperty'>, st: S, cb: Callback<S>) {
    for (const decorator of n.decorators ?? []) {
      cb(decorator, st)
    }

    cb(n.key, st)

    for (const param of n.params) {
      cb(param, st)
    }

    if (n.returnType) {
      cb(n.returnType, st)
    }

    if (n.typeParameters) {
      cb(n.typeParameters, st)
    }

    if (n.body) {
      cb(n.body, st)
    }
  }
  Module<S>(n: NodeByType<'Module'>, st: S, cb: Callback<S>) {
    for (const stmt of n.body) {
      cb(stmt, st)
    }
  }
  NewExpression<S>(n: NodeByType<'NewExpression'>, st: S, cb: Callback<S>) {
    cb(n.callee, st)

    if (n.arguments) {
      for (const arg of n.arguments) {
        cb(arg.expression, st)
      }
    }

    if (n.typeArguments) {
      cb(n.typeArguments, st)
    }
  }
  NullLiteral = ignore
  NumericLiteral = ignore
  ObjectExpression<S>(n: NodeByType<'ObjectExpression'>, st: S, cb: Callback<S>) {
    for (const property of n.properties) {
      cb(property, st)
    }
  }
  ObjectPattern<S>(n: NodeByType<'ObjectPattern'>, st: S, cb: Callback<S>) {
    for (const property of n.properties) {
      cb(property, st)
    }

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }
  }
  OptionalChainingExpression<S>(n: NodeByType<'OptionalChainingExpression'>, st: S, cb: Callback<S>) {
    cb(n.base, st)
  }
  Parameter<S>(n: NodeByType<'Parameter'>, st: S, cb: Callback<S>) {
    for (const decorator of n.decorators ?? []) {
      cb(decorator, st)
    }

    cb(n.pat, st)
  }
  ParenthesisExpression<S>(n: NodeByType<'ParenthesisExpression'>, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  PrivateMethod<S>(n: NodeByType<'PrivateMethod'>, st: S, cb: Callback<S>) {
    cb(n.key, st)

    for (const decorator of n.function.decorators ?? []) {
      cb(decorator, st)
    }

    for (const param of n.function.params) {
      cb(param, st)
    }

    if (n.function.returnType) {
      cb(n.function.returnType, st)
    }

    if (n.function.typeParameters) {
      cb(n.function.typeParameters, st)
    }

    if (n.function.body) {
      cb(n.function.body, st)
    }
  }
  PrivateName = ignore
  PrivateProperty<S>(n: NodeByType<'PrivateProperty'>, st: S, cb: Callback<S>) {
    for (const decorator of n.decorators ?? []) {
      cb(decorator, st)
    }

    cb(n.key, st)

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }

    if (n.value) {
      cb(n.value, st)
    }
  }
  RegExpLiteral = ignore
  RestElement<S>(n: NodeByType<'RestElement'>, st: S, cb: Callback<S>) {
    cb(n.argument, st)

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }
  }
  ReturnStatement<S>(n: NodeByType<'ReturnStatement'>, st: S, cb: Callback<S>) {
    if (n.argument) {
      cb(n.argument, st)
    }
  }
  Script<S>(n: NodeByType<'Script'>, st: S, cb: Callback<S>) {
    for (const stmt of n.body) {
      cb(stmt, st)
    }
  }
  SequenceExpression<S>(n: NodeByType<'SequenceExpression'>, st: S, cb: Callback<S>) {
    for (const expression of n.expressions) {
      cb(expression, st)
    }
  }
  SetterProperty<S>(n: NodeByType<'SetterProperty'>, st: S, cb: Callback<S>) {
    cb(n.key, st)
    cb(n.param, st)

    if (n.body) {
      cb(n.body, st)
    }
  }
  SpreadElement<S>(n: NodeByType<'SpreadElement'>, st: S, cb: Callback<S>) {
    cb(n.arguments, st)
  }
  StaticBlock<S>(n: NodeByType<'StaticBlock'>, st: S, cb: Callback<S>) {
    cb(n.body, st)
  }
  StringLiteral = ignore
  Super = ignore
  SuperPropExpression<S>(n: NodeByType<'SuperPropExpression'>, st: S, cb: Callback<S>) {
    cb(n.obj, st)
    cb(n.property, st)
  }
  SwitchCase<S>(n: NodeByType<'SwitchCase'>, st: S, cb: Callback<S>) {
    if (n.test) {
      cb(n.test, st)
    }

    for (const consequent of n.consequent) {
      cb(consequent, st)
    }
  }
  SwitchStatement<S>(n: NodeByType<'SwitchStatement'>, st: S, cb: Callback<S>) {
    cb(n.discriminant, st)

    for (const cases of n.cases) {
      cb(cases, st)
    }
  }
  TaggedTemplateExpression<S>(n: NodeByType<'TaggedTemplateExpression'>, st: S, cb: Callback<S>) {
    cb(n.tag, st)
    cb(n.template, st)

    if (n.typeParameters) {
      cb(n.typeParameters, st)
    }
  }
  TemplateElement = ignore
  TemplateLiteral<S>(n: NodeByType<'TemplateLiteral'>, st: S, cb: Callback<S>) {
    for (const quasis of n.quasis) {
      cb(quasis, st)
    }

    if ('expressions' in n) {
      for (const expressions of n.expressions) {
        cb(expressions, st)
      }
    }

    if ('types' in n) {
      for (const types of n.types) {
        cb(types, st)
      }
    }
  }
  ThisExpression = ignore
  ThrowStatement<S>(n: NodeByType<'ThrowStatement'>, st: S, cb: Callback<S>) {
    cb(n.argument, st)
  }
  TryStatement<S>(n: NodeByType<'TryStatement'>, st: S, cb: Callback<S>) {
    cb(n.block, st)

    if (n.handler) {
      cb(n.handler, st)
    }

    if (n.finalizer) {
      cb(n.finalizer, st)
    }
  }
  TsArrayType<S>(n: NodeByType<'TsArrayType'>, st: S, cb: Callback<S>) {
    cb(n.elemType, st)
  }
  TsExpressionWithTypeArguments<S>(n: NodeByType<'TsExpressionWithTypeArguments'>, st: S, cb: Callback<S>) {
    cb(n.expression, st)

    if (n.typeArguments) {
      cb(n.typeArguments, st)
    }
  }
  TsInterfaceDeclaration<S>(n: NodeByType<'TsInterfaceDeclaration'>, st: S, cb: Callback<S>) {
    cb(n.id, st)
    cb(n.body, st)

    for (const ext of n.extends) {
      cb(ext, st)
    }

    if (n.typeParams) {
      cb(n.typeParams, st)
    }
  }
  TsInterfaceBody<S>(n: NodeByType<'TsInterfaceBody'>, st: S, cb: Callback<S>) {
    for (const ele of n.body) {
      cb(ele, st)
    }
  }
  TsKeywordType = ignore
  TsPropertySignature<S>(n: NodeByType<'TsPropertySignature'>, st: S, cb: Callback<S>) {
    cb(n.key, st)

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }
  }
  TsAsExpression<S>(n: NodeByType<'TsAsExpression'>, st: S, cb: Callback<S>) {
    cb(n.expression, st)
    cb(n.typeAnnotation, st)
  }
  TsCallSignatureDeclaration<S>(n: NodeByType<'TsCallSignatureDeclaration'>, st: S, cb: Callback<S>) {
    for (const param of n.params) {
      cb(param, st)
    }

    if (n.typeParams) {
      cb(n.typeParams, st)
    }

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }
  }
  TsConditionalType<S>(n: NodeByType<'TsConditionalType'>, st: S, cb: Callback<S>) {
    cb(n.checkType, st)
    cb(n.extendsType, st)
    cb(n.trueType, st)
    cb(n.falseType, st)
  }
  TsConstAssertion<S>(n: NodeByType<'TsConstAssertion'>, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  TsConstructorType<S>(n: NodeByType<'TsConstructorType'>, st: S, cb: Callback<S>) {
    for (const param of n.params) {
      cb(param, st)
    }

    cb(n.typeAnnotation, st)

    if (n.typeParams) {
      cb(n.typeParams, st)
    }
  }
  TsConstructSignatureDeclaration<S>(n: NodeByType<'TsConstructSignatureDeclaration'>, st: S, cb: Callback<S>) {
    for (const param of n.params) {
      cb(param, st)
    }

    if (n.typeParams) {
      cb(n.typeParams, st)
    }

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }
  }
  TsEnumDeclaration<S>(n: NodeByType<'TsEnumDeclaration'>, st: S, cb: Callback<S>) {
    cb(n.id, st)

    for (const member of n.members) {
      cb(member, st)
    }
  }
  TsEnumMember<S>(n: NodeByType<'TsEnumMember'>, st: S, cb: Callback<S>) {
    cb(n.id, st)

    if (n.init) {
      cb(n.init, st)
    }
  }
  TsExportAssignment<S>(n: NodeByType<'TsExportAssignment'>, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  TsExternalModuleReference<S>(n: NodeByType<'TsExternalModuleReference'>, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  TsFunctionType<S>(n: NodeByType<'TsFunctionType'>, st: S, cb: Callback<S>) {
    for (const param of n.params) {
      cb(param, st)
    }

    cb(n.typeAnnotation, st)

    if (n.typeParams) {
      cb(n.typeParams, st)
    }
  }
  TsGetterSignature<S>(n: NodeByType<'TsGetterSignature'>, st: S, cb: Callback<S>) {
    cb(n.key, st)

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }
  }
  TsImportEqualsDeclaration<S>(n: NodeByType<'TsImportEqualsDeclaration'>, st: S, cb: Callback<S>) {
    cb(n.id, st)
    cb(n.moduleRef, st)
  }
  TsImportType<S>(n: NodeByType<'TsImportType'>, st: S, cb: Callback<S>) {
    cb(n.argument, st)

    if (n.qualifier) {
      cb(n.qualifier, st)
    }

    if (n.typeArguments) {
      cb(n.typeArguments, st)
    }
  }
  TsIndexedAccessType<S>(n: NodeByType<'TsIndexedAccessType'>, st: S, cb: Callback<S>) {
    cb(n.indexType, st)
    cb(n.objectType, st)
  }
  TsIndexSignature<S>(n: NodeByType<'TsIndexSignature'>, st: S, cb: Callback<S>) {
    for (const param of n.params) {
      cb(param, st)
    }

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }
  }
  TsInferType<S>(n: NodeByType<'TsInferType'>, st: S, cb: Callback<S>) {
    cb(n.typeParam, st)
  }
  TsInstantiation<S>(n: NodeByType<'TsInstantiation'>, st: S, cb: Callback<S>) {
    cb(n.expression, st)
    cb(n.typeArguments, st)
  }
  TsIntersectionType<S>(n: NodeByType<'TsIntersectionType'>, st: S, cb: Callback<S>) {
    for (const type of n.types) {
      cb(type, st)
    }
  }
  TsLiteralType<S>(n: NodeByType<'TsLiteralType'>, st: S, cb: Callback<S>) {
    cb(n.literal, st)
  }
  TsMappedType<S>(n: NodeByType<'TsMappedType'>, st: S, cb: Callback<S>) {
    if (n.nameType) {
      cb(n.nameType, st)
    }

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }

    cb(n.typeParam, st)
  }
  TsMethodSignature<S>(n: NodeByType<'TsMethodSignature'>, st: S, cb: Callback<S>) {
    for (const param of n.params) {
      cb(param, st)
    }

    cb(n.key, st)

    if (n.typeAnn) {
      cb(n.typeAnn, st)
    }

    if (n.typeParams) {
      cb(n.typeParams, st)
    }
  }
  TsModuleBlock<S>(n: NodeByType<'TsModuleBlock'>, st: S, cb: Callback<S>) {
    for (const stmt of n.body) {
      cb(stmt, st)
    }
  }
  TsModuleDeclaration<S>(n: NodeByType<'TsModuleDeclaration'>, st: S, cb: Callback<S>) {
    cb(n.id, st)

    if (n.body) {
      cb(n.body, st)
    }
  }
  TsNamespaceDeclaration<S>(n: NodeByType<'TsNamespaceDeclaration'>, st: S, cb: Callback<S>) {
    cb(n.id, st)
    cb(n.body, st)
  }
  TsNamespaceExportDeclaration<S>(n: NodeByType<'TsNamespaceExportDeclaration'>, st: S, cb: Callback<S>) {
    cb(n.id, st)
  }
  TsNonNullExpression<S>(n: NodeByType<'TsNonNullExpression'>, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  TsOptionalType<S>(n: NodeByType<'TsOptionalType'>, st: S, cb: Callback<S>) {
    cb(n.typeAnnotation, st)
  }
  TsParameterProperty<S>(n: NodeByType<'TsParameterProperty'>, st: S, cb: Callback<S>) {
    for (const decorator of n.decorators ?? []) {
      cb(decorator, st)
    }

    cb(n.param, st)
  }
  TsParenthesizedType<S>(n: NodeByType<'TsParenthesizedType'>, st: S, cb: Callback<S>) {
    cb(n.typeAnnotation, st)
  }
  TsQualifiedName<S>(n: NodeByType<'TsQualifiedName'>, st: S, cb: Callback<S>) {
    cb(n.left, st)
    cb(n.right, st)
  }
  TsRestType<S>(n: NodeByType<'TsRestType'>, st: S, cb: Callback<S>) {
    cb(n.typeAnnotation, st)
  }
  TsSatisfiesExpression<S>(n: NodeByType<'TsSatisfiesExpression'>, st: S, cb: Callback<S>) {
    cb(n.expression, st)
    cb(n.typeAnnotation, st)
  }
  TsSetterSignature<S>(n: NodeByType<'TsSetterSignature'>, st: S, cb: Callback<S>) {
    cb(n.key, st)
    cb(n.param, st)
  }
  TsThisType = ignore
  TsTupleElement<S>(n: NodeByType<'TsTupleElement'>, st: S, cb: Callback<S>) {
    if (n.label) {
      cb(n.label, st)
    }

    cb(n.ty, st)
  }
  TsTupleType<S>(n: NodeByType<'TsTupleType'>, st: S, cb: Callback<S>) {
    for (const el of n.elemTypes) {
      cb(el, st)
    }
  }
  TsTypeAliasDeclaration<S>(n: NodeByType<'TsTypeAliasDeclaration'>, st: S, cb: Callback<S>) {
    cb(n.id, st)
    cb(n.typeAnnotation, st)

    if (n.typeParams) {
      cb(n.typeParams, st)
    }
  }
  TsType = ignore
  TsTypeAnnotation<S>(n: NodeByType<'TsTypeAnnotation'>, st: S, cb: Callback<S>) {
    cb(n.typeAnnotation, st)
  }
  TsTypeParameter<S>(n: NodeByType<'TsTypeParameter'>, st: S, cb: Callback<S>) {
    cb(n.name, st)

    if (n.constraint) {
      cb(n.constraint, st)
    }

    if (n.default) {
      cb(n.default, st)
    }
  }
  TsTypeParameterDeclaration<S>(n: NodeByType<'TsTypeParameterDeclaration'>, st: S, cb: Callback<S>) {
    for (const param of n.parameters) {
      cb(param, st)
    }
  }
  TsTypeAssertion<S>(n: NodeByType<'TsTypeAssertion'>, st: S, cb: Callback<S>) {
    cb(n.expression, st)
    cb(n.typeAnnotation, st)
  }
  TsTypeElement = ignore
  TsTypeLiteral<S>(n: NodeByType<'TsTypeLiteral'>, st: S, cb: Callback<S>) {
    for (const member of n.members) {
      cb(member, st)
    }
  }
  TsTypeOperator<S>(n: NodeByType<'TsTypeOperator'>, st: S, cb: Callback<S>) {
    cb(n.typeAnnotation, st)
  }
  TsTypeParameterInstantiation<S>(n: NodeByType<'TsTypeParameterInstantiation'>, st: S, cb: Callback<S>) {
    for (const param of n.params) {
      cb(param, st)
    }
  }
  TsTypeReference<S>(n: NodeByType<'TsTypeReference'>, st: S, cb: Callback<S>) {
    cb(n.typeName, st)

    if (n.typeParams) {
      cb(n.typeParams, st)
    }
  }
  TsTypePredicate<S>(n: NodeByType<'TsTypePredicate'>, st: S, cb: Callback<S>) {
    cb(n.paramName, st)

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }
  }
  TsTypeQuery<S>(n: NodeByType<'TsTypeQuery'>, st: S, cb: Callback<S>) {
    cb(n.exprName, st)

    if (n.typeArguments) {
      cb(n.typeArguments, st)
    }
  }
  TsUnionType<S>(n: NodeByType<'TsUnionType'>, st: S, cb: Callback<S>) {
    for (const type of n.types) {
      cb(type, st)
    }
  }
  UnaryExpression<S>(n: NodeByType<'UnaryExpression'>, st: S, cb: Callback<S>) {
    cb(n.argument, st)
  }
  UpdateExpression<S>(n: NodeByType<'UpdateExpression'>, st: S, cb: Callback<S>) {
    cb(n.argument, st)
  }
  VariableDeclaration<S>(n: NodeByType<'VariableDeclaration'>, st: S, cb: Callback<S>) {
    for (const decl of n.declarations) {
      cb(decl, st)
    }
  }
  VariableDeclarator<S>(n: NodeByType<'VariableDeclarator'>, st: S, cb: Callback<S>) {
    cb(n.id, st)

    if (n.init) {
      cb(n.init, st)
    }
  }
  WhileStatement<S>(n: NodeByType<'WhileStatement'>, st: S, cb: Callback<S>) {
    cb(n.test, st)
    cb(n.body, st)
  }
  WithStatement<S>(n: NodeByType<'WithStatement'>, st: S, cb: Callback<S>) {
    cb(n.object, st)
    cb(n.body, st)
  }
  YieldExpression<S>(n: NodeByType<'YieldExpression'>, st: S, cb: Callback<S>) {
    if (n.argument) {
      cb(n.argument, st)
    }
  }
}
export default BaseVisitor
