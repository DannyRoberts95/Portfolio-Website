//Gets a cookie "cookieName" and returns it's value
export function getCookie(cname) {
  if (!document) return null
  const name = cname + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return null
}

//Sets a cookie of "cookieName" to tbe the passed value
export function setCookie(cookieName, value, expirationDate) {
  if (!document) return
  let expiry = new Date()
  //defaults expiry date to one year in the future
  expiry = new Date(expirationDate || expiry.setFullYear(expiry.getFullYear() + 1))
  const cookieString = `${cookieName}=${value}; expires=${expiry.toUTCString()}`
  document.cookie = cookieString
}

//Checks if cookie is present
export function checkCookie(cookieName) {
  const cookie = getCookie(cookieName)
  return !!cookie
}
