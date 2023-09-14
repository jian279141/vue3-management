<script setup lang="ts">
import { defineComponent, ref } from "vue"


defineProps({
  todo: {
    type: Object,
    default: () => { }
  }
})
const emit = defineEmits(['toggleTodo', 'deleteTodo'])
const editing = ref(false)

function toggleTodo(todo: any) {
  emit('toggleTodo', todo)
}

function deleteTodo(todo: any) {
  emit('deleteTodo', todo)
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'Todo',
})
</script>

<template>
  <li :class="{ completed: todo.done, editing: editing }" class="todo">
    <div class="view">
      <input :checked="todo.done" type="checkbox" class="toggle" @change="toggleTodo(todo)">
      <label v-text="todo.text"></label>
      <button class="destroy" @click="deleteTodo(todo)"></button>
    </div>
  </li>
</template>

<style lang="scss" scoped>
label {
  font-weight: 700;
}
</style>
