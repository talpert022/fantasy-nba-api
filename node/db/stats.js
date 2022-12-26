const { MongoClient, Db } = require("mongodb")
const connectionString = process.env.URI
const client = new MongoClient(connectionString)

module.exports = {
    getPlayer: async (player) => {
        try {
            const player_stats = db.collection("2021_player_stats")
            const query = { Player: player }
            const stats = await player_stats.findOne(query, {})
            return stats
        } catch (err) {
            console.log(`Could not retrieve information because: ${err}`)
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close()
        }
    },

    getPlayersRanked: async (stat) => {
        try {
            await client.connect()
            const database = client.db("nba_stats")
            const player_stats = database.collection("2021_player_stats")
            const query = { Player: player }
            const stats = await player_stats.findOne(query, {})
            return stats
        } catch (err) {
            console.log(`Could not retrieve information because: ${err}`)
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close()
        }
    },
}
