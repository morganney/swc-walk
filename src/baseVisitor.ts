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
  TsKeywordType = ignore
  TsTupleElement<S>(n: swc.TsTupleElement, st: S, cb: Callback<S>) {
    cb(n, st)
    cb(n.ty, st)
  }
  TsTupleType<S>(n: swc.TsTupleType, st: S, cb: Callback<S>) {
    for (const el of n.elemTypes) {
      cb(el, st)
    }
  }
  TsTypeAnnotation<S>(n: swc.TsTypeAnnotation, st: S, cb: Callback<S>) {
    cb(n.typeAnnotation, st)
  }
  TsTypeParameterInstantiation<S>(n: swc.TsTypeParameterInstantiation, st: S, cb: Callback<S>) {
    for (const param of n.params) {
      cb(param, st)
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
