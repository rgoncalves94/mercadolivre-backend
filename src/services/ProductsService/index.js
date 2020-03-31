const { StandardError } = require("../../errors")
const { searchProducts, detailProduct, descriptionProduct } = require("../MercadoLivreProductsClientService")
const { splitAmountAndDecimalsWithPrecision } = require("../../utils")
const splitAmountAndDecimals = splitAmountAndDecimalsWithPrecision(2)

/**
 * Search products by term
 * @param {string} term 
 */
async function search(term) {
    if(!term)
        throw new StandardError(400, "Invalid Term")

    return _transformSearchResponse(await searchProducts(_sanitizeTerm(term)))
}

/**
 * Search products by idProduct
 * @param {string} idProduct 
 */
async function detail(idProduct) {
    if(!idProduct)
        throw new StandardError(400, "Invalid id")

    const sanitizedId = _sanitizeId(idProduct);

    return _transformDetailResponse(await detailProduct(sanitizedId), await descriptionProduct(sanitizedId))
}

/**
 * Remove invalid characters from term
 * @param {string} term 
 */
function _sanitizeTerm(term) {
    return term.replace(/[^a-z0-9\s]*/ig, '')
}

/**
 * Remove invalid characters from id
 * @param {string} id 
 */
function _sanitizeId(id) {
    return id.replace(/[^A-Z0-9]*/g, '')
}

/**
 * Transform search response to frontend
 * @param {object} payload 
 */
function _transformSearchResponse(payload) {
    return {
        "author": {
            "name": 'Vendedor',
            "lastname": 'Mercado Livre',
        },
        "categories": payload.results.map(result => result.category_id),
        "items": payload.results.map(result => {
            const [amount, decimals] = splitAmountAndDecimals(result.price)
            return {
                "id": result.id,
                "title": result.title,
                "price": {
                    "currency": result.currency_id,
                    "amount": parseInt(amount),
                    "decimals": parseInt(decimals),
                },
                "picture": result.thumbnail,
                "condition": result.condition,
                "free_shipping": result.shipping && result.shipping.free_shipping || false,
            }
        })
    }
}

/**
 * Transform detail response to frontend
 * @param {object} detailPayload 
 * @param {object} descriptionPayload
 */
function _transformDetailResponse(detailPayload, descriptionPayload) {
    const [amount, decimals] = splitAmountAndDecimals(detailPayload.price)
    const getFirstPicture = (pictures = []) => pictures.length ? pictures[0].url : null

    return {
        "author": {
            "name": 'Vendedor',
            "lastname": 'Mercado Livre',
        },
        "item": {
            "id": detailPayload.id,
            "title": detailPayload.title,
            "price": {
                "currency": detailPayload.currency_id,
                "amount": parseInt(amount),
                "decimals": parseInt(decimals),
            },
            "picture": getFirstPicture(detailPayload.pictures),
            "condition": detailPayload.condition,
            "free_shipping": detailPayload.shipping && detailPayload.shipping.free_shipping || false,
            "sold_quantity": parseInt(detailPayload.sold_quantity),
            "description": descriptionPayload.plain_text,
        }
    }
}

module.exports = { search, detail }