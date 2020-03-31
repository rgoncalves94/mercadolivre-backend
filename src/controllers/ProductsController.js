const { search, detail } = require("../services/ProductsService")

/**
 * API to search products by term "q"
 * @param {object} req 
 * @param {object} res 
 */
async function searchByTerm(req, res) {
    try {
        res.status(200).send(await search(req.query.q))
    } catch(error) {
        res.status(error.status).send(error)
    }
}

/**
 * API to detail product by id
 * @param {object} req 
 * @param {object} res 
 */
async function detailById(req, res) {
    try {
        res.status(200).send(await detail(req.params.id))
    } catch(error) {
        res.status(error.status).send(error)
    }
}


module.exports = { searchByTerm, detailById }