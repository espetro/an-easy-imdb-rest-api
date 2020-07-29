import { MongoClient, Collection } from "https://deno.land/x/mongo/mod.ts"
import { Context } from "https://deno.land/x/oak/mod.ts"

interface Player {
  id: string
  name: string
  birthYear: number
  deathYear: number
}

interface Film {
  id: string
  title: string
  startYear: number
  endYear: number
}

export class Database {
  private client: MongoClient
  private filmColl: Collection<Film>
  private crewColl: Collection<Player>

  constructor(dbName: string, host: string, port: number) {
    this.client = new MongoClient;
    this.client.connectWithUri(`mongodb://${host}:${port}`)

    this.filmColl = this.client.database(dbName).collection("film")
    this.crewColl = this.client.database(dbName).collection("crew")

    this
      .getSample("film").then(response => console.log(response))
      .catch(err => console.log(`Erro with MongoDB:\n${err}\n`))
  }

  async getSample(collection: string) {
    var result

    if (collection == "film") {
      result = await this.filmColl.findOne()
    } else if (collection == "player") {
      result = await this.crewColl.findOne()
    }

    return result
  }

  // TODO
  async getPlayer(ctx: Context) {
    ctx.response.status = 500
    ctx.response.body = {
      "msg": "Internal Server Error"
    }
  }

  async getRandomPlayer(ctx: Context) {
    const result = await this.crewColl.aggregate([
      { $sample: { size: 1 } }
    ])

    if (result.length == 0) {
      ctx.response.status = 204
      ctx.response.body = {
        "error": "A random player couldn't be obtained from the database"
      }
    } else {
      console.log(result)
      ctx.response.status = 200
      ctx.response.body = JSON.stringify(result)
    }
  }
  
  // TODO
  async getFilm(ctx: Context) {
    ctx.response.status = 500
    ctx.response.body = {
      "msg": "Internal Server Error"
    }
  }

  async getRandomFilm(ctx: Context) {
    const result = await this.filmColl.aggregate([
      { $sample: { size: 1 } }
    ])

    if (result.length == 0) {
      ctx.response.status = 204
      ctx.response.body = {
        "error": "A random player couldn't be obtained from the database"
      }
    } else {
      console.log(result)
      ctx.response.status = 200
      ctx.response.body = JSON.stringify(result)
    }
  }
}
