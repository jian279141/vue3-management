import Cookies from 'js-cookie'
// q:为什么要用js-cookie？
// a:因为cookie是浏览器端的，所以要用js-cookie来操作cookie

// q:TokenKey的作用是什么？
// a:TokenKey的作用是用来存储token的cookie的key值

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