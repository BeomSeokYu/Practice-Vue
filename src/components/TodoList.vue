<template>
  <template v-for="(item, index) in todos" :key="item.id">
      <div class="card mt-2">
        <div class="card-body p-2 d-flex align-items-center"
          @click="moveToPage(item.id)">
          <div class="form-check flex-grow-1">
            <input
              class="form-check-input"
              type="checkbox"
              :checked="item.complated"
              @click.stop="toggleTodo(index, $event)">
            <label
              class="form-check-label"
              :class="{ 'todo-complated': item.complated }">{{ item.subject }}</label>
          </div>
          <div>
            <button
              class="btn btn-danger btn-sm"
              @click.stop="deleteTodo(index)">delete</button>
          </div>
        </div>
      </div>
    </template>
</template>

<script>
import {  useRouter } from 'vue-router'

export default {

  props: ['todos'],

  emits: ['toggle-todo', 'delete-todo'],

  setup(props, { emit }) {
    const router = useRouter()

      const toggleTodo = (index, event) => {
          emit('toggle-todo', index, event.target.checked)
      }

      const deleteTodo = (index) => {
          emit('delete-todo', index)
      }

      const moveToPage = (id) => {
        // router.push(`/todos/${id}`)
        router.push({
          name: 'Todo',
          params: {
            id: id
          }
        })
      }

      return {
          deleteTodo,
          toggleTodo,
          moveToPage
      }

  }
}
</script>

<style>

</style>