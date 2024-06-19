import type { Node } from '@swc/types'
import { simple as acornSimpleWalk } from 'acorn-walk'

import { BaseVisitor } from './baseVisitor.js'
import type { SimpleVisitors } from './types.js'

export function simple<T = unknown>(
  ast: Node,
  visitors: SimpleVisitors<T>,
  baseVisitor = new BaseVisitor(),
  state?: T,
) {
  // @ts-expect-error (acorn-walk ast nodes have start/end instead of span)
  acornSimpleWalk<T>(ast, visitors, baseVisitor, state)
}
