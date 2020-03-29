async function search(req, res) {
    res.send(`search working - Term '${req.query.q}'`)
}

async function detail(req, res) {

    res.send(`detail working - ID: ${req.params.id}`)
}


module.exports = { search, detail }