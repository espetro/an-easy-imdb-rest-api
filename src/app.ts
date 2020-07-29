import { Application } from "https://deno.land/x/oak/mod.ts"
import { Router } from "./router/router.ts"
import { Database } from "./database/database.ts"
import { defaultConfig } from "./config/config.ts"

// load configuration
// const config = readConfig("./config.ini")
const config = defaultConfig

const app = new Application()
const database = new Database("imdb", config.database.host, config.database.port)
const router = new Router(database)

app.use(router.routes())
app.use(router.allowedMethods())

console.log(`Listening on port: ${config.server.port}`)

await app.listen(`${config.server.host}:${config.server.port}`)