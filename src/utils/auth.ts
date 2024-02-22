import Cookies from 'js-cookie'
// q:为什么要用js-cookie？
// a:因为cookie是浏览器端的，所以要用js-cookie来操作cookie
const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}