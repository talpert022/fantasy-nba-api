const { ObjectId } = require("mongodb")
const teamId = ObjectId(process.env.TEAM_ID)

const insertPlayer = async player => {
    console.log(player)
    // TODO: Checks before inserting: duplicate, size of team
    // TODO: Insert a specific rank
    await teamdb.updateOne(
        { _id: teamId },
        { $push: {team: player}}
    )
}

const getFantasyTeam = async () => {
    const teamObj = await teamdb.findOne({ _id: teamId }, {})
    return teamObj.team
}

const replacePlayer = async (index, newPlayer) => {
    console.log(`replace player at index: ${index}`)
    await teamdb.updateOne(
        { _id: teamId },
        { $set : {[`team.${index}`]: newPlayer} }
    )
}

const deletePlayer = async idx => {
    console.log(`deleting player at index: ${idx}`)
    await teamdb.updateOne(
        { _id: teamId },
        { $unset: { [`team.${idx}`]: 1 } }
    )
    await teamdb.updateOne(
        { _id: teamId },
        { $pull: { team: null } }
    )
}

module.exports = { insertPlayer, replacePlayer, deletePlayer, getFantasyTeam }