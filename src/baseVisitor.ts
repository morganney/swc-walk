import type * as swc from '@swc/types'

import type { Node, Callback, RecursiveVisitors } from './types.js'

const ignore = <S>(_n: Node, _st: S, _cb: Callback<S>) => {}

/**
 * @see https://github.com/swc-project/swc/blob/main/packages/core/src/Visitor.ts
 */
export class BaseVisitor implements Required<RecursiveVisitors<unknown>> {
  ArrayExpression<S>(n: swc.ArrayExpression, st: S, cb: Callback<S>) {
    for (const el of n.elements) {
      if (el) {
        cb(el.expression, st)
      }
    }
  }
  ArrayPattern<S>(n: swc.ArrayPattern, st: S, cb: Callback<S>) {
    for (const el of n.elements) {
      if (el) {
        cb(el, st)
      }
    }
  }
  ArrowFunctionExpression<S>(n: swc.ArrowFunctionExpression, st: S, cb: Callback<S>) {
    cb(n.body, st)

    if (n.typeParameters) {
      cb(n.typeParameters, st)
    }
  }
  AssignmentExpression<S>(n: swc.AssignmentExpression, st: S, cb: Callback<S>) {
    cb(n.left, st)
    cb(n.right, st)
  }
  AssignmentPattern<S>(n: swc.AssignmentPattern, st: S, cb: Callback<S>) {
    cb(n.left, st)
    cb(n.right, st)

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }
  }
  AssignmentPatternProperty<S>(n: swc.AssignmentPatternProperty, st: S, cb: Callback<S>) {
    cb(n.key, st)

    if (n.value) {
      cb(n.value, st)
    }
  }
  AssignmentProperty<S>(n: swc.AssignmentProperty, st: S, cb: Callback<S>) {
    cb(n.value, st)
  }
  AwaitExpression<S>(n: swc.AwaitExpression, st: S, cb: Callback<S>) {
    cb(n.argument, st)
  }
  BigIntLiteral = ignore
  BinaryExpression<S>(n: swc.BinaryExpression, st: S, cb: Callback<S>) {
    cb(n.left, st)
    cb(n.right, st)
  }
  BlockStatement<S>(n: swc.BlockStatement, st: S, cb: Callback<S>) {
    for (const stmt of n.stmts) {
      cb(stmt, st)
    }
  }
  BooleanLiteral = ignore
  BreakStatement<S>(n: swc.BreakStatement, st: S, cb: Callback<S>) {
    if (n.label) {
      cb(n.label, st)
    }
  }
  CallExpression<S>(n: swc.CallExpression, st: S, cb: Callback<S>) {
    cb(n.callee, st)

    for (const arg of n.arguments) {
      cb(arg.expression, st)
    }

    if (n.typeArguments) {
      cb(n.typeArguments, st)
    }
  }
  CatchClause<S>(n: swc.CatchClause, st: S, cb: Callback<S>) {
    if (n.param) {
      cb(n.param, st)
    }

    cb(n.body, st)
  }
  ClassDeclaration<S>(n: swc.ClassDeclaration, st: S, cb: Callback<S>) {
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
  ClassExpression<S>(n: swc.ClassExpression, st: S, cb: Callback<S>) {
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
  ClassMethod<S>(n: swc.ClassMethod, st: S, cb: Callback<S>) {
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
  ClassProperty<S>(n: swc.ClassProperty, st: S, cb: Callback<S>) {
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
  Computed<S>(n: swc.ComputedPropName, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  ConditionalExpression<S>(n: swc.ConditionalExpression, st: S, cb: Callback<S>) {
    cb(n.test, st)
    cb(n.consequent, st)
    cb(n.alternate, st)
  }
  Constructor<S>(n: swc.Constructor, st: S, cb: Callback<S>) {
    cb(n.key, st)

    for (const param of n.params) {
      cb(param, st)
    }

    if (n.body) {
      cb(n.body, st)
    }
  }
  ContinueStatement<S>(n: swc.ContinueStatement, st: S, cb: Callback<S>) {
    if (n.label) {
      cb(n.label, st)
    }
  }
  DebuggerStatement = ignore
  Decorator<S>(n: swc.Decorator, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  DoWhileStatement<S>(n: swc.DoWhileStatement, st: S, cb: Callback<S>) {
    cb(n.body, st)
    cb(n.test, st)
  }
  EmptyStatement = ignore
  ExportAllDeclaration<S>(n: swc.ExportAllDeclaration, st: S, cb: Callback<S>) {
    cb(n.source, st)

    // @ts-expect-error -- asserts is not typed in ExportAllDeclaration
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    n.asserts = n.asserts ?? n.with

    if (n.asserts) {
      cb(n.asserts, st)
    }
  }
  ExportDeclaration<S>(n: swc.ExportDeclaration, st: S, cb: Callback<S>) {
    cb(n.declaration, st)
  }
  ExportDefaultDeclaration<S>(n: swc.ExportDefaultDeclaration, st: S, cb: Callback<S>) {
    cb(n.decl, st)
  }
  ExportDefaultExpression<S>(n: swc.ExportDefaultExpression, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  ExportDefaultSpecifier<S>(n: swc.ExportDefaultSpecifier, st: S, cb: Callback<S>) {
    cb(n.exported, st)
  }
  ExportNamedDeclaration<S>(n: swc.ExportNamedDeclaration, st: S, cb: Callback<S>) {
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
  ExportNamespaceSpecifier<S>(n: swc.ExportNamespaceSpecifier, st: S, cb: Callback<S>) {
    cb(n.name, st)
  }
  ExportSpecifier<S>(n: swc.NamedExportSpecifier, st: S, cb: Callback<S>) {
    if (n.exported) {
      cb(n.exported, st)
    }

    cb(n.orig, st)
  }
  ExpressionStatement<S>(n: swc.ExpressionStatement, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  ForInStatement<S>(n: swc.ForInStatement, st: S, cb: Callback<S>) {
    cb(n.left, st)
    cb(n.right, st)
    cb(n.body, st)
  }
  ForOfStatement<S>(n: swc.ForOfStatement, st: S, cb: Callback<S>) {
    cb(n.left, st)
    cb(n.right, st)
    cb(n.body, st)
  }
  ForStatement<S>(n: swc.ForStatement, st: S, cb: Callback<S>) {
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
  FunctionDeclaration<S>(n: swc.FunctionDeclaration, st: S, cb: Callback<S>) {
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
  FunctionExpression<S>(n: swc.FunctionExpression, st: S, cb: Callback<S>) {
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
  GetterProperty<S>(n: swc.GetterProperty, st: S, cb: Callback<S>) {
    cb(n.key, st)

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }

    if (n.body) {
      cb(n.body, st)
    }
  }
  Identifier<S>(n: swc.Identifier | swc.BindingIdentifier, st: S, cb: Callback<S>) {
    if ('typeAnnotation' in n && n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }
  }
  IfStatement<S>(n: swc.IfStatement, st: S, cb: Callback<S>) {
    cb(n.test, st)
    cb(n.consequent, st)

    if (n.alternate) {
      cb(n.alternate, st)
    }
  }
  Import = ignore
  ImportDeclaration<S>(n: swc.ImportDeclaration, st: S, cb: Callback<S>) {
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
  ImportDefaultSpecifier<S>(n: swc.ImportDefaultSpecifier, st: S, cb: Callback<S>) {
    cb(n.local, st)
  }
  ImportNamespaceSpecifier<S>(n: swc.ImportNamespaceSpecifier, st: S, cb: Callback<S>) {
    cb(n.local, st)
  }
  ImportSpecifier<S>(n: swc.NamedImportSpecifier, st: S, cb: Callback<S>) {
    if (n.imported) {
      cb(n.imported, st)
    }

    cb(n.local, st)
  }
  Invalid = ignore
  JSXAttribute<S>(n: swc.JSXAttribute, st: S, cb: Callback<S>) {
    cb(n.name, st)

    if (n.value) {
      cb(n.value, st)
    }
  }
  JSXClosingElement<S>(n: swc.JSXClosingElement, st: S, cb: Callback<S>) {
    cb(n.name, st)
  }
  JSXClosingFragment = ignore
  JSXElement<S>(n: swc.JSXElement, st: S, cb: Callback<S>) {
    cb(n.opening, st)

    for (const child of n.children) {
      cb(child, st)
    }

    if (n.closing) {
      cb(n.closing, st)
    }
  }
  JSXEmptyExpression = ignore
  JSXExpressionContainer<S>(n: swc.JSXExpressionContainer, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  JSXFragment<S>(n: swc.JSXFragment, st: S, cb: Callback<S>) {
    cb(n.opening, st)

    for (const child of n.children) {
      cb(child, st)
    }

    cb(n.closing, st)
  }
  JSXMemberExpression<S>(n: swc.JSXMemberExpression, st: S, cb: Callback<S>) {
    cb(n.property, st)
    cb(n.object, st)
  }
  JSXNamespacedName<S>(n: swc.JSXNamespacedName, st: S, cb: Callback<S>) {
    cb(n.namespace, st)
    cb(n.name, st)
  }
  JSXOpeningElement<S>(n: swc.JSXOpeningElement, st: S, cb: Callback<S>) {
    cb(n.name, st)

    for (const attr of n.attributes) {
      cb(attr, st)
    }

    if (n.typeArguments) {
      cb(n.typeArguments, st)
    }
  }
  JSXOpeningFragment = ignore
  JSXSpreadChild<S>(n: swc.JSXSpreadChild, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  JSXText = ignore
  KeyValuePatternProperty<S>(n: swc.KeyValuePatternProperty, st: S, cb: Callback<S>) {
    cb(n.key, st)
    cb(n.value, st)
  }
  KeyValueProperty<S>(n: swc.KeyValueProperty, st: S, cb: Callback<S>) {
    cb(n.key, st)
    cb(n.value, st)
  }
  LabeledStatement<S>(n: swc.LabeledStatement, st: S, cb: Callback<S>) {
    cb(n.label, st)
    cb(n.body, st)
  }
  MemberExpression<S>(n: swc.MemberExpression, st: S, cb: Callback<S>) {
    cb(n.object, st)
    cb(n.property, st)
  }
  MetaProperty = ignore
  MethodProperty<S>(n: swc.MethodProperty, st: S, cb: Callback<S>) {
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
  Module<S>(n: swc.Module, st: S, cb: Callback<S>) {
    for (const stmt of n.body) {
      cb(stmt, st)
    }
  }
  NewExpression<S>(n: swc.NewExpression, st: S, cb: Callback<S>) {
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
  ObjectExpression<S>(n: swc.ObjectExpression, st: S, cb: Callback<S>) {
    for (const property of n.properties) {
      cb(property, st)
    }
  }
  ObjectPattern<S>(n: swc.ObjectPattern, st: S, cb: Callback<S>) {
    for (const property of n.properties) {
      cb(property, st)
    }

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }
  }
  OptionalChainingExpression<S>(n: swc.OptionalChainingExpression, st: S, cb: Callback<S>) {
    cb(n.base, st)
  }
  Parameter<S>(n: swc.Param, st: S, cb: Callback<S>) {
    for (const decorator of n.decorators ?? []) {
      cb(decorator, st)
    }

    cb(n.pat, st)
  }
  ParenthesisExpression<S>(n: swc.ParenthesisExpression, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  PrivateMethod<S>(n: swc.PrivateMethod, st: S, cb: Callback<S>) {
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
  PrivateProperty<S>(n: swc.PrivateProperty, st: S, cb: Callback<S>) {
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
  RestElement<S>(n: swc.RestElement, st: S, cb: Callback<S>) {
    cb(n.argument, st)

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }
  }
  ReturnStatement<S>(n: swc.ReturnStatement, st: S, cb: Callback<S>) {
    if (n.argument) {
      cb(n.argument, st)
    }
  }
  Script<S>(n: swc.Script, st: S, cb: Callback<S>) {
    for (const stmt of n.body) {
      cb(stmt, st)
    }
  }
  SequenceExpression<S>(n: swc.SequenceExpression, st: S, cb: Callback<S>) {
    for (const expression of n.expressions) {
      cb(expression, st)
    }
  }
  SetterProperty<S>(n: swc.SetterProperty, st: S, cb: Callback<S>) {
    cb(n.key, st)
    cb(n.param, st)

    if (n.body) {
      cb(n.body, st)
    }
  }
  SpreadElement<S>(n: swc.SpreadElement, st: S, cb: Callback<S>) {
    cb(n.arguments, st)
  }
  StaticBlock<S>(n: swc.StaticBlock, st: S, cb: Callback<S>) {
    cb(n.body, st)
  }
  StringLiteral = ignore
  Super = ignore
  SuperPropExpression<S>(n: swc.SuperPropExpression, st: S, cb: Callback<S>) {
    cb(n.obj, st)
    cb(n.property, st)
  }
  SwitchCase<S>(n: swc.SwitchCase, st: S, cb: Callback<S>) {
    if (n.test) {
      cb(n.test, st)
    }

    for (const consequent of n.consequent) {
      cb(consequent, st)
    }
  }
  SwitchStatement<S>(n: swc.SwitchStatement, st: S, cb: Callback<S>) {
    cb(n.discriminant, st)

    for (const cases of n.cases) {
      cb(cases, st)
    }
  }
  TaggedTemplateExpression<S>(n: swc.TaggedTemplateExpression, st: S, cb: Callback<S>) {
    cb(n.tag, st)
    cb(n.template, st)

    if (n.typeParameters) {
      cb(n.typeParameters, st)
    }
  }
  TemplateElement = ignore
  TemplateLiteral<S>(n: swc.TemplateLiteral | swc.TsTemplateLiteralType, st: S, cb: Callback<S>) {
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
  ThrowStatement<S>(n: swc.ThrowStatement, st: S, cb: Callback<S>) {
    cb(n.argument, st)
  }
  TryStatement<S>(n: swc.TryStatement, st: S, cb: Callback<S>) {
    cb(n.block, st)

    if (n.handler) {
      cb(n.handler, st)
    }

    if (n.finalizer) {
      cb(n.finalizer, st)
    }
  }
  TsArrayType<S>(n: swc.TsArrayType, st: S, cb: Callback<S>) {
    cb(n.elemType, st)
  }
  TsExpressionWithTypeArguments<S>(n: swc.TsExpressionWithTypeArguments, st: S, cb: Callback<S>) {
    cb(n.expression, st)

    if (n.typeArguments) {
      cb(n.typeArguments, st)
    }
  }
  TsInterfaceDeclaration<S>(n: swc.TsInterfaceDeclaration, st: S, cb: Callback<S>) {
    cb(n.id, st)
    cb(n.body, st)

    for (const ext of n.extends) {
      cb(ext, st)
    }

    if (n.typeParams) {
      cb(n.typeParams, st)
    }
  }
  TsInterfaceBody<S>(n: swc.TsInterfaceBody, st: S, cb: Callback<S>) {
    for (const ele of n.body) {
      cb(ele, st)
    }
  }
  TsKeywordType = ignore
  TsPropertySignature<S>(n: swc.TsPropertySignature, st: S, cb: Callback<S>) {
    cb(n.key, st)

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }
  }
  TsAsExpression<S>(n: swc.TsAsExpression, st: S, cb: Callback<S>) {
    cb(n.expression, st)
    cb(n.typeAnnotation, st)
  }
  TsCallSignatureDeclaration<S>(n: swc.TsCallSignatureDeclaration, st: S, cb: Callback<S>) {
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
  TsConditionalType<S>(n: swc.TsConditionalType, st: S, cb: Callback<S>) {
    cb(n.checkType, st)
    cb(n.extendsType, st)
    cb(n.trueType, st)
    cb(n.falseType, st)
  }
  TsConstAssertion<S>(n: swc.TsConstAssertion, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  TsConstructorType<S>(n: swc.TsConstructorType, st: S, cb: Callback<S>) {
    for (const param of n.params) {
      cb(param, st)
    }

    cb(n.typeAnnotation, st)

    if (n.typeParams) {
      cb(n.typeParams, st)
    }
  }
  TsConstructSignatureDeclaration<S>(n: swc.TsConstructSignatureDeclaration, st: S, cb: Callback<S>) {
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
  TsEnumDeclaration<S>(n: swc.TsEnumDeclaration, st: S, cb: Callback<S>) {
    cb(n.id, st)

    for (const member of n.members) {
      cb(member, st)
    }
  }
  TsEnumMember<S>(n: swc.TsEnumMember, st: S, cb: Callback<S>) {
    cb(n.id, st)

    if (n.init) {
      cb(n.init, st)
    }
  }
  TsExportAssignment<S>(n: swc.TsExportAssignment, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  TsExternalModuleReference<S>(n: swc.TsExternalModuleReference, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  TsFunctionType<S>(n: swc.TsFunctionType, st: S, cb: Callback<S>) {
    for (const param of n.params) {
      cb(param, st)
    }

    cb(n.typeAnnotation, st)

    if (n.typeParams) {
      cb(n.typeParams, st)
    }
  }
  TsGetterSignature<S>(n: swc.TsGetterSignature, st: S, cb: Callback<S>) {
    cb(n.key, st)

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }
  }
  TsImportEqualsDeclaration<S>(n: swc.TsImportEqualsDeclaration, st: S, cb: Callback<S>) {
    cb(n.id, st)
    cb(n.moduleRef, st)
  }
  TsImportType<S>(n: swc.TsImportType, st: S, cb: Callback<S>) {
    cb(n.argument, st)

    if (n.qualifier) {
      cb(n.qualifier, st)
    }

    if (n.typeArguments) {
      cb(n.typeArguments, st)
    }
  }
  TsIndexedAccessType<S>(n: swc.TsIndexedAccessType, st: S, cb: Callback<S>) {
    cb(n.indexType, st)
    cb(n.objectType, st)
  }
  TsIndexSignature<S>(n: swc.TsIndexSignature, st: S, cb: Callback<S>) {
    for (const param of n.params) {
      cb(param, st)
    }

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }
  }
  TsInferType<S>(n: swc.TsInferType, st: S, cb: Callback<S>) {
    cb(n.typeParam, st)
  }
  TsInstantiation<S>(n: swc.TsInstantiation, st: S, cb: Callback<S>) {
    cb(n.expression, st)
    cb(n.typeArguments, st)
  }
  TsIntersectionType<S>(n: swc.TsIntersectionType, st: S, cb: Callback<S>) {
    for (const type of n.types) {
      cb(type, st)
    }
  }
  TsLiteralType<S>(n: swc.TsLiteralType, st: S, cb: Callback<S>) {
    cb(n.literal, st)
  }
  TsMappedType<S>(n: swc.TsMappedType, st: S, cb: Callback<S>) {
    if (n.nameType) {
      cb(n.nameType, st)
    }

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }

    cb(n.typeParam, st)
  }
  TsMethodSignature<S>(n: swc.TsMethodSignature, st: S, cb: Callback<S>) {
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
  TsModuleBlock<S>(n: swc.TsModuleBlock, st: S, cb: Callback<S>) {
    for (const stmt of n.body) {
      cb(stmt, st)
    }
  }
  TsModuleDeclaration<S>(n: swc.TsModuleDeclaration, st: S, cb: Callback<S>) {
    cb(n.id, st)

    if (n.body) {
      cb(n.body, st)
    }
  }
  TsNamespaceDeclaration<S>(n: swc.TsNamespaceDeclaration, st: S, cb: Callback<S>) {
    cb(n.id, st)
    cb(n.body, st)
  }
  TsNamespaceExportDeclaration<S>(n: swc.TsNamespaceExportDeclaration, st: S, cb: Callback<S>) {
    cb(n.id, st)
  }
  TsNonNullExpression<S>(n: swc.TsNonNullExpression, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  TsOptionalType<S>(n: swc.TsOptionalType, st: S, cb: Callback<S>) {
    cb(n.typeAnnotation, st)
  }
  TsParameterProperty<S>(n: swc.TsParameterProperty, st: S, cb: Callback<S>) {
    for (const decorator of n.decorators ?? []) {
      cb(decorator, st)
    }

    cb(n.param, st)
  }
  TsParenthesizedType<S>(n: swc.TsParenthesizedType, st: S, cb: Callback<S>) {
    cb(n.typeAnnotation, st)
  }
  TsQualifiedName<S>(n: swc.TsQualifiedName, st: S, cb: Callback<S>) {
    cb(n.left, st)
    cb(n.right, st)
  }
  TsRestType<S>(n: swc.TsRestType, st: S, cb: Callback<S>) {
    cb(n.typeAnnotation, st)
  }
  TsSatisfiesExpression<S>(n: swc.TsSatisfiesExpression, st: S, cb: Callback<S>) {
    cb(n.expression, st)
    cb(n.typeAnnotation, st)
  }
  TsSetterSignature<S>(n: swc.TsSetterSignature, st: S, cb: Callback<S>) {
    cb(n.key, st)
    cb(n.param, st)
  }
  TsThisType = ignore
  TsTupleElement<S>(n: swc.TsTupleElement, st: S, cb: Callback<S>) {
    if (n.label) {
      cb(n.label, st)
    }

    cb(n.ty, st)
  }
  TsTupleType<S>(n: swc.TsTupleType, st: S, cb: Callback<S>) {
    for (const el of n.elemTypes) {
      cb(el, st)
    }
  }
  TsTypeAliasDeclaration<S>(n: swc.TsTypeAliasDeclaration, st: S, cb: Callback<S>) {
    cb(n.id, st)
    cb(n.typeAnnotation, st)

    if (n.typeParams) {
      cb(n.typeParams, st)
    }
  }
  TsType = ignore
  TsTypeAnnotation<S>(n: swc.TsTypeAnnotation, st: S, cb: Callback<S>) {
    cb(n.typeAnnotation, st)
  }
  TsTypeParameter<S>(n: swc.TsTypeParameter, st: S, cb: Callback<S>) {
    cb(n.name, st)

    if (n.constraint) {
      cb(n.constraint, st)
    }

    if (n.default) {
      cb(n.default, st)
    }
  }
  TsTypeParameterDeclaration<S>(n: swc.TsTypeParameterDeclaration, st: S, cb: Callback<S>) {
    for (const param of n.parameters) {
      cb(param, st)
    }
  }
  TsTypeAssertion<S>(n: swc.TsTypeAssertion, st: S, cb: Callback<S>) {
    cb(n.expression, st)
    cb(n.typeAnnotation, st)
  }
  TsTypeElement = ignore
  TsTypeLiteral<S>(n: swc.TsTypeLiteral, st: S, cb: Callback<S>) {
    for (const member of n.members) {
      cb(member, st)
    }
  }
  TsTypeOperator<S>(n: swc.TsTypeOperator, st: S, cb: Callback<S>) {
    cb(n.typeAnnotation, st)
  }
  TsTypeParameterInstantiation<S>(n: swc.TsTypeParameterInstantiation, st: S, cb: Callback<S>) {
    for (const param of n.params) {
      cb(param, st)
    }
  }
  TsTypeReference<S>(n: swc.TsTypeReference, st: S, cb: Callback<S>) {
    cb(n.typeName, st)

    if (n.typeParams) {
      cb(n.typeParams, st)
    }
  }
  TsTypePredicate<S>(n: swc.TsTypePredicate, st: S, cb: Callback<S>) {
    cb(n.paramName, st)

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }
  }
  TsTypeQuery<S>(n: swc.TsTypeQuery, st: S, cb: Callback<S>) {
    cb(n.exprName, st)

    if (n.typeArguments) {
      cb(n.typeArguments, st)
    }
  }
  TsUnionType<S>(n: swc.TsUnionType, st: S, cb: Callback<S>) {
    for (const type of n.types) {
      cb(type, st)
    }
  }
  UnaryExpression<S>(n: swc.UnaryExpression, st: S, cb: Callback<S>) {
    cb(n.argument, st)
  }
  UpdateExpression<S>(n: swc.UpdateExpression, st: S, cb: Callback<S>) {
    cb(n.argument, st)
  }
  VariableDeclaration<S>(n: swc.VariableDeclaration, st: S, cb: Callback<S>) {
    for (const decl of n.declarations) {
      cb(decl, st)
    }
  }
  VariableDeclarator<S>(n: swc.VariableDeclarator, st: S, cb: Callback<S>) {
    cb(n.id, st)

    if (n.init) {
      cb(n.init, st)
    }
  }
  WhileStatement<S>(n: swc.WhileStatement, st: S, cb: Callback<S>) {
    cb(n.test, st)
    cb(n.body, st)
  }
  WithStatement<S>(n: swc.WithStatement, st: S, cb: Callback<S>) {
    cb(n.object, st)
    cb(n.body, st)
  }
  YieldExpression<S>(n: swc.YieldExpression, st: S, cb: Callback<S>) {
    if (n.argument) {
      cb(n.argument, st)
    }
  }
}
export default BaseVisitor
