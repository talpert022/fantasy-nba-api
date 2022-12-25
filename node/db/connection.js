const { MongoClient, Db } = require("mongodb");
const connectionString = process.env.URI;
const client = new MongoClient(connectionString);

const listDatabases = async (client) => {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
};

module.exports = {
    connectToServer: async () => {
        try {
            await client.connect();
            console.log("Connected successfully to MongoDB server");
            await listDatabases(client);
        } catch (err) {
            console.log(`Could not connect to MongoDB server:  ${err}`);
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    },

    getPlayer: async () => {
        try {
            const database = client.db("nba_stats");
            const player_stats = database.collection("2021_player_stats");
            const query = { Player: "Stephen Curry" };
            const player = await player_stats.findOne(query);

            console.log(player);
        } catch (err) {
            `Could not retrieve the database: ${err}`;
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    },
};
