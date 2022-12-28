const { MongoClient } = require("mongodb")
const connectionString = process.env.URI
const client = new MongoClient(connectionString)

const listDatabases = async (client) => {
    databasesList = await client.db().admin().listDatabases()

    console.log("Databases:")
    databasesList.databases.forEach((db) => console.log(` - ${db.name}`))
}

const connectToServer = async () => {
        try {
            await client.connect()
            console.log("Connected successfully to MongoDB server")
            await listDatabases(client)
            global.db = client.db("nba_stats").collection("2021_player_stats")
            global.teamdb = client.db("fantasy_team").collection("team1")
        } catch (err) {
            console.log(`Could not connect to MongoDB server:  ${err}`)
        }
}

process.on('SIGINT', async () => {
  await client.close();
  process.exit();
})

module.exports = { connectToServer }