<script setup lang="ts">
import { defineComponent, ref, computed } from "vue"
import Todo from "./Todo.vue"

type Todo = {
  text: string
  done: boolean
}
type Todos = Todo[]

const defaultList: Todos = [
  { text: 'star this repository', done: false },
  { text: 'fork this repository', done: false },
  { text: 'follow author', done: false },
  { text: 'vue-element-admin', done: true },
  { text: 'vue', done: true },
  { text: 'element-ui', done: true },
  { text: 'axios', done: true },
  { text: 'webpack', done: true }
]

type Filters = {
  [key: string]: (todos: Todos) => Todos
}

const filters: Filters = {
  all: (todos: Todos) => todos,
  active: (todos: Todos) => todos.filter(todo => !todo.done),
  completed: (todos: Todos) => todos.filter(todo => todo.done)
}

const todos = ref(defaultList)


function addTodo(e: KeyboardEvent) {
  const target = e.target as HTMLInputElement
  const text = target.value
  if (e.key !== 'Enter' || !text) return
  todos.value.push({ text, done: false })
  target.value = ''
}

const visibility = ref('all')
const remaining = computed(() => filters.active(todos.value).length)

function toggleTodo(todo: any) {
  todo.done = !todo.done
}

function deleteTodo(todo: any) {
  todos.value.splice(todos.value.indexOf(todo), 1)
}

const filteredTodos = computed(() => filters[visibility.value](todos.value))
const allChecked = computed(() => remaining.value === 0)

function toggleAll({ done }: { done: boolean }) {
  todos.value.forEach(todo => {
    todo.done = done
  })
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'TodoList',
})
</script>

<template>
  <section class="todo-app">
    <!-- header -->
    <header class="header">
      <input class="new-todo" autocomplete="off" placeholder="Todo List" @keyup.enter="addTodo">
    </header>
    <!-- main section -->
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" :checked="allChecked"
        @change="toggleAll({ done: !allChecked })">
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <Todo v-for="(todo, index) in filteredTodos" :key="index" :todo="todo" @toggle-todo="toggleTodo"
          @deleteTodo="deleteTodo" />
      </ul>
    </section>
    <!-- footer -->
    <footer class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        items left
      </span>
      <ul class="filters">
        <!-- val 无意义，单纯为了ts不报错 -->
        <li v-for="(val, key) in filters" :key="key" :val="val">
          <a :class="{ selected: visibility === key }" @click="visibility = key as string">{{ key }}</a>
        </li>
      </ul>
    </footer>
  </section>
</template>

<style lang="scss">
@import './index.scss'
</style>
