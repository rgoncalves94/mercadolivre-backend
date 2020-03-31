const express = require('express')
const router = express.Router();

const ProductsController = require("../controllers/ProductsController")

/**
 * Routes - API
 */

router.get("/items", ProductsController.searchByTerm)
router.get("/items/:id", ProductsController.detailById)

module.exports = router