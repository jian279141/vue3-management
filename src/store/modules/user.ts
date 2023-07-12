import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getInfo, logout } from '@/api/user'
import { useTagsViewStore } from './tagsView'


interface UserInfo {
  username: string
  password: string
}

interface State {
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): State => ({
    token: getToken() || '',
    name: '',
    avatar: '',
    introduction: '',
    roles: []
  }),
  getters: {},
  actions: {
    // 设置值
    set_token(token: string) {
      this.token = token
    },
    set_name(name: string) {
      this.name = name
    },
    set_avatar(avatar: string) {
      this.avatar = avatar
    },
    set_introduction(introduction: string) {
      this.introduction = introduction
    },
    set_roles(roles: string[]) {
      this.roles = roles
    },
    // 登录
    login(userInfo: UserInfo) {
      const { username, password } = userInfo
      // q：为什么要用Promise？
      // a：因为login()返回的是一个Promise对象，所以这里也要返回一个Promise对象
      return new Promise<void>((resolve, reject) => {
        login({ username: username.trim(), password: password }).then(response => {
          const { data } = response
          this.set_token(data.token)
          setToken(data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      }
      )
    },
    // get user info
    getInfo() {
      return new Promise<void>((resolve, reject) => {
        getInfo(this.token).then(response => {
          const { data } = response

          if (!data) {
            reject('Verification failed, please Login again.')
          }

          const { roles, name, avatar, introduction } = data

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }

          this.set_roles(roles)
          this.set_name(name)
          this.set_avatar(avatar)
          this.set_introduction(introduction)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    resetToken() {
      return new Promise<void>((resolve) => {
        this.set_token('')
        this.set_roles([])
        removeToken()
        resolve()
      })
    },
    // user logout
    logout() {
      return new Promise<void>((resolve, reject) => {
        logout(this.token).then(() => {
          this.set_token('')
          this.set_roles([])
          this.resetToken()
          useTagsViewStore().delAllViews()
          resolve()
        }).catch(error => {
          reject(error)
        })
      }
      )
    }
  }
}
);