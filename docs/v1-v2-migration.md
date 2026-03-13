# v1 to v2 Migration

This guide summarizes breaking changes introduced in v2.

## Breaking changes

1. `Span` typing changed.
2. Node.js 20 support was removed.

## Span typing changes

In v2, node span typing was aligned with runtime behavior:

- Nodes that usually have a `span` still expose `span`, but it is typed as `Span | undefined`.
- Some node kinds may still omit `span` at runtime.

Update code that assumes `span` is always defined.

Before (v1):

```ts
function handle(node: Node) {
  return node.span.start
}
```

After (v2):

```ts
function handle(node: Node) {
  if (node.span) {
    return node.span.start
  }

  return undefined
}
```

## Node.js version support

v2 supports:

- Node.js 22.x
- Node.js 24.x

If you are on Node.js 20, upgrade your runtime before adopting v2.
