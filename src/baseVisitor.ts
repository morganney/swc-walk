import type * as swc from '@swc/types'

import type { Node, Callback, RecursiveVisitors } from './types.js'

const ignore = <S>(_n: Node, _st: S, _cb: Callback<S>) => {}

export class BaseVisitor<T> implements Required<RecursiveVisitors<T>> {
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
  AssignmentProperty<S>(_n: swc.AssignmentProperty, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  AwaitExpression<S>(_n: swc.AwaitExpression, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  BigIntLiteral<S>(_n: swc.BigIntLiteral, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  BinaryExpression<S>(_n: swc.BinaryExpression, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  BlockStatement<S>(n: swc.BlockStatement, st: S, cb: Callback<S>) {
    for (const stmt of n.stmts) {
      cb(stmt, st)
    }
  }
  BooleanLiteral<S>(_n: swc.BooleanLiteral, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  BreakStatement<S>(_n: swc.BreakStatement, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  CallExpression<S>(n: swc.CallExpression, st: S, cb: Callback<S>) {
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
  CatchClause<S>(n: swc.CatchClause, st: S, cb: Callback<S>) {
    if (n) {
      if (n.param) {
        cb(n.param, st)
      }

      cb(n.body, st)
    }
  }
  ClassDeclaration<S>(_n: swc.ClassDeclaration, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ClassExpression<S>(_n: swc.ClassExpression, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ClassMember<S>(_n: swc.ClassMember, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ClassMethod<S>(_n: swc.ClassMethod, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ClassProperty<S>(_n: swc.ClassProperty, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  Computed<S>(_n: swc.ComputedPropName, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ConditionalExpression<S>(_n: swc.ConditionalExpression, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  Constructor<S>(_n: swc.Constructor, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ContinueStatement<S>(_n: swc.ContinueStatement, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  DebuggerStatement<S>(_n: swc.DebuggerStatement, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  Declaration<S>(_n: swc.Declaration, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  Decorator<S>(_n: swc.Decorator, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  DefaultDecl<S>(_n: swc.DefaultDecl, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  DoWhileStatement<S>(_n: swc.DoWhileStatement, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  EmptyStatement<S>(_n: swc.EmptyStatement, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ExportAllDeclaration<S>(_n: swc.ExportAllDeclaration, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ExportDeclaration<S>(_n: swc.ExportDeclaration, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ExportDefaultDeclaration<S>(_n: swc.ExportDefaultDeclaration, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ExportDefaultExpression<S>(_n: swc.ExportDefaultExpression, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ExportDefaultSpecifier<S>(_n: swc.ExportDefaultSpecifier, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ExportNamedDeclaration<S>(_n: swc.ExportNamedDeclaration, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ExportNamespaceSpecifier<S>(_n: swc.ExportNamespaceSpecifier, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ExportSpecifier<S>(_n: swc.ExportSpecifier, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  Expression<S>(_n: swc.Expression, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ExpressionStatement<S>(n: swc.ExpressionStatement, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  ForInStatement<S>(_n: swc.ForInStatement, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ForOfStatement<S>(_n: swc.ForOfStatement, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ForStatement<S>(_n: swc.ForStatement, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  FunctionDeclaration<S>(_n: swc.FunctionDeclaration, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  FunctionExpression<S>(_n: swc.FunctionExpression, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  GetterProperty<S>(_n: swc.GetterProperty, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  Identifier = ignore
  IfStatement<S>(_n: swc.IfStatement, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  Import<S>(_n: swc.Import, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ImportDeclaration<S>(_n: swc.ImportDeclaration, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ImportDefaultSpecifier<S>(_n: swc.ImportDefaultSpecifier, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ImportNamespaceSpecifier<S>(_n: swc.ImportNamespaceSpecifier, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ImportSpecifier<S>(_n: swc.ImportSpecifier, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  Invalid<S>(_n: swc.Invalid, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  JSXAttribute<S>(_n: swc.JSXAttribute, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  JSXAttrValue<S>(_n: swc.JSXAttrValue, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  JSXClosingElement<S>(_n: swc.JSXClosingElement, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  JSXClosingFragment<S>(_n: swc.JSXClosingFragment, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  JSXElement<S>(_n: swc.JSXElement, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  JSXElementChild<S>(_n: swc.JSXElementChild, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  JSXElementName<S>(_n: swc.JSXElementName, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  JSXEmptyExpression<S>(_n: swc.JSXEmptyExpression, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  JSXExpressionContainer<S>(_n: swc.JSXExpressionContainer, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  JSXFragment<S>(_n: swc.JSXFragment, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  JSXMemberExpression<S>(_n: swc.JSXMemberExpression, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  JSXNamespacedName<S>(_n: swc.JSXNamespacedName, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  JSXOpeningElement<S>(_n: swc.JSXOpeningElement, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  JSXOpeningFragment<S>(_n: swc.JSXOpeningFragment, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  JSXSpreadChild<S>(_n: swc.JSXSpreadChild, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  JSXText<S>(_n: swc.JSXText, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  KeyValuePatternProperty<S>(_n: swc.KeyValuePatternProperty, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  KeyValueProperty<S>(_n: swc.KeyValueProperty, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  LabeledStatement<S>(_n: swc.LabeledStatement, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  Literal<S>(_n: swc.Literal, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  MemberExpression<S>(n: swc.MemberExpression, st: S, cb: Callback<S>) {
    cb(n.object, st)
    cb(n.property, st)
  }
  MetaProperty<S>(_n: swc.MetaProperty, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  MethodProperty<S>(_n: swc.MethodProperty, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  Module<S>(n: swc.Module, st: S, cb: Callback<S>) {
    for (const stmt of n.body) {
      cb(stmt, st)
    }
  }
  ModuleDeclaration<S>(_n: swc.ModuleDeclaration, _st: S, _cb: Callback<S>) {
    // not implemented
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
  NullLiteral<S>(_n: swc.NullLiteral, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  NumericLiteral = ignore
  ObjectExpression<S>(_n: swc.ObjectExpression, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ObjectPattern<S>(_n: swc.ObjectPattern, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ObjectPatternProperty<S>(_n: swc.ObjectPatternProperty, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  OptionalChainingExpression<S>(_n: swc.OptionalChainingExpression, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  Parameter<S>(_n: swc.Param, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ParenthesisExpression<S>(_n: swc.ParenthesisExpression, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  Pattern<S>(_n: swc.Pattern, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  PrivateMethod<S>(_n: swc.PrivateMethod, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  PrivateName<S>(_n: swc.PrivateName, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  PrivateProperty<S>(_n: swc.PrivateProperty, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  Property<S>(_n: swc.Property, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  PropertyName<S>(_n: swc.PropertyName, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  RegExpLiteral<S>(_n: swc.RegExpLiteral, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  RestElement<S>(_n: swc.RestElement, _st: S, _cb: Callback<S>) {
    // not implemented
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
  SequenceExpression<S>(_n: swc.SequenceExpression, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  SetterProperty<S>(_n: swc.SetterProperty, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  SpreadElement<S>(_n: swc.SpreadElement, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  Statement<S>(_n: swc.Statement, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  StaticBlock<S>(_n: swc.StaticBlock, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  StringLiteral = ignore
  Super<S>(_n: swc.Super, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  SuperPropExpression<S>(_n: swc.SuperPropExpression, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  SwitchCase<S>(_n: swc.SwitchCase, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  SwitchStatement<S>(_n: swc.SwitchStatement, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TaggedTemplateExpression<S>(_n: swc.TaggedTemplateExpression, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TemplateElement<S>(_n: swc.TemplateElement, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TemplateLiteral<S>(_n: swc.TemplateLiteral, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  ThisExpression<S>(_n: swc.ThisExpression, _st: S, _cb: Callback<S>) {
    // not implemented
  }
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
    for (const param of n.params) {
      cb(param, st)
    }

    cb(n.key, st)

    if (n.typeAnnotation) {
      cb(n.typeAnnotation, st)
    }

    if (n.typeParams) {
      cb(n.typeParams, st)
    }
  }
  TsAsExpression<S>(_n: swc.TsAsExpression, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsCallSignatureDeclaration<S>(_n: swc.TsCallSignatureDeclaration, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsConditionalType<S>(_n: swc.TsConditionalType, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsConstAssertion<S>(_n: swc.TsConstAssertion, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsConstructorType<S>(_n: swc.TsConstructorType, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsConstructSignatureDeclaration<S>(_n: swc.TsConstructSignatureDeclaration, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsEnumDeclaration<S>(_n: swc.TsEnumDeclaration, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsEnumMember<S>(_n: swc.TsEnumMember, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsExportAssignment<S>(_n: swc.TsExportAssignment, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsExternalModuleReference<S>(_n: swc.TsExternalModuleReference, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsFnParameter<S>(_n: swc.TsFnParameter, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsFunctionType<S>(_n: swc.TsFunctionType, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsGetterSignature<S>(_n: swc.TsGetterSignature, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsImportEqualsDeclaration<S>(_n: swc.TsImportEqualsDeclaration, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsImportType<S>(_n: swc.TsImportType, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsIndexedAccessType<S>(_n: swc.TsIndexedAccessType, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsIndexSignature<S>(_n: swc.TsIndexSignature, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsInferType<S>(_n: swc.TsInferType, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsInstantiation<S>(_n: swc.TsInstantiation, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsIntersectionType<S>(_n: swc.TsIntersectionType, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsLiteralType<S>(_n: swc.TsLiteralType, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsMappedType<S>(_n: swc.TsMappedType, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsMethodSignature<S>(_n: swc.TsMethodSignature, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsModuleBlock<S>(_n: swc.TsModuleBlock, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsModuleDeclaration<S>(_n: swc.TsModuleDeclaration, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsNamespaceDeclaration<S>(_n: swc.TsNamespaceDeclaration, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsNamespaceExportDeclaration<S>(_n: swc.TsNamespaceExportDeclaration, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsNonNullExpression<S>(_n: swc.TsNonNullExpression, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsOptionalType<S>(_n: swc.TsOptionalType, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsParameterProperty<S>(_n: swc.TsParameterProperty, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsParameterPropertyParameter<S>(_n: swc.TsParameterPropertyParameter, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsParenthesizedType<S>(_n: swc.TsParenthesizedType, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsQualifiedName<S>(_n: swc.TsQualifiedName, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsRestType<S>(_n: swc.TsRestType, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsSatisfiesExpression<S>(_n: swc.TsSatisfiesExpression, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsSetterSignature<S>(_n: swc.TsSetterSignature, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsThisType<S>(_n: swc.TsThisType, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsTupleElement<S>(n: swc.TsTupleElement, st: S, cb: Callback<S>) {
    cb(n, st)
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
  TsType<S>(_n: swc.TsType, _st: S, _cb: Callback<S>) {
    // not implemented
  }
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
  TsTypeAssertion<S>(_n: swc.TsTypeAssertion, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsTypeElement<S>(_n: swc.TsTypeElement, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsTypeLiteral<S>(_n: swc.TsTypeLiteral, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsTypeOperator<S>(_n: swc.TsTypeOperator, _st: S, _cb: Callback<S>) {
    // not implemented
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
  TsTypePredicate<S>(_n: swc.TsTypePredicate, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsTypeQuery<S>(_n: swc.TsTypeQuery, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  TsUnionType<S>(_n: swc.TsUnionType, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  UnaryExpression<S>(_n: swc.UnaryExpression, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  UpdateExpression<S>(_n: swc.UpdateExpression, _st: S, _cb: Callback<S>) {
    // not implemented
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
  WhileStatement<S>(_n: swc.WhileStatement, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  WithStatement<S>(_n: swc.WithStatement, _st: S, _cb: Callback<S>) {
    // not implemented
  }
  YieldExpression<S>(_n: swc.YieldExpression, _st: S, _cb: Callback<S>) {
    // not implemented
  }
}
export default BaseVisitor
