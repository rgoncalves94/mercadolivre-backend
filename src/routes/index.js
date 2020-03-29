const express = require('express')
const router = express.Router();

const ProductsController = require("../controllers/ProductsController")

/**
 * Routes - API
 */

router.get("/items", ProductsController.search)
router.get("/items/:id", ProductsController.detail)

module.exports = router