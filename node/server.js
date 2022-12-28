// loads the configuration from config.env to process.env
require("dotenv").config({ path: "./.env" })

const express = require("express")
const routes = require("./routes")
const { connectToServer, closeServer } = require("./db/connection")

const app = express()
app.use(express.json())
app.use(routes)

const PORT = 3001
connectToServer().then(() => {
    app.listen(PORT)
    console.log(`Server running on port ${PORT}`)
})
