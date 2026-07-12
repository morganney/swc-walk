# v2 to v3 Migration

This guide summarizes major-version changes introduced in v3.

## What changed

v3 replaces the `acorn-walk` wrapper with an internal SWC-native traversal engine.

This is a major release because traversal internals changed and some edge-case behavior
may differ even when API usage stays the same.

## API compatibility

The primary API shape remains the same:

- `simple(node, visitors, base?, state?)`
- `ancestor(node, visitors, base?, state?)`

State passing is unchanged.

Before (v2):

```ts
simple(ast, visitors, undefined, state)
```

After (v3):

```ts
simple(ast, visitors, undefined, state)
```

## Base visitor overrides

Custom base visitor overrides are still supported in v3.

v3 also preserves override-type callback dispatch:

```ts
cb(node, state, 'ExpressionStatement')
```

If traversal is redirected to a node type that has no matching base handler, v3 throws
at runtime.

## Dependency changes

`acorn-walk` is no longer a runtime dependency.

## Potential behavioral differences

Even with compatible API shape, downstream projects may observe differences in traversal
order or edge-case visitation because the walker implementation changed.

If your tooling depends on exact visit sequencing, validate output on representative ASTs.

## Suggested upgrade checklist

1. Upgrade to v3.
2. Run your test suite, especially tests that assert traversal behavior or ordering.
3. Validate custom base visitor overrides, including override-type dispatch.
4. Compare generated artifacts if traversal powers transforms or analysis outputs.
