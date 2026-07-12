import type { Node as SwcNode } from '@swc/types'

import { BaseVisitor } from './baseVisitor.js'
import type { Callback, SimpleVisitors, AncestorVisitors, Node, NodeType, RecursiveVisitors } from './types.js'

type RecursiveVisitorDispatcher<State> = (node: Node, state: State, callback: Callback<State>) => void
type SimpleVisitorDispatcher<State> = (node: Node, state: State) => void
type AncestorVisitorDispatcher<State> = (node: Node, state: State, ancestors: Node[]) => void

function isWalkableNode(value: unknown): value is Node {
  return value !== null && typeof value === 'object' && typeof Reflect.get(value, 'type') === 'string'
}

function assertWalkableRootNode(ast: SwcNode): asserts ast is Node {
  if (!isWalkableNode(ast)) {
    throw new TypeError('Root AST node must have a string type property')
  }
}

function getRecursiveVisitor<State>(
  baseVisitor: RecursiveVisitors<State>,
  node: Node,
  overrideType?: NodeType,
): RecursiveVisitorDispatcher<State> | undefined {
  const visitorType = overrideType ?? node.type

  return baseVisitor[visitorType] as RecursiveVisitorDispatcher<State> | undefined
}

function getSimpleVisitor<State>(
  visitors: SimpleVisitors<State>,
  nodeType: NodeType,
): SimpleVisitorDispatcher<State> | undefined {
  return visitors[nodeType] as SimpleVisitorDispatcher<State> | undefined
}

function getAncestorVisitor<State>(
  visitors: AncestorVisitors<State>,
  nodeType: NodeType,
): AncestorVisitorDispatcher<State> | undefined {
  return visitors[nodeType] as AncestorVisitorDispatcher<State> | undefined
}

export function simple<T = unknown>(
  ast: SwcNode,
  visitors: SimpleVisitors<T>,
  baseVisitor: RecursiveVisitors<T> = new BaseVisitor(),
  state?: T,
) {
  assertWalkableRootNode(ast)

  const callback = (node: Node, walkState: T, overrideType?: NodeType) => {
    if (!isWalkableNode(node)) {
      return
    }

    const recursiveVisitor = getRecursiveVisitor(baseVisitor, node, overrideType)

    if (!recursiveVisitor) {
      throw new TypeError(`No base visitor found for ${overrideType ?? node.type}`)
    }

    recursiveVisitor(node, walkState, callback)

    const visitor = getSimpleVisitor(visitors, node.type)

    if (visitor) {
      visitor(node, walkState)
    }
  }

  callback(ast, state as T)
}

export function ancestor<T = unknown>(
  ast: SwcNode,
  visitors: AncestorVisitors<T>,
  baseVisitor: RecursiveVisitors<T> = new BaseVisitor(),
  state?: T,
) {
  assertWalkableRootNode(ast)

  const ancestors: Node[] = []
  const callback = (node: Node, walkState: T, overrideType?: NodeType) => {
    if (!isWalkableNode(node)) {
      return
    }

    ancestors.push(node)

    const recursiveVisitor = getRecursiveVisitor(baseVisitor, node, overrideType)

    if (!recursiveVisitor) {
      throw new TypeError(`No base visitor found for ${overrideType ?? node.type}`)
    }

    recursiveVisitor(node, walkState, callback)

    const visitor = getAncestorVisitor(visitors, node.type)

    if (visitor) {
      visitor(node, walkState, ancestors)
    }

    ancestors.pop()
  }

  callback(ast, state as T)
}
