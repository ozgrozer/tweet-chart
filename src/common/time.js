const time = props => {
  const { normalTime, unixTime, format, utc } = props

  let unixTime_ = ''
  if (normalTime) {
    unixTime_ = new Date(normalTime).getTime()
  } else if (unixTime) {
    unixTime_ = unixTime
  }

  const date = new Date(unixTime_)
  const MMMM = ['\x00', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const MMM = ['\x01', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const dddd = ['\x02', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const ddd = ['\x03', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const ii = (i, len) => {
    let s = i + ''
    len = len || 2
    while (s.length < len) s = '0' + s
    return s
  }

  let result = format

  const y = utc ? date.getUTCFullYear() : date.getFullYear()
  result = result.replace(/(^|[^\\])yyyy+/g, '$1' + y)
  result = result.replace(/(^|[^\\])yy/g, '$1' + y.toString().substr(2, 2))
  result = result.replace(/(^|[^\\])y/g, '$1' + y)

  const M = (utc ? date.getUTCMonth() : date.getMonth()) + 1
  result = result.replace(/(^|[^\\])MMMM+/g, '$1' + MMMM[0])
  result = result.replace(/(^|[^\\])MMM/g, '$1' + MMM[0])
  result = result.replace(/(^|[^\\])MM/g, '$1' + ii(M))
  result = result.replace(/(^|[^\\])M/g, '$1' + M)

  const d = utc ? date.getUTCDate() : date.getDate()
  result = result.replace(/(^|[^\\])dddd+/g, '$1' + dddd[0])
  result = result.replace(/(^|[^\\])ddd/g, '$1' + ddd[0])
  result = result.replace(/(^|[^\\])dd/g, '$1' + ii(d))
  result = result.replace(/(^|[^\\])d/g, '$1' + d)

  const H = utc ? date.getUTCHours() : date.getHours()
  result = result.replace(/(^|[^\\])HH+/g, '$1' + ii(H))
  result = result.replace(/(^|[^\\])H/g, '$1' + H)

  const h = H > 12 ? H - 12 : H === 0 ? 12 : H
  result = result.replace(/(^|[^\\])hh+/g, '$1' + ii(h))
  result = result.replace(/(^|[^\\])h/g, '$1' + h)

  const m = utc ? date.getUTCMinutes() : date.getMinutes()
  result = result.replace(/(^|[^\\])mm+/g, '$1' + ii(m))
  result = result.replace(/(^|[^\\])m/g, '$1' + m)

  const s = utc ? date.getUTCSeconds() : date.getSeconds()
  result = result.replace(/(^|[^\\])ss+/g, '$1' + ii(s))
  result = result.replace(/(^|[^\\])s/g, '$1' + s)

  let f = utc ? date.getUTCMilliseconds() : date.getMilliseconds()
  result = result.replace(/(^|[^\\])fff+/g, '$1' + ii(f, 3))
  f = Math.round(f / 10)
  result = result.replace(/(^|[^\\])ff/g, '$1' + ii(f))
  f = Math.round(f / 10)
  result = result.replace(/(^|[^\\])f/g, '$1' + f)

  const T = H < 12 ? 'AM' : 'PM'
  result = result.replace(/(^|[^\\])TT+/g, '$1' + T)
  result = result.replace(/(^|[^\\])T/g, '$1' + T.charAt(0))

  const t = T.toLowerCase()
  result = result.replace(/(^|[^\\])tt+/g, '$1' + t)
  result = result.replace(/(^|[^\\])t/g, '$1' + t.charAt(0))

  let tz = -date.getTimezoneOffset()
  let K = utc || !tz ? 'Z' : tz > 0 ? '+' : '-'
  if (!utc) {
    tz = Math.abs(tz)
    const tzHrs = Math.floor(tz / 60)
    const tzMin = tz % 60
    K += ii(tzHrs) + ':' + ii(tzMin)
  }
  result = result.replace(/(^|[^\\])K/g, '$1' + K)

  const day = (utc ? date.getUTCDay() : date.getDay()) + 1
  result = result.replace(new RegExp(dddd[0], 'g'), dddd[day])
  result = result.replace(new RegExp(ddd[0], 'g'), ddd[day])

  result = result.replace(new RegExp(MMMM[0], 'g'), MMMM[M])
  result = result.replace(new RegExp(MMM[0], 'g'), MMM[M])

  result = result.replace(/\\(.)/g, '$1')

  return result
}

module.exports = time
