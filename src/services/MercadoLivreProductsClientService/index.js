const fetch = require('node-fetch')
const { MERCADOLIVRE_API_BASEURL } = process.env
const { MercadoLivreError, StandardError } = require('../../errors')

/**
 * Call MELI's product search API
 * @param {*} term 
 * @return {object}
 */
async function searchProducts(term) {
   return _callGetAPI(`${MERCADOLIVRE_API_BASEURL}/sites/MLB/search?q=${term}`)
}

/**
 * Call MELI's product detail API
 * @param {number} idProduct 
 * @return {object}
 */
function detailProduct(idProduct) {
    return _callGetAPI(`${MERCADOLIVRE_API_BASEURL}/items/${idProduct}`)
}

/**
 * Call MELI's product description API
 * @param {number} idProduct 
 * @return {object}
 */
function descriptionProduct(idProduct) {
    return _callGetAPI(`${MERCADOLIVRE_API_BASEURL}/items/${idProduct}/description`)
}

/**
 * Call Meli's categories API
 * @param {*} URL 
 */
function getProductCategory(category) {
    return _callGetAPI(`${MERCADOLIVRE_API_BASEURL}/categories/${category}`)
    
}

/**
 * Call GET APis
 * @param {string} URL
 * @return {object}
 */
async function _callGetAPI(URL) {
    try {
        const response = await fetch(URL)
        const data = await response.json()

        if(!response.ok)
            throw new MercadoLivreError(data)
        
        return data;
    } catch(error) {
        console.error(error)
        throw new StandardError(500, "Internal Server Error - MELI API")
    }
}
module.exports = { searchProducts, detailProduct, descriptionProduct, getProductCategory }