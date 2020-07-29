# An easy REST API for IMDB data

[IMDB][i1] is one of the main websites for getting information about movies, TV series and crew members such as actors and directors. Fortunately for us all, [they have an open data portal][a2], so let's benefit from it!

In this project, we will build a REST API **in [TypeScript][ts] and [Deno][deno]**, a modern JavaScript backend written in Rust, and [Mongo DB][mongo], a NoSQL, high-performant database. In Mongo, data is stored inside the `imdb` database, and each collection is shown in the next table:

| Collection Name | Documents  | Avg. Document Size | Total Document Size | Num. Indexes | Total Index Size |      |
| :-------------: | :--------- | :----------------: | :-----------------: | :----------: | :--------------: | :--- |
|      crew       | 10,244,172 |      139.9 B       |       1.3 GB        |      2       |     274.9 MB     |      |
|      film       | 7,009,774  |      293.0 B       |       1.9 GB        |      2       |     235.2 MB     |      |
|   principals    | 40,314,920 |      121.4 B       |       4.6 GB        |      1       |     389.7 MB     |      |


## Quickstart
To use the API, first ingest the IMDB data into a MongoDB. For example, I've ingested it using PySpark into a local MongoDB instance. Then, clone this repo, install Deno, and run `deno run -A main.go`. If you want to run it as a CLI app, then run `deno install`; you can run it as `datapi`.

This project was done with `deno 1.2.1`, `V8 8.5.216` and `TypeScript 3.9.2`. Note that the Deno API is not fully stable and it may change for version 2.x thereupon.

This project is an adaptation of [a fast IMDB REST API in Go][af].

If you are using an external MongoDB database, you can change the host settings at `.cliApp.yaml`.

## To-do list

- [x] Minimal REST API ( *GET "/" returns "Hello World"*)
- [x] Model data schemes
- [] Document the code
- [] Optimize network throughput (*Queries Per Second* and concurrent sessions)
- [ ] Full unit testing suite



For optimizing the network throughput, the [Apache Bench][ab] (for a single URI) and [Vegeta][veg] (for multiple URIs) tools are being used. For unit testing, the standard `deno test` tool has been used.


[ab]: https://httpd.apache.org/docs/2.4/programs/ab.html
[af]: https://github.com/espetro/a-fast-imdb-rest-api
[a1]: https://www.imdb.com/
[a2]: https://www.imdb.com/interfaces/
[deno]: https://deno.land/
[go]: https://golang.org
[mongo]: https://www.mongodb.com
[ts]: https://www.typescriptlang.org/
[veg]: https://github.com/tsenart/vegeta