import { readLines } from "https://deno.land/std/io/mod.ts"
import { decode } from "https://deno.land/x/ini/mod.ts"

export const readConfig = (path: string): object => {
  let textDecoder = new TextDecoder("utf-8")
  let text = textDecoder.decode(Deno.readFileSync(path))
  let config = decode(text)

  config.server.host = config.server.host || "localhost"
  config.server.port = config.server.port || 8080
  config.database.host = config.database.host || "127.0.0.1"
  config.database.port = config.database.port || 27017

  return config
}

export const defaultConfig = {
  server: {
    host: "localhost",
    port: 8080
  },
  database: {
    host: "127.0.0.1",
    port: 27017
  }

}