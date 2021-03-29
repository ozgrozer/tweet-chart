const maxValue = arr => {
  let max = arr[0]
  for (const val of arr) {
    const valInt = parseFloat(val)
    if (valInt > max) max = valInt
  }
  return max
}

module.exports = maxValue
