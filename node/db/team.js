const insertPlayer = player => {
    console.log(player)
    teamdb.insertOne(player)
}

// const retrieveTeam = () => {
//     teamdb.
// }

module.exports = { insertPlayer }