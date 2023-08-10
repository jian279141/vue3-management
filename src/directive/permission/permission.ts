import { useUserStore } from "@/store/modules/user";

function checkPermission(el: HTMLElement, binding: any) {
  const { value } = binding
  const roles = useUserStore().roles
  console.log(roles);
  console.log(value);

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      console.log(hasPermission);


      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`)
  }
}

export default {
  mounted(el: HTMLElement, binding: any) {
    checkPermission(el, binding)
  },
  update(el: HTMLElement, binding: any) {
    checkPermission(el, binding)
  }
}