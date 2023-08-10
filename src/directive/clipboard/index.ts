import ClipboardJS from 'clipboard'

export default {
  beforeMount(el: any, binding: any) {
    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value
    } else if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value
    } else {
      const clipboard = new ClipboardJS(el, {
        text() { return binding.value },
        action() { return binding.arg === 'cut' ? 'cut' : 'copy' }
      })
      clipboard.on('success', (e: any) => {
        const callback = el._v_clipboard_success
        callback && callback(e)
      })
      clipboard.on('error', (e: any) => {
        const callback = el._v_clipboard_error
        callback && callback(e)
      })
      el._v_clipboard = clipboard
    }
  },
  beforeUpdate(el: any, binding: any) {
    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value
    } else if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value
    } else {
      el._v_clipboard.text = function () { return binding.value }
      el._v_clipboard.action = function () { return binding.arg === 'cut' ? 'cut' : 'copy' }
    }
  },
  unmounted(el: any, binding: any) {
    if (binding.arg === 'success') {
      delete el._v_clipboard_success
    } else if (binding.arg === 'error') {
      delete el._v_clipboard_error
    } else {
      el._v_clipboard.destroy()
      delete el._v_clipboard
    }
  }
}