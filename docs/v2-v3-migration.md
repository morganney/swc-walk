# v2 to v3 Migration

This guide summarizes major-version changes introduced in v3.

## What changed

v3 replaces the `acorn-walk` wrapper with an internal SWC-native traversal engine.

The breaking changes concern the supported SWC AST shape, `ancestor()` state handling,
and some edge-case traversal behavior, rather than the engine replacement itself.

## API compatibility

The primary API shape remains the same:

- `simple(node, visitors, base?, state?)`
- `ancestor(node, visitors, base?, state?)`

Ordinary traversal remains post-order: child visitors run before their parent visitor.
Custom base visitor methods retain their `this` binding to the base visitor object.

`simple()` state passing is unchanged:

```ts
simple(ast, visitors, undefined, state)
```

## Ancestor state handling

In v2, `ancestor()` passed the ancestors array as the callback's second argument whenever
the traversal state was falsy, including omitted state, `false`, `0`, and `''`.

In v3, that argument is the traversal state without a fallback. Omitted state is
`undefined`, and explicit falsy values are preserved. The ancestors array is still
available as the third argument.

If you previously used the second argument to access ancestors, use the third instead:

```ts
ancestor(ast, {
  Identifier(node, state, ancestors) {
    const parent = ancestors[ancestors.length - 2]
    // Use parent and ancestors here.
  },
})
```

## Base visitor overrides

Custom base visitor overrides are still supported in v3.

v3 also preserves override-type callback dispatch:

```ts
cb(node, state, 'ExpressionStatement')
```

As in v2, `ancestor()` keeps the current node in the ancestor path only once when a
custom base visitor redispatches that same node with an override type. Parent lookup
and path length are preserved during redispatch.

## Error handling

Missing base handlers, including override-type handlers, throw in both versions. v2 threw
an `Error` with a message such as `No walker function defined for node type Identifier`.
v3 throws a `TypeError` with a message such as `No base visitor found for Identifier`.
Update code that depends on the error class or exact message.

v3 rejects root values without a string `type` property with a `TypeError`. During
traversal, child values without a string `type` property are skipped rather than throwing
as they did in v2. Nodes with a string `type` but no matching base handler still throw.

## Supported SWC AST

v3 targets the AST emitted by `@swc/core` 1.16.13. Use that version or a later release
with a compatible AST shape. Older AST shapes are not part of the v3 compatibility
contract; remaining on an older SWC parser means remaining on swc-walk v2.

Function bodies use `FunctionBody`, not `BlockStatement`. Move callbacks that target
function bodies to `FunctionBody`. Ordinary blocks, including `if` bodies and class
static blocks, continue to use `BlockStatement`. Expression-bodied arrows still use
their expression node directly.

Object getters and setters now store their function data in a nested `function` field:

- Getter bodies move from `node.body` to `node.function.body`.
- Getter return annotations move from `node.typeAnnotation` to `node.function.returnType`.
- Setter bodies move from `node.body` to `node.function.body`.
- Setter parameters move from `node.param` to `node.function.params`, an array of `Parameter` nodes.

The walker visits these nested function records' children, including parameters, return
annotations, and bodies. The records themselves have no node `type` and do not receive
a separate visitor callback or ancestor entry.

The installed `@swc/types` declarations still describe the older function-body and
accessor fields. swc-walk's exported node types correct those fields recursively,
including nested declarations and class methods. Optional function bodies remain
optional, and ordinary blocks are unchanged.

The exported `NodeType` union includes `FunctionBody`, so exhaustive switches or
complete visitor maps need an additional case.

## Dependency changes

`acorn-walk` is no longer a runtime dependency.

## Suggested upgrade checklist

1. Upgrade SWC to the supported AST baseline and swc-walk to v3.
2. Update ancestor callbacks that relied on the implicit ancestors-as-state fallback.
3. Validate custom base visitor overrides, especially same-node ancestor redispatch.
4. Update error handling, function-body visitors, and object accessor field access where applicable.
5. Run your test suite and compare generated artifacts if traversal powers transforms or analysis outputs.
