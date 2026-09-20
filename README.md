# Pivotly

Library to work with pivot tables.

> ⚠️ **Warning:** Early development. Not ready for production.

## Development

- Install dependencies:

```bash
npm install
```

- Run the unit tests:

```bash
npm run test
```

- Build the library:

```bash
npm run build
```

- Quickly inspect a rendered pivot table:

  [tests/file.test.ts](tests/file.test.ts) contains dev-only tests (no real assertions) that render a fixture and write the result to `tests/__debug__/result.txt`. Run any single test from that file (e.g. via the VS Code test runner) and open the generated file to eyeball the output.
