const getPlayer = async player => {
        try {
            const query = { Player: player }
            const stats = await db.findOne(query, {})
            return stats
        } catch (err) {
            console.log(`Could not retrieve information because: ${err}`)
        }
}

const getPlayersRanked = async stat => {
        try {
            // piecemeal sort obj required to use parameter as header
            const sort = {}; sort[stat] = -1
            const cursor = db.find({}).sort(sort).limit(10)
            const allplayers = await cursor.toArray()
            return allplayers
        } catch (err) {
            console.log(`Could not retrieve information because: ${err}`)
        }
}

module.exports = { getPlayer, getPlayersRanked }