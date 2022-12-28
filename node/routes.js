const express = require("express")
const { getPlayer, getPlayersRanked } = require("./db/stats")
const { insertPlayer } = require("./db/team")
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
router.post('/team', (req, res) => {
    const player = req.body
    const result = playerSchema.validate(player)
    if (result.error) {
        console.log(result.error)
        res.status(400).end()
        return
    }

    try {
        insertPlayer(player)
        res.status(200).end()
    } catch (err) {
        console.log(err)
        res.status(500).end()
    }
})

// router.get('/team' (req, res) => {

// })

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
