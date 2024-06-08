import * as swc from '@swc/types'

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
export type AggregateType = {
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
  | swc.ArrayExpression
  | swc.ArrayPattern
  | swc.ArrowFunctionExpression
  | swc.AssignmentExpression
  | swc.AssignmentPattern
  | swc.AssignmentPatternProperty
  | swc.AssignmentProperty
  | swc.AwaitExpression
  | swc.BigIntLiteral
  | swc.BinaryExpression
  | swc.BlockStatement
  | swc.BooleanLiteral
  | swc.BreakStatement
  | swc.CallExpression
  | swc.CallExpression
  | swc.CatchClause
  | swc.ClassDeclaration
  | swc.ClassExpression
  | swc.ClassMethod
  | swc.ClassProperty
  | swc.ComputedPropName
  | swc.ConditionalExpression
  | swc.Constructor
  | swc.ContinueStatement
  | swc.DebuggerStatement
  | swc.Decorator
  | swc.DoWhileStatement
  | swc.EmptyStatement
  | swc.ExportAllDeclaration
  | swc.ExportDeclaration
  | swc.ExportDefaultDeclaration
  | swc.ExportDefaultExpression
  | swc.ExportDefaultSpecifier
  | swc.ExportNamedDeclaration
  | swc.ExportNamespaceSpecifier
  | swc.ExportSpecifier
  | swc.ExpressionStatement
  | swc.ForInStatement
  | swc.ForOfStatement
  | swc.ForStatement
  | swc.FunctionDeclaration
  | swc.FunctionExpression
  | swc.GetterProperty
  | swc.Identifier
  | swc.Identifier
  | swc.IfStatement
  | swc.Import
  | swc.ImportDeclaration
  | swc.ImportDefaultSpecifier
  | swc.ImportNamespaceSpecifier
  | swc.ImportSpecifier
  | swc.Invalid
  | swc.JSXAttribute
  | swc.JSXClosingElement
  | swc.JSXClosingFragment
  | swc.JSXElement
  | swc.JSXEmptyExpression
  | swc.JSXExpressionContainer
  | swc.JSXFragment
  | swc.JSXMemberExpression
  | swc.JSXNamespacedName
  | swc.JSXOpeningElement
  | swc.JSXOpeningFragment
  | swc.JSXSpreadChild
  | swc.JSXText
  | swc.KeyValuePatternProperty
  | swc.KeyValueProperty
  | swc.LabeledStatement
  | swc.MemberExpression
  | swc.MetaProperty
  | swc.MethodProperty
  | swc.Module
  | swc.NewExpression
  | swc.NullLiteral
  | swc.NumericLiteral
  | swc.ObjectExpression
  | swc.ObjectPattern
  | swc.OptionalChainingExpression
  | swc.Param
  | swc.ParenthesisExpression
  | swc.PrivateMethod
  | swc.PrivateName
  | swc.PrivateProperty
  | swc.RegExpLiteral
  | swc.RestElement
  | swc.ReturnStatement
  | swc.Script
  | swc.SequenceExpression
  | swc.SetterProperty
  | swc.SpreadElement
  | swc.StaticBlock
  | swc.StringLiteral
  | swc.Super
  | swc.SuperPropExpression
  | swc.SwitchCase
  | swc.SwitchStatement
  | swc.TaggedTemplateExpression
  | swc.TemplateElement
  | swc.TemplateLiteral
  | swc.TemplateLiteral
  | swc.ThisExpression
  | swc.ThrowStatement
  | swc.TryStatement
  | swc.TsArrayType
  | swc.TsAsExpression
  | swc.TsCallSignatureDeclaration
  | swc.TsConditionalType
  | swc.TsConstAssertion
  | swc.TsConstructSignatureDeclaration
  | swc.TsConstructorType
  | swc.TsEnumDeclaration
  | swc.TsEnumMember
  | swc.TsExportAssignment
  | swc.TsExpressionWithTypeArguments
  | swc.TsExternalModuleReference
  | swc.TsFunctionType
  | swc.TsGetterSignature
  | swc.TsImportEqualsDeclaration
  | swc.TsImportType
  | swc.TsIndexSignature
  | swc.TsIndexedAccessType
  | swc.TsInferType
  | swc.TsInstantiation
  | swc.TsInterfaceBody
  | swc.TsInterfaceDeclaration
  | swc.TsIntersectionType
  | swc.TsKeywordType
  | swc.TsLiteralType
  | swc.TsMappedType
  | swc.TsMethodSignature
  | swc.TsModuleBlock
  | swc.TsModuleDeclaration
  | swc.TsNamespaceDeclaration
  | swc.TsNamespaceExportDeclaration
  | swc.TsNonNullExpression
  | swc.TsOptionalType
  | swc.TsParameterProperty
  | swc.TsParenthesizedType
  | swc.TsPropertySignature
  | swc.TsQualifiedName
  | swc.TsRestType
  | swc.TsSatisfiesExpression
  | swc.TsSetterSignature
  | swc.TsThisType
  | swc.TsTupleElement
  | swc.TsTupleType
  | swc.TsTypeAliasDeclaration
  | swc.TsTypeAnnotation
  | swc.TsTypeAssertion
  | swc.TsTypeLiteral
  | swc.TsTypeOperator
  | swc.TsTypeParameter
  | swc.TsTypeParameterDeclaration
  | swc.TsTypeParameterInstantiation
  | swc.TsTypePredicate
  | swc.TsTypeQuery
  | swc.TsTypeReference
  | swc.TsUnionType
  | swc.UnaryExpression
  | swc.UpdateExpression
  | swc.VariableDeclaration
  | swc.VariableDeclarator
  | swc.WhileStatement
  | swc.WithStatement
  | swc.YieldExpression
export type Callback<State> = (node: Node, state: State) => void
export type RecursiveVisitors<State> = {
  [type in AnyNode['type']]?: (node: Extract<AnyNode, { type: type }>, state: State, callback: Callback<State>) => void
} & {
  [type in keyof AggregateType]?: (node: AggregateType[type], state: State, callback: Callback<State>) => void
}
export type SimpleVisitors<State> = {
  [type in AnyNode['type']]?: (node: Extract<AnyNode, { type: type }>, state: State) => void
} & {
  [type in keyof AggregateType]?: (node: AggregateType[type], state: State) => void
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
