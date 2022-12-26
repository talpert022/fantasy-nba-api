const express = require("express")
const router = express.Router()
const { getPlayer } = require("./db/stats")
const path = require("path")

// router.get("/", (req, res) => {
//     var fileName = "home.html";
//     console.log(path.dirname(__dirname));
//     var options = {
//         root: path.dirname(__dirname + "/node"),
//     };

//     res.sendFile(fileName, options);
// });

router.get("/player/:name", async (req, res) => {
    const player = req.params.name
    const stats = await getPlayer(player)
    console.log(stats)

    if (!stats) {
        res.statusMessage = "No player exists with requested name"
        res.status(404).end()
    } else {
        res.json(stats)
    }
})

// router.get("/players/:stat", async (req, res) => {
//     const stat = req.params.stat;
//     const player_list = await db_get.
// });

module.exports = router
