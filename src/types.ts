import type * as swc from '@swc/types'

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
  | swc.TsLiteral
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

type OptionalSpan<T> = T extends { span: swc.Span }
  ? Omit<T, 'span'> & { span: swc.Span | undefined }
  : T & { span?: swc.Span }

/**
 * Not all SWC nodes with a `type` have a `span` in practice.
 * This wrapper mirrors runtime behavior without forcing consumers
 * to defensively narrow `span` before accessing it.
 */
export type Node = OptionalSpan<AnyNode>
export type NodeType = AnyNode['type']
export type NodeByType<T extends NodeType> = Extract<Node, { type: T }>
export type Callback<State> = (node: Node, state: State) => void
export type RecursiveVisitors<State> = {
  [Type in NodeType]?: (node: NodeByType<Type>, state: State, callback: Callback<State>) => void
}
export type SimpleVisitors<State> = {
  [Type in NodeType]?: (node: NodeByType<Type>, state: State) => void
} & {
  [type in keyof AggregatedNode as `Aggregated${type}`]?: never //(node: AggregatedNode[type], state: State) => void
}
export type AncestorVisitors<State> = {
  [Type in NodeType]?: (node: NodeByType<Type>, state: State, ancestors: Node[]) => void
} & {
  [type in keyof AggregatedNode as `Aggregated${type}`]?: never //(node: AggregatedNode[type], state: State, ancestors: Node[]) => void
}
export type Ancestor = <State>(
  node: Node,
  visitors: AncestorVisitors<State>,
  base?: RecursiveVisitors<State>,
  state?: State,
) => void
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
export function isNodeOfType<T extends NodeType>(node: swc.Node | undefined, type: T): node is NodeByType<T> {
  return Boolean(node && node.type === type)
}
export function assertNodeType<T extends NodeType>(node: swc.Node, type: T): asserts node is NodeByType<T> {
  if (!isNodeOfType(node, type)) {
    throw new TypeError(`Expected node of type ${type}, received ${node.type}`)
  }
}
