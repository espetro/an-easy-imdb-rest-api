import { Router as R, Context, Middleware } from "https://deno.land/x/oak/mod.ts"
import * as database from "../database/database.ts"

export class Router {
  private router: R
  private database: database.Database

  constructor(db: database.Database) {
    this.database = db

    this.router = new R()
    this.router.get("/", this.rootHandler)
    this.router.get("/player", this.database.getPlayer)
    this.router.get("/player/random", this.database.getRandomPlayer)
    this.router.get("/film", this.database.getFilm)
    this.router.get("/film/random", this.database.getRandomFilm)
  }

  async rootHandler(ctx: Context) {
    ctx.response.status = 200
    ctx.response.body = {
      "msg": "Hello World!"
    }
  }

  routes(): Middleware {
    return this.router.routes()
  }

  allowedMethods(): Middleware {
    return this.router.allowedMethods()
  }

}

// export default Router