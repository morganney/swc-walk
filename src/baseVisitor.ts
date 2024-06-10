import * as swc from '@swc/types'

import type { Node, Callback } from './types.js'

const ignore = <S>(_n: Node, _st: S, _cb: Callback<S>) => {}

export class BaseVisitor {
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
  BlockStatement<S>(n: swc.BlockStatement, st: S, cb: Callback<S>) {
    for (const stmt of n.stmts) {
      cb(stmt, st)
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
  ExpressionStatement<S>(n: swc.ExpressionStatement, st: S, cb: Callback<S>) {
    cb(n.expression, st)
  }
  Identifier = ignore
  MemberExpression<S>(n: swc.MemberExpression, st: S, cb: Callback<S>) {
    cb(n.object, st)
    cb(n.property, st)
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
  NumericLiteral = ignore
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
  StringLiteral = ignore
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
}
export default BaseVisitor
