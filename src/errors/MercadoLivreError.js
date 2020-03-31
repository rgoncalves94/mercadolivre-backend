class MercadoLivreError {

    constructor({status, message, error}) {
        this.status = status
        this.message = message
        this.error = error
        this.type = "MERCADO_LIVRE_ERROR"
    }

}

module.exports = { MercadoLivreError }