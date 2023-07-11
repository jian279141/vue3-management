import { defineStore } from 'pinia'

interface State {
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  device: string
  size: string
}


export const useAppStore = defineStore({
  id: 'app',
  state: (): State => ({
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    device: 'desktop',
    size: 'medium'
  }),
  getters: {
    sidebar: (state) => state.sidebar,
    device: (state) => state.device,
    size: (state) => state.size
  },
  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
    },
    closeSideBar() {
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = false
    },
    toggleDevice(device: string) {
      this.device = device
    },
    setSize(size: string) {
      this.size = size
    }
  }
})

