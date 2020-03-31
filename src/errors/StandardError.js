class StandardError {

    constructor(status, message) {
        this.status = status
        this.message = message
        this.type = "STANDARD_ERROR"
    }

}

module.exports = { StandardError }