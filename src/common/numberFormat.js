const numberFormat = (number, decimals, decimalSeparator, thousandsSeparator) => {
  if (number == null || !isFinite(number)) {
    throw new TypeError('number is not valid')
  }

  if (!decimals) {
    const len = number.toString().split('.').length
    decimals = len > 1 ? len : 0
  }

  if (!decimalSeparator) {
    decimalSeparator = '.'
  }

  if (!thousandsSeparator) {
    thousandsSeparator = ','
  }

  number = parseFloat(number).toFixed(decimals)
  number = number.replace('.', decimalSeparator)

  const splitNum = number.split(decimalSeparator)
  splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator)
  number = splitNum.join(decimalSeparator)

  return number
}

module.exports = numberFormat
