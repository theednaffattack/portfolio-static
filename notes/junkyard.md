# Code Junkyard

## From Nodemon.json

```json
  "exec": "rimraf ./dist && pnpm build && pnpm move-public-dir && pnpm move-pages-dir && node ./dist/dev-server.js",

```

```json
"events": {
    "restart": "rimraf ./dist; pnpm build && pnpm move-public-dir && pnpm move-pages-dir && node ./dist/dev-server.js"
  }
```
