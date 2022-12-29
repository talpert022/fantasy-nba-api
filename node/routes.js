const express = require("express")
const { getPlayer, getPlayersRanked } = require("./db/stats")
const { insertPlayer, replacePlayer, deletePlayer, getFantasyTeam } = require("./db/team")
const Joi = require('joi')
const path = require("path")

const router = express.Router()

const playerSchema = Joi.object().keys({
    _id: Joi.string(),
    Player: Joi.string(),
    Pos: Joi.string(),
    Tm: Joi.string()
})

// TODO: Look into posting for different kinds of requests, like just player name
// you would have to do a retrieve, then grab fields, then post. What is realistic?
router.post('/team', async (req, res) => {
    const player = req.body
    const result = playerSchema.validate(player)
    if (result.error) {
        console.log(result.error)
        res.status(400).end()
        return
    }

    try {
        await insertPlayer(player)
        res.status(200).end()
    } catch (err) {
        res.statusMessage = `Could not add player to fantasy team: ${err}`
        res.status(500).end()
    }
})

router.put('/team/:idx', async (req, res) => {
    const newPlayer = req.body
    const idx = req.params.idx

    // Validate schema of replacement player
    const result = playerSchema.validate(newPlayer)
    if (result.error) {
        console.log(result.error)
        res.status(400).end()
        return
    }

    // Verify replacement index is in the bounds of team array
    try {
        const team = await getFantasyTeam()
        if (team.length <= idx) {
            res.statusMessage = "Index is out of bounds for fantasy team"
            res.status(404).end()
        }
    } catch (err) {
        res.statusMessage = `Could not retrieve fantasy team: ${err}`
        res.status(500).end()
    }

    // Attempt replacing player in team
    try {
        await replacePlayer(idx, newPlayer)
        res.status(200).end()
    } catch (err) {
        res.statusMessage = `Could not replace player on fantasy team: ${err}`
        res.status(500).end()
    }

})

router.delete('/team/:idx', async (req, res) => {
    const idx = req.params.idx

    // Verify replacement index is in the bounds of team array
    try {
        const team = await getFantasyTeam()
        if (team.length <= idx) {
            res.statusMessage = "Index is out of bounds for fantasy team"
            res.status(404).end()
        }
    } catch (err) {
        res.statusMessage = `Could not retrieve fantasy team: ${err}`
        res.status(500).end()
    }

    // Attempt deleting player
    try {
        await deletePlayer(idx)
        res.status(200).end()
    } catch (err) {
        res.statusMessage = `Could not delete player on fantasy team: ${err}`
        res.status(500).end()
    }
})

router.get('/team', async (req, res) => {
    try {
        const team = await getFantasyTeam()
        res.json(team)
    } catch (err) {
        res.statusMessage = `Could not retrieve fantasy team: ${err}`
        res.status(500).end()
    }
})

router.get("/player/:name", async (req, res) => {
    const player = req.params.name
    const stats = await getPlayer(player)

    if (!stats) {
        res.statusMessage = "No player exists with requested name"
        res.status(404).end()
    } else {
        res.json(stats)
    }
})

router.get("/players/:stat", async (req, res) => {
    const stat = req.params.stat
    const player_list = await getPlayersRanked(stat)

    if (!player_list) {
        res.statusMessage = "No rankings exists with requested stat"
        res.status(404).end()
    } else {
        res.json(player_list)
    }
})

module.exports = router
