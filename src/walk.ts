import { simple as acornSimpleWalk } from 'acorn-walk'

import { BaseVisitor } from './baseVisitor.js'
import type { Simple } from './types.js'

const base = new BaseVisitor()

export const simple: Simple = (ast, visitors, baseVisitor = base, state) => {
  // @ts-expect-error (acorn-walk ast nodes have start/end instead of span)
  acornSimpleWalk(ast, visitors, baseVisitor, state)
}
