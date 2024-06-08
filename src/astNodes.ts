export interface Span {
  start: number
  end: number
  ctxt: number
}

export interface Node {
  type: string
}

export interface HasSpan {
  span: Span
}

export interface HasDecorator {
  decorators?: Decorator[]
}

export interface Class extends HasSpan, HasDecorator {
  body: ClassMember[]

  superClass?: Expression

  isAbstract: boolean

  typeParams?: TsTypeParameterDeclaration

  superTypeParams?: TsTypeParameterInstantiation

  implements: TsExpressionWithTypeArguments[]
}

export type ClassMember =
  | Constructor
  | ClassMethod
  | PrivateMethod
  | ClassProperty
  | PrivateProperty
  | TsIndexSignature
  | EmptyStatement
  | StaticBlock

export interface ClassPropertyBase extends Node, HasSpan, HasDecorator {
  value?: Expression

  typeAnnotation?: TsTypeAnnotation

  isStatic: boolean

  accessibility?: Accessibility

  isOptional: boolean

  isOverride: boolean

  readonly: boolean

  definite: boolean
}

export interface ClassProperty extends ClassPropertyBase {
  type: 'ClassProperty'

  key: PropertyName

  isAbstract: boolean

  declare: boolean
}

export interface PrivateProperty extends ClassPropertyBase {
  type: 'PrivateProperty'

  key: PrivateName
}

export interface Param extends Node, HasSpan, HasDecorator {
  type: 'Parameter'
  pat: Pattern
}

export interface Constructor extends Node, HasSpan {
  type: 'Constructor'

  key: PropertyName

  params: (TsParameterProperty | Param)[]

  body?: BlockStatement

  accessibility?: Accessibility

  isOptional: boolean
}

export interface ClassMethodBase extends Node, HasSpan {
  function: Fn

  kind: MethodKind

  isStatic: boolean

  accessibility?: Accessibility

  isAbstract: boolean

  isOptional: boolean

  isOverride: boolean
}

export interface ClassMethod extends ClassMethodBase {
  type: 'ClassMethod'

  key: PropertyName
}

export interface PrivateMethod extends ClassMethodBase {
  type: 'PrivateMethod'

  key: PrivateName
}

export interface StaticBlock extends Node, HasSpan {
  type: 'StaticBlock'

  body: BlockStatement
}

export interface Decorator extends Node, HasSpan {
  type: 'Decorator'

  expression: Expression
}

export type MethodKind = 'method' | 'getter' | 'setter'

export type Declaration =
  | ClassDeclaration
  | FunctionDeclaration
  | VariableDeclaration
  | TsInterfaceDeclaration
  | TsTypeAliasDeclaration
  | TsEnumDeclaration
  | TsModuleDeclaration

export interface FunctionDeclaration extends Fn {
  type: 'FunctionDeclaration'

  identifier: Identifier

  declare: boolean
}

export interface ClassDeclaration extends Class, Node {
  type: 'ClassDeclaration'

  identifier: Identifier

  declare: boolean
}

export interface VariableDeclaration extends Node, HasSpan {
  type: 'VariableDeclaration'

  kind: VariableDeclarationKind

  declare: boolean

  declarations: VariableDeclarator[]
}

export type VariableDeclarationKind = 'var' | 'let' | 'const'

export interface VariableDeclarator extends Node, HasSpan {
  type: 'VariableDeclarator'

  id: Pattern

  /// Initialization expression.
  init?: Expression

  /// Typescript only
  definite: boolean
}

export type Expression =
  | ThisExpression
  | ArrayExpression
  | ObjectExpression
  | FunctionExpression
  | UnaryExpression
  | UpdateExpression
  | BinaryExpression
  | AssignmentExpression
  | MemberExpression
  | SuperPropExpression
  | ConditionalExpression
  | CallExpression
  | NewExpression
  | SequenceExpression
  | Identifier
  | Literal
  | TemplateLiteral
  | TaggedTemplateExpression
  | ArrowFunctionExpression
  | ClassExpression
  | YieldExpression
  | MetaProperty
  | AwaitExpression
  | ParenthesisExpression
  | JSXMemberExpression
  | JSXNamespacedName
  | JSXEmptyExpression
  | JSXElement
  | JSXFragment
  | TsTypeAssertion
  | TsConstAssertion
  | TsNonNullExpression
  | TsAsExpression
  | TsSatisfiesExpression
  | TsInstantiation
  | PrivateName
  | OptionalChainingExpression
  | Invalid

interface ExpressionBase extends Node, HasSpan {}

export interface Identifier extends ExpressionBase {
  type: 'Identifier'

  value: string

  /// TypeScript only. Used in case of an optional parameter.
  optional: boolean
}

export interface OptionalChainingExpression extends ExpressionBase {
  type: 'OptionalChainingExpression'
  questionDotToken: Span
  /**
   * Call expression or member expression.
   */
  base: MemberExpression | OptionalChainingCall
}

export interface OptionalChainingCall extends ExpressionBase {
  type: 'CallExpression'
  callee: Expression
  arguments: ExprOrSpread[]
  typeArguments?: TsTypeParameterInstantiation
}

export interface ThisExpression extends ExpressionBase {
  type: 'ThisExpression'
}

export interface ArrayExpression extends ExpressionBase {
  type: 'ArrayExpression'

  elements: (ExprOrSpread | undefined)[]
}

export interface ExprOrSpread {
  spread?: Span
  expression: Expression
}

export interface ObjectExpression extends ExpressionBase {
  type: 'ObjectExpression'

  properties: (SpreadElement | Property)[]
}

export interface Argument {
  spread?: Span
  expression: Expression
}

export interface SpreadElement extends Node {
  type: 'SpreadElement'

  spread: Span

  arguments: Expression
}

export interface UnaryExpression extends ExpressionBase {
  type: 'UnaryExpression'

  operator: UnaryOperator

  argument: Expression
}

export interface UpdateExpression extends ExpressionBase {
  type: 'UpdateExpression'

  operator: UpdateOperator

  prefix: boolean

  argument: Expression
}

export interface BinaryExpression extends ExpressionBase {
  type: 'BinaryExpression'

  operator: BinaryOperator

  left: Expression

  right: Expression
}

export interface FunctionExpression extends Fn, ExpressionBase {
  type: 'FunctionExpression'

  identifier?: Identifier
}

export interface ClassExpression extends Class, ExpressionBase {
  type: 'ClassExpression'

  identifier?: Identifier
}

export interface AssignmentExpression extends ExpressionBase {
  type: 'AssignmentExpression'

  operator: AssignmentOperator

  left: Expression | Pattern

  right: Expression
}

export interface MemberExpression extends ExpressionBase {
  type: 'MemberExpression'

  object: Expression

  property: Identifier | PrivateName | ComputedPropName
}

export interface SuperPropExpression extends ExpressionBase {
  type: 'SuperPropExpression'

  obj: Super

  property: Identifier | ComputedPropName
}

export interface ConditionalExpression extends ExpressionBase {
  type: 'ConditionalExpression'

  test: Expression

  consequent: Expression

  alternate: Expression
}

export interface Super extends Node, HasSpan {
  type: 'Super'
}

export interface Import extends Node, HasSpan {
  type: 'Import'
}

export interface CallExpression extends ExpressionBase {
  type: 'CallExpression'

  callee: Super | Import | Expression

  arguments: Argument[]

  typeArguments?: TsTypeParameterInstantiation
}

export interface NewExpression extends ExpressionBase {
  type: 'NewExpression'

  callee: Expression

  arguments?: Argument[]

  typeArguments?: TsTypeParameterInstantiation
}

export interface SequenceExpression extends ExpressionBase {
  type: 'SequenceExpression'

  expressions: Expression[]
}

export interface ArrowFunctionExpression extends ExpressionBase {
  type: 'ArrowFunctionExpression'

  params: Pattern[]

  body: BlockStatement | Expression

  async: boolean

  generator: boolean

  typeParameters?: TsTypeParameterDeclaration

  returnType?: TsTypeAnnotation
}

export interface YieldExpression extends ExpressionBase {
  type: 'YieldExpression'

  argument?: Expression

  delegate: boolean
}

export interface MetaProperty extends Node, HasSpan {
  type: 'MetaProperty'

  kind: 'new.target' | 'import.meta'
}

export interface AwaitExpression extends ExpressionBase {
  type: 'AwaitExpression'

  argument: Expression
}

export interface TemplateLiteral extends ExpressionBase {
  type: 'TemplateLiteral'

  expressions: Expression[]

  quasis: TemplateElement[]
}

export interface TaggedTemplateExpression extends ExpressionBase {
  type: 'TaggedTemplateExpression'

  tag: Expression

  typeParameters?: TsTypeParameterInstantiation

  template: TemplateLiteral
}

export interface TemplateElement extends ExpressionBase {
  type: 'TemplateElement'

  tail: boolean
  cooked?: string
  raw: string
}

export interface ParenthesisExpression extends ExpressionBase {
  type: 'ParenthesisExpression'

  expression: Expression
}

export interface Fn extends HasSpan, HasDecorator {
  params: Param[]

  body?: BlockStatement

  generator: boolean

  async: boolean

  typeParameters?: TsTypeParameterDeclaration

  returnType?: TsTypeAnnotation
}

interface PatternBase extends Node, HasSpan {
  typeAnnotation?: TsTypeAnnotation
}

export interface PrivateName extends ExpressionBase {
  type: 'PrivateName'

  id: Identifier
}

export type JSXObject = JSXMemberExpression | Identifier

export interface JSXMemberExpression extends Node {
  type: 'JSXMemberExpression'

  object: JSXObject
  property: Identifier
}

/**
 * XML-based namespace syntax:
 */
export interface JSXNamespacedName extends Node {
  type: 'JSXNamespacedName'

  namespace: Identifier
  name: Identifier
}

export interface JSXEmptyExpression extends Node, HasSpan {
  type: 'JSXEmptyExpression'
}

export interface JSXExpressionContainer extends Node, HasSpan {
  type: 'JSXExpressionContainer'

  expression: JSXExpression
}

export type JSXExpression = JSXEmptyExpression | Expression

export interface JSXSpreadChild extends Node, HasSpan {
  type: 'JSXSpreadChild'

  expression: Expression
}

export type JSXElementName = Identifier | JSXMemberExpression | JSXNamespacedName

export interface JSXOpeningElement extends Node, HasSpan {
  type: 'JSXOpeningElement'

  name: JSXElementName

  attributes: JSXAttributeOrSpread[]

  selfClosing: boolean

  typeArguments?: TsTypeParameterInstantiation
}

export type JSXAttributeOrSpread = JSXAttribute | SpreadElement

export interface JSXClosingElement extends Node, HasSpan {
  type: 'JSXClosingElement'

  name: JSXElementName
}

export interface JSXAttribute extends Node, HasSpan {
  type: 'JSXAttribute'

  name: JSXAttributeName

  value?: JSXAttrValue
}

export type JSXAttributeName = Identifier | JSXNamespacedName

export type JSXAttrValue = Literal | JSXExpressionContainer | JSXElement | JSXFragment

export interface JSXText extends Node, HasSpan {
  type: 'JSXText'

  value: string
  raw: string
}

export interface JSXElement extends Node, HasSpan {
  type: 'JSXElement'

  opening: JSXOpeningElement
  children: JSXElementChild[]
  closing?: JSXClosingElement
}

export type JSXElementChild = JSXText | JSXExpressionContainer | JSXSpreadChild | JSXElement | JSXFragment

export interface JSXFragment extends Node, HasSpan {
  type: 'JSXFragment'

  opening: JSXOpeningFragment

  children: JSXElementChild[]

  closing: JSXClosingFragment
}

export interface JSXOpeningFragment extends Node, HasSpan {
  type: 'JSXOpeningFragment'
}

export interface JSXClosingFragment extends Node, HasSpan {
  type: 'JSXClosingFragment'
}

export type Literal =
  | StringLiteral
  | BooleanLiteral
  | NullLiteral
  | NumericLiteral
  | BigIntLiteral
  | RegExpLiteral
  | JSXText

export interface StringLiteral extends Node, HasSpan {
  type: 'StringLiteral'

  value: string

  raw?: string
}

export interface BooleanLiteral extends Node, HasSpan {
  type: 'BooleanLiteral'

  value: boolean
}

export interface NullLiteral extends Node, HasSpan {
  type: 'NullLiteral'
}

export interface RegExpLiteral extends Node, HasSpan {
  type: 'RegExpLiteral'

  pattern: string
  flags: string
}

export interface NumericLiteral extends Node, HasSpan {
  type: 'NumericLiteral'

  value: number

  raw?: string
}

export interface BigIntLiteral extends Node, HasSpan {
  type: 'BigIntLiteral'

  value: bigint

  raw?: string
}

export type ModuleDeclaration =
  | ImportDeclaration
  | ExportDeclaration
  | ExportNamedDeclaration
  | ExportDefaultDeclaration
  | ExportDefaultExpression
  | ExportAllDeclaration
  | TsImportEqualsDeclaration
  | TsExportAssignment
  | TsNamespaceExportDeclaration

export interface ExportDefaultExpression extends Node, HasSpan {
  type: 'ExportDefaultExpression'

  expression: Expression
}

export interface ExportDeclaration extends Node, HasSpan {
  type: 'ExportDeclaration'

  declaration: Declaration
}

export interface ImportDeclaration extends Node, HasSpan {
  type: 'ImportDeclaration'

  specifiers: ImportSpecifier[]

  source: StringLiteral

  typeOnly: boolean

  asserts?: ObjectExpression
}

export interface ExportAllDeclaration extends Node, HasSpan {
  type: 'ExportAllDeclaration'

  source: StringLiteral

  asserts?: ObjectExpression
}

/**
 * - `export { foo } from 'mod'`
 * - `export { foo as bar } from 'mod'`
 */
export interface ExportNamedDeclaration extends Node, HasSpan {
  type: 'ExportNamedDeclaration'

  specifiers: ExportSpecifier[]

  source?: StringLiteral

  typeOnly: boolean

  asserts?: ObjectExpression
}

export interface ExportDefaultDeclaration extends Node, HasSpan {
  type: 'ExportDefaultDeclaration'

  decl: DefaultDecl
}

export type DefaultDecl = ClassExpression | FunctionExpression | TsInterfaceDeclaration

export type ImportSpecifier = NamedImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier

/**
 * e.g. `import foo from 'mod.js'`
 */
export interface ImportDefaultSpecifier extends Node, HasSpan {
  type: 'ImportDefaultSpecifier'
  local: Identifier
}

/**
 * e.g. `import * as foo from 'mod.js'`.
 */
export interface ImportNamespaceSpecifier extends Node, HasSpan {
  type: 'ImportNamespaceSpecifier'

  local: Identifier
}

/**
 * e.g. - `import { foo } from 'mod.js'`
 *
 * local = foo, imported = None
 *
 * e.g. `import { foo as bar } from 'mod.js'`
 *
 * local = bar, imported = Some(foo) for
 */
export interface NamedImportSpecifier extends Node, HasSpan {
  type: 'ImportSpecifier'
  local: Identifier
  imported?: ModuleExportName
  isTypeOnly: boolean
}

export type ModuleExportName = Identifier | StringLiteral

export type ExportSpecifier = ExportNamespaceSpecifier | ExportDefaultSpecifier | NamedExportSpecifier

/**
 * `export * as foo from 'src';`
 */
export interface ExportNamespaceSpecifier extends Node, HasSpan {
  type: 'ExportNamespaceSpecifier'

  name: ModuleExportName
}

export interface ExportDefaultSpecifier extends Node, HasSpan {
  type: 'ExportDefaultSpecifier'

  exported: Identifier
}

export interface NamedExportSpecifier extends Node, HasSpan {
  type: 'ExportSpecifier'

  orig: ModuleExportName
  /**
   * `Some(bar)` in `export { foo as bar }`
   */
  exported?: ModuleExportName
  isTypeOnly: boolean
}

interface HasInterpreter {
  /**
   * e.g. `/usr/bin/node` for `#!/usr/bin/node`
   */
  interpreter: string
}

export type Program = Module | Script

export interface Module extends Node, HasSpan, HasInterpreter {
  type: 'Module'

  body: ModuleItem[]
}

export interface Script extends Node, HasSpan, HasInterpreter {
  type: 'Script'

  body: Statement[]
}

export type ModuleItem = ModuleDeclaration | Statement

export type BinaryOperator =
  | '=='
  | '!='
  | '==='
  | '!=='
  | '<'
  | '<='
  | '>'
  | '>='
  | '<<'
  | '>>'
  | '>>>'
  | '+'
  | '-'
  | '*'
  | '/'
  | '%'
  | '|'
  | '^'
  | '&'
  | '||'
  | '&&'
  | 'in'
  | 'instanceof'
  | '**'
  | '??'

export type AssignmentOperator =
  | '='
  | '+='
  | '-='
  | '*='
  | '/='
  | '%='
  | '<<='
  | '>>='
  | '>>>='
  | '|='
  | '^='
  | '&='
  | '**='
  | '&&='
  | '||='
  | '??='

export type UpdateOperator = '++' | '--'

export type UnaryOperator = '-' | '+' | '!' | '~' | 'typeof' | 'void' | 'delete'

export type Pattern =
  | BindingIdentifier
  | ArrayPattern
  | RestElement
  | ObjectPattern
  | AssignmentPattern
  | Invalid
  | Expression

export interface BindingIdentifier extends PatternBase {
  type: 'Identifier'
  value: string
  optional: boolean
}

export interface ArrayPattern extends PatternBase {
  type: 'ArrayPattern'

  elements: (Pattern | undefined)[]

  optional: boolean
}

export interface ObjectPattern extends PatternBase {
  type: 'ObjectPattern'

  properties: ObjectPatternProperty[]

  optional: boolean
}

export interface AssignmentPattern extends PatternBase {
  type: 'AssignmentPattern'

  left: Pattern
  right: Expression
}

export interface RestElement extends PatternBase {
  type: 'RestElement'

  rest: Span

  argument: Pattern
}

export type ObjectPatternProperty = KeyValuePatternProperty | AssignmentPatternProperty | RestElement

/**
 * `{key: value}`
 */
export interface KeyValuePatternProperty extends Node {
  type: 'KeyValuePatternProperty'

  key: PropertyName
  value: Pattern
}

/**
 * `{key}` or `{key = value}`
 */
export interface AssignmentPatternProperty extends Node, HasSpan {
  type: 'AssignmentPatternProperty'

  key: Identifier
  value?: Expression
}

/** Identifier is `a` in `{ a, }` */
export type Property =
  | Identifier
  | KeyValueProperty
  | AssignmentProperty
  | GetterProperty
  | SetterProperty
  | MethodProperty

interface PropBase extends Node {
  key: PropertyName
}

export interface KeyValueProperty extends PropBase {
  type: 'KeyValueProperty'

  value: Expression
}

export interface AssignmentProperty extends Node {
  type: 'AssignmentProperty'

  key: Identifier
  value: Expression
}

export interface GetterProperty extends PropBase, HasSpan {
  type: 'GetterProperty'

  typeAnnotation?: TsTypeAnnotation

  body?: BlockStatement
}

export interface SetterProperty extends PropBase, HasSpan {
  type: 'SetterProperty'

  param: Pattern
  body?: BlockStatement
}

export interface MethodProperty extends PropBase, Fn {
  type: 'MethodProperty'
}

export type PropertyName = Identifier | StringLiteral | NumericLiteral | ComputedPropName | BigIntLiteral

export interface ComputedPropName extends Node, HasSpan {
  type: 'Computed'
  expression: Expression
}

export interface BlockStatement extends Node, HasSpan {
  type: 'BlockStatement'

  stmts: Statement[]
}

export interface ExpressionStatement extends Node, HasSpan {
  type: 'ExpressionStatement'
  expression: Expression
}

export type Statement =
  | BlockStatement
  | EmptyStatement
  | DebuggerStatement
  | WithStatement
  | ReturnStatement
  | LabeledStatement
  | BreakStatement
  | ContinueStatement
  | IfStatement
  | SwitchStatement
  | ThrowStatement
  | TryStatement
  | WhileStatement
  | DoWhileStatement
  | ForStatement
  | ForInStatement
  | ForOfStatement
  | Declaration
  | ExpressionStatement

export interface EmptyStatement extends Node, HasSpan {
  type: 'EmptyStatement'
}

export interface DebuggerStatement extends Node, HasSpan {
  type: 'DebuggerStatement'
}

export interface WithStatement extends Node, HasSpan {
  type: 'WithStatement'

  object: Expression
  body: Statement
}

export interface ReturnStatement extends Node, HasSpan {
  type: 'ReturnStatement'

  argument?: Expression
}

export interface LabeledStatement extends Node, HasSpan {
  type: 'LabeledStatement'

  label: Identifier
  body: Statement
}

export interface BreakStatement extends Node, HasSpan {
  type: 'BreakStatement'

  label?: Identifier
}

export interface ContinueStatement extends Node, HasSpan {
  type: 'ContinueStatement'

  label?: Identifier
}

export interface IfStatement extends Node, HasSpan {
  type: 'IfStatement'

  test: Expression
  consequent: Statement
  alternate?: Statement
}

export interface SwitchStatement extends Node, HasSpan {
  type: 'SwitchStatement'

  discriminant: Expression
  cases: SwitchCase[]
}

export interface ThrowStatement extends Node, HasSpan {
  type: 'ThrowStatement'

  argument: Expression
}

export interface TryStatement extends Node, HasSpan {
  type: 'TryStatement'

  block: BlockStatement
  handler?: CatchClause
  finalizer?: BlockStatement
}

export interface WhileStatement extends Node, HasSpan {
  type: 'WhileStatement'

  test: Expression
  body: Statement
}

export interface DoWhileStatement extends Node, HasSpan {
  type: 'DoWhileStatement'

  test: Expression
  body: Statement
}

export interface ForStatement extends Node, HasSpan {
  type: 'ForStatement'

  init?: VariableDeclaration | Expression
  test?: Expression
  update?: Expression
  body: Statement
}

export interface ForInStatement extends Node, HasSpan {
  type: 'ForInStatement'

  left: VariableDeclaration | Pattern
  right: Expression
  body: Statement
}

export interface ForOfStatement extends Node, HasSpan {
  type: 'ForOfStatement'

  /**
   *  Span of the await token.
   *
   *  es2018 for-await-of statements, e.g., `for await (const x of xs) {`
   */
  await?: Span
  left: VariableDeclaration | Pattern
  right: Expression
  body: Statement
}

export interface SwitchCase extends Node, HasSpan {
  type: 'SwitchCase'

  /**
   * Undefined for default case
   */
  test?: Expression
  consequent: Statement[]
}

export interface CatchClause extends Node, HasSpan {
  type: 'CatchClause'

  /**
   * The param is `undefined` if the catch binding is omitted. E.g., `try { foo() } catch {}`
   */
  param?: Pattern
  body: BlockStatement
}

export interface TsTypeAnnotation extends Node, HasSpan {
  type: 'TsTypeAnnotation'

  typeAnnotation: TsType
}

export interface TsTypeParameterDeclaration extends Node, HasSpan {
  type: 'TsTypeParameterDeclaration'

  parameters: TsTypeParameter[]
}

export interface TsTypeParameter extends Node, HasSpan {
  type: 'TsTypeParameter'

  name: Identifier
  in: boolean
  out: boolean
  constraint?: TsType
  default?: TsType
}

export interface TsTypeParameterInstantiation extends Node, HasSpan {
  type: 'TsTypeParameterInstantiation'

  params: TsType[]
}

export interface TsParameterProperty extends Node, HasSpan, HasDecorator {
  type: 'TsParameterProperty'

  accessibility?: Accessibility
  override: boolean
  readonly: boolean
  param: TsParameterPropertyParameter
}

export type TsParameterPropertyParameter = BindingIdentifier | AssignmentPattern

export interface TsQualifiedName extends Node {
  type: 'TsQualifiedName'

  left: TsEntityName
  right: Identifier
}

export type TsEntityName = TsQualifiedName | Identifier

export type TsTypeElement =
  | TsCallSignatureDeclaration
  | TsConstructSignatureDeclaration
  | TsPropertySignature
  | TsGetterSignature
  | TsSetterSignature
  | TsMethodSignature
  | TsIndexSignature

export interface TsCallSignatureDeclaration extends Node, HasSpan {
  type: 'TsCallSignatureDeclaration'

  params: TsFnParameter[]
  typeAnnotation?: TsTypeAnnotation
  typeParams?: TsTypeParameterDeclaration
}

export interface TsConstructSignatureDeclaration extends Node, HasSpan {
  type: 'TsConstructSignatureDeclaration'

  params: TsFnParameter[]
  typeAnnotation?: TsTypeAnnotation
  typeParams?: TsTypeParameterDeclaration
}

export interface TsPropertySignature extends Node, HasSpan {
  type: 'TsPropertySignature'

  readonly: boolean
  key: Expression
  computed: boolean
  optional: boolean

  init?: Expression
  params: TsFnParameter[]

  typeAnnotation?: TsTypeAnnotation
  typeParams?: TsTypeParameterDeclaration
}

export interface TsGetterSignature extends Node, HasSpan {
  type: 'TsGetterSignature'

  readonly: boolean
  key: Expression
  computed: boolean
  optional: boolean
  typeAnnotation?: TsTypeAnnotation
}

export interface TsSetterSignature extends Node, HasSpan {
  type: 'TsSetterSignature'

  readonly: boolean
  key: Expression
  computed: boolean
  optional: boolean
  param: TsFnParameter
}

export interface TsMethodSignature extends Node, HasSpan {
  type: 'TsMethodSignature'

  readonly: boolean
  key: Expression
  computed: boolean
  optional: boolean
  params: TsFnParameter[]

  typeAnn?: TsTypeAnnotation
  typeParams?: TsTypeParameterDeclaration
}

export interface TsIndexSignature extends Node, HasSpan {
  type: 'TsIndexSignature'

  params: TsFnParameter[]

  typeAnnotation?: TsTypeAnnotation

  readonly: boolean
  static: boolean
}

export type TsType =
  | TsKeywordType
  | TsThisType
  | TsFnOrConstructorType
  | TsTypeReference
  | TsTypeQuery
  | TsTypeLiteral
  | TsArrayType
  | TsTupleType
  | TsOptionalType
  | TsRestType
  | TsUnionOrIntersectionType
  | TsConditionalType
  | TsInferType
  | TsParenthesizedType
  | TsTypeOperator
  | TsIndexedAccessType
  | TsMappedType
  | TsLiteralType
  | TsTypePredicate
  | TsImportType

export type TsFnOrConstructorType = TsFunctionType | TsConstructorType

export interface TsKeywordType extends Node, HasSpan {
  type: 'TsKeywordType'

  kind: TsKeywordTypeKind
}

export type TsKeywordTypeKind =
  | 'any'
  | 'unknown'
  | 'number'
  | 'object'
  | 'boolean'
  | 'bigint'
  | 'string'
  | 'symbol'
  | 'void'
  | 'undefined'
  | 'null'
  | 'never'
  | 'intrinsic'

export interface TsThisType extends Node, HasSpan {
  type: 'TsThisType'
}

export type TsFnParameter = BindingIdentifier | ArrayPattern | RestElement | ObjectPattern

export interface TsFunctionType extends Node, HasSpan {
  type: 'TsFunctionType'

  params: TsFnParameter[]

  typeParams?: TsTypeParameterDeclaration
  typeAnnotation: TsTypeAnnotation
}

export interface TsConstructorType extends Node, HasSpan {
  type: 'TsConstructorType'

  params: TsFnParameter[]

  typeParams?: TsTypeParameterDeclaration
  typeAnnotation: TsTypeAnnotation
  isAbstract: boolean
}

export interface TsTypeReference extends Node, HasSpan {
  type: 'TsTypeReference'

  typeName: TsEntityName
  typeParams?: TsTypeParameterInstantiation
}

export interface TsTypePredicate extends Node, HasSpan {
  type: 'TsTypePredicate'

  asserts: boolean

  paramName: TsThisTypeOrIdent
  typeAnnotation?: TsTypeAnnotation
}

export type TsThisTypeOrIdent = TsThisType | Identifier

export interface TsImportType extends Node, HasSpan {
  type: 'TsImportType'

  argument: StringLiteral
  qualifier?: TsEntityName
  typeArguments?: TsTypeParameterInstantiation
}

/**
 * `typeof` operator
 */
export interface TsTypeQuery extends Node, HasSpan {
  type: 'TsTypeQuery'

  exprName: TsTypeQueryExpr
  typeArguments?: TsTypeParameterInstantiation
}

export type TsTypeQueryExpr = TsEntityName | TsImportType

export interface TsTypeLiteral extends Node, HasSpan {
  type: 'TsTypeLiteral'

  members: TsTypeElement[]
}

export interface TsArrayType extends Node, HasSpan {
  type: 'TsArrayType'

  elemType: TsType
}

export interface TsTupleType extends Node, HasSpan {
  type: 'TsTupleType'

  elemTypes: TsTupleElement[]
}

export interface TsTupleElement extends Node, HasSpan {
  type: 'TsTupleElement'

  label?: Pattern
  ty: TsType
}

export interface TsOptionalType extends Node, HasSpan {
  type: 'TsOptionalType'

  typeAnnotation: TsType
}

export interface TsRestType extends Node, HasSpan {
  type: 'TsRestType'

  typeAnnotation: TsType
}

export type TsUnionOrIntersectionType = TsUnionType | TsIntersectionType

export interface TsUnionType extends Node, HasSpan {
  type: 'TsUnionType'

  types: TsType[]
}

export interface TsIntersectionType extends Node, HasSpan {
  type: 'TsIntersectionType'

  types: TsType[]
}

export interface TsConditionalType extends Node, HasSpan {
  type: 'TsConditionalType'

  checkType: TsType
  extendsType: TsType
  trueType: TsType
  falseType: TsType
}

export interface TsInferType extends Node, HasSpan {
  type: 'TsInferType'

  typeParam: TsTypeParameter
}

export interface TsParenthesizedType extends Node, HasSpan {
  type: 'TsParenthesizedType'

  typeAnnotation: TsType
}

export interface TsTypeOperator extends Node, HasSpan {
  type: 'TsTypeOperator'

  op: TsTypeOperatorOp
  typeAnnotation: TsType
}

export type TsTypeOperatorOp = 'keyof' | 'unique' | 'readonly'

export interface TsIndexedAccessType extends Node, HasSpan {
  type: 'TsIndexedAccessType'

  readonly: boolean
  objectType: TsType
  indexType: TsType
}

export type TruePlusMinus = true | '+' | '-'

export interface TsMappedType extends Node, HasSpan {
  type: 'TsMappedType'

  readonly?: TruePlusMinus
  typeParam: TsTypeParameter
  nameType?: TsType
  optional?: TruePlusMinus
  typeAnnotation?: TsType
}

export interface TsLiteralType extends Node, HasSpan {
  type: 'TsLiteralType'

  literal: TsLiteral
}

export type TsLiteral = NumericLiteral | StringLiteral | BooleanLiteral | BigIntLiteral | TsTemplateLiteralType

export interface TsTemplateLiteralType extends Node, HasSpan {
  type: 'TemplateLiteral'
  types: TsType[]
  quasis: TemplateElement[]
}

// // ================
// // TypeScript declarations
// // ================

export interface TsInterfaceDeclaration extends Node, HasSpan {
  type: 'TsInterfaceDeclaration'

  id: Identifier
  declare: boolean
  typeParams?: TsTypeParameterDeclaration
  extends: TsExpressionWithTypeArguments[]
  body: TsInterfaceBody
}

export interface TsInterfaceBody extends Node, HasSpan {
  type: 'TsInterfaceBody'

  body: TsTypeElement[]
}

export interface TsExpressionWithTypeArguments extends Node, HasSpan {
  type: 'TsExpressionWithTypeArguments'

  expression: Expression
  typeArguments?: TsTypeParameterInstantiation
}

export interface TsTypeAliasDeclaration extends Node, HasSpan {
  type: 'TsTypeAliasDeclaration'

  declare: boolean
  id: Identifier
  typeParams?: TsTypeParameterDeclaration
  typeAnnotation: TsType
}

export interface TsEnumDeclaration extends Node, HasSpan {
  type: 'TsEnumDeclaration'

  declare: boolean
  isConst: boolean
  id: Identifier
  members: TsEnumMember[]
}

export interface TsEnumMember extends Node, HasSpan {
  type: 'TsEnumMember'

  id: TsEnumMemberId
  init?: Expression
}

export type TsEnumMemberId = Identifier | StringLiteral

export interface TsModuleDeclaration extends Node, HasSpan {
  type: 'TsModuleDeclaration'

  declare: boolean
  global: boolean
  id: TsModuleName
  body?: TsNamespaceBody
}

/**
 * `namespace A.B { }` is a namespace named `A` with another TsNamespaceDecl as its body.
 */
export type TsNamespaceBody = TsModuleBlock | TsNamespaceDeclaration

export interface TsModuleBlock extends Node, HasSpan {
  type: 'TsModuleBlock'

  body: ModuleItem[]
}

export interface TsNamespaceDeclaration extends Node, HasSpan {
  type: 'TsNamespaceDeclaration'

  declare: boolean
  global: boolean
  id: Identifier
  body: TsNamespaceBody
}

export type TsModuleName = Identifier | StringLiteral

export interface TsImportEqualsDeclaration extends Node, HasSpan {
  type: 'TsImportEqualsDeclaration'

  declare: boolean
  isExport: boolean
  isTypeOnly: boolean
  id: Identifier
  moduleRef: TsModuleReference
}

export type TsModuleReference = TsEntityName | TsExternalModuleReference

export interface TsExternalModuleReference extends Node, HasSpan {
  type: 'TsExternalModuleReference'

  expression: StringLiteral
}

export interface TsExportAssignment extends Node, HasSpan {
  type: 'TsExportAssignment'

  expression: Expression
}

export interface TsNamespaceExportDeclaration extends Node, HasSpan {
  type: 'TsNamespaceExportDeclaration'

  id: Identifier
}

export interface TsAsExpression extends ExpressionBase {
  type: 'TsAsExpression'

  expression: Expression
  typeAnnotation: TsType
}

export interface TsSatisfiesExpression extends ExpressionBase {
  type: 'TsSatisfiesExpression'

  expression: Expression
  typeAnnotation: TsType
}

export interface TsInstantiation extends Node, HasSpan {
  type: 'TsInstantiation'

  expression: Expression
  typeArguments: TsTypeParameterInstantiation
}

export interface TsTypeAssertion extends ExpressionBase {
  type: 'TsTypeAssertion'

  expression: Expression
  typeAnnotation: TsType
}

export interface TsConstAssertion extends ExpressionBase {
  type: 'TsConstAssertion'

  expression: Expression
}

export interface TsNonNullExpression extends ExpressionBase {
  type: 'TsNonNullExpression'

  expression: Expression
}

export type Accessibility = 'public' | 'protected' | 'private'

export interface Invalid extends Node, HasSpan {
  type: 'Invalid'
}
