<template>
  <template v-for="(item, index) in todos" :key="item.id">
      <div class="card mt-2">
        <div class="card-body p-2 d-flex align-items-center">
          <div class="form-check flex-grow-1">
            <input
              class="form-check-input"
              type="checkbox"
              :checked="item.complated"
              @change="toggleTodo(index)">
            <label
              class="form-check-label"
              :class="{ 'todo-complated': item.complated }">{{ item.subject }}</label>
          </div>
          <div>
            <button
              class="btn btn-danger btn-sm"
              @click="deleteTodo(index)">delete</button>
          </div>
        </div>
      </div>
    </template>
</template>

<script>
export default {
    props: ['todos'],
    emits: ['toggle-todo', 'delete-todo'],
    setup(props, { emit }) {
        const toggleTodo = (index) => {
            emit('toggle-todo', index)
        }

        const deleteTodo = (index) => {
            emit('delete-todo', index)
        }

        return {
            deleteTodo,
            toggleTodo
        }

    }
}
</script>

<style>

</style>