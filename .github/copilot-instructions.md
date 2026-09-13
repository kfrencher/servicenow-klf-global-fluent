# KLF Global Fluent application

## Commands

- `npm run build` compiles Fluent metadata into the deployable application under `dist/` and `target/`.
- `npx now-sdk build --frozenKeys` is the CI-safe build: it fails if committed Fluent key mappings are stale.
- `npm run deploy` installs the most recent successful build on the authenticated ServiceNow instance. Build first; deployment otherwise sends stale artifacts.
- `npm run clean` removes SDK build output.
- `npm run types` downloads ServiceNow dependency and Glide type definitions for the configured instance.
- Tests are ServiceNow ATF tests, not a local npm test suite. Run one deployed test with `npx now-sdk cicd test run --test-name "<ATF test name>" --auth <alias>`; run the application suite with `npx now-sdk cicd testsuite run --test-suite-name "KLF Global" --auth <alias>`.
- Before renaming transformed files, run `npm run rename-generated:dry`. Use `npm run rename-generated:apply` only after reviewing `rename-generated-map.json`; it renames paired files and rewrites relative `Now.include`, `import`, and `require` paths.

## Architecture

- This is the **global** (`scope: "global"`) ServiceNow Fluent application. `src/fluent/server/` is the authored metadata tree, organized by ServiceNow capability: tables and table columns, security roles/ACLs, business rules and Script Includes, scripted REST APIs, client scripts, Service Portal widgets, UI pages, and ATF definitions.
- Fluent `.now.ts` files declare ServiceNow records with `@servicenow/sdk/core`; adjacent JavaScript, HTML, and SCSS files contain the executable script or widget content. Most runtime fields use `Now.include()` with paths relative to the containing `.now.ts` file.
- Scripted REST APIs group routes in a `RestApi` declaration; each route points to its own adjacent JavaScript implementation. Service Portal widgets likewise compose client script, server script, template, styles, and link script from a same-named subdirectory.
- `src/fluent/generated/` contains checked-in metadata transformed from the instance, alongside the generated identity registry `generated/keys.ts`. Some capabilities are split between this transformed tree and `server/`, so trace referenced files rather than assuming one subtree owns an entire feature.
- Automated tests are Fluent `Test()` records under `server/other/sys-atf-test/`; `server/other/sys-atf-test-suite/klf_global.now.ts` defines the KLF Global suite. Test steps may embed Jasmine server-side scripts.

## Fluent conventions

- `Now` and data helpers are SDK globals in `.now.ts` files: do not import them. Import only Fluent constructors/types from `@servicenow/sdk/core`.
- Give new top-level metadata records a stable `$id: Now.ID['descriptive-key']`; never invent a sys_id. Commit the generated `keys.ts` update after building. For same-app references, export/import the Fluent record variable (or `.$id` when required), rather than using `Now.ID` as a value.
- This application uses inline-file scripts via `Now.include()` for Script Includes, business rules, REST routes, client scripts, widgets, UI Actions, and UI pages. Preserve the relative file pairing when moving or renaming metadata.
- Server-side artifacts opt into `$meta: { useEsLatest: true }`, even though `now.config.json` defaults the application to `helsinki_es5`; retain or deliberately set the per-record metadata when changing server scripts.
- `keys.ts` is build-generated and committed. Never remove a Fluent metadata definition or manually delete a key without first confirming whether the deletion must propagate to installed instances; a missing tracked definition becomes a deployable deletion.
- Avoid hand-renaming transformed `generated/` artifacts. Use the repository rename script so include and import references remain valid.
