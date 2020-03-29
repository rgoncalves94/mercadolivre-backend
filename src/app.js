const express = require("express")
const routes = require("./routes")
const cors = require("cors")

const app = express()

app.use('/api', routes)
app.use(cors())

module.exports = app
