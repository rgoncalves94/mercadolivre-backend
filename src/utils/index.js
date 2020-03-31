const splitAmountAndDecimalsWithPrecision = precision => floatValue => {
    const [amount, decimals] = floatValue.toFixed(precision).split('.')
    return [amount, decimals]
}

module.exports = { splitAmountAndDecimalsWithPrecision }