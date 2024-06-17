import type * as swc from '@swc/types'

export interface Node extends swc.Node {
  /**
   * Not all SWC nodes with a `type` have a `span`.
   * `SpreadElement` has one under the `spread` property.
   * `JSXMemberExpression` has none.
   * `JSXNamespacedName` has none.
   * `KeyValuePatternProperty` has none.
   * `AssignmentProperty` has none.
   * `TsQualifiedName` has none.
   *
   * @TODO find a better way to type the node in general so visitors
   * don't have to use `if` type narrowing checks on `span`.
   */
  span?: swc.Span
}

type AggregatedNode = {
  ClassMember: swc.ClassMember
  Declaration: swc.Declaration
  DefaultDecl: swc.DefaultDecl
  ExportSpecifier: swc.ExportSpecifier
  Expression: swc.Expression
  ImportSpecifier: swc.ImportSpecifier
  JSXAttrValue: swc.JSXAttrValue
  JSXElementChild: swc.JSXElementChild
  JSXElementName: swc.JSXElementName
  Literal: swc.Literal
  ModuleDeclaration: swc.ModuleDeclaration
  ObjectPatternProperty: swc.ObjectPatternProperty
  Pattern: swc.Pattern
  Property: swc.Property
  PropertyName: swc.PropertyName
  Statement: swc.Statement
  TsFnParameter: swc.TsFnParameter
  TsParameterPropertyParameter: swc.TsParameterPropertyParameter
  TsType: swc.TsType
  TsTypeElement: swc.TsTypeElement
}

export type AnyNode =
  | AggregatedNode[keyof AggregatedNode]
  | swc.CatchClause
  | swc.Decorator
  | swc.Import
  | swc.JSXAttribute
  | swc.JSXClosingElement
  | swc.JSXClosingFragment
  | swc.JSXOpeningElement
  | swc.JSXOpeningFragment
  | swc.Module
  | swc.Param
  | swc.Script
  | swc.SpreadElement
  | swc.Super
  | swc.SwitchCase
  | swc.TemplateElement
  | swc.TsConstructorType
  | swc.TsEnumMember
  | swc.TsExpressionWithTypeArguments
  | swc.TsExternalModuleReference
  | swc.TsFunctionType
  | swc.TsInterfaceBody
  | swc.TsIntersectionType
  | swc.TsModuleBlock
  | swc.TsNamespaceDeclaration
  | swc.TsParameterProperty
  | swc.TsQualifiedName
  | swc.TsTupleElement
  | swc.TsTypeAnnotation
  | swc.TsTypeParameter
  | swc.TsTypeParameterDeclaration
  | swc.TsTypeParameterInstantiation
  | swc.TsUnionType
  | swc.VariableDeclarator

export type Callback<State> = (node: Node, state: State) => void
export type RecursiveVisitors<State> = {
  [type in AnyNode['type']]?: (node: Extract<AnyNode, { type: type }>, state: State, callback: Callback<State>) => void
}
export type SimpleVisitors<State> = {
  [type in AnyNode['type']]?: (node: Extract<AnyNode, { type: type }>, state: State) => void
} & {
  [type in keyof AggregatedNode as `Aggregated${type}`]?: never //(node: AggregatedNode[type], state: State) => void
}
/**
 * does a 'simple' walk over a tree
 * @param node the AST node to walk
 * @param visitors an object with properties whose names correspond to node types in the {@link https://github.com/swc-project/swc/tree/main/packages/types | SWC spec}. The properties should contain functions that will be called with the node object and, if applicable the state at that point.
 * @param base a walker algorithm
 * @param state a start state. The default walker will simply visit all statements and expressions and not produce a meaningful state. (An example of a use of state is to track scope at each point in the tree.)
 */
export type Simple = <State>(
  node: Node,
  visitors: SimpleVisitors<State>,
  base?: RecursiveVisitors<State>,
  state?: State,
) => void

// emit
export const toto = 1
