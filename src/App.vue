<template>
  <div class="container">
    <h1>TD</h1>
    <form
      @submit.prevent="onSubmit">
      <div class="d-flex">
        <div class="flex-grow-1 mr-2">
          <input
            class="form-control"
            type="text"
            v-model="todo"
            placeholder="Type new To do">
        </div>
        <div>
          <button class="btn btn-primary">Add</button>
        </div>
      </div>
      <div
        class="error-message"
        v-show="hasError">
        This field cannot be empty.
      </div>
    </form>
    <template v-for="item in todos" :key="item.id">
      <div class="card mt-2">
        <div class="card-body p-2">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="item.complated">
            <label class="form-check-label">{{ item.subject }}</label>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {

    const todo = ref('');

    const todos = ref([]);

    const hasError = ref(false);

    const onSubmit = () => {
      if (todo.value === '') {
        hasError.value = true;
        return;
      }

      todos.value.push({
        id: Date.now(),
        subject: todo.value,
        complated: false
      })
      todo.value = '';
      hasError.value = false;
    }

    return {
      todo,
      todos,
      hasError,
      onSubmit
    }
  }
}
</script>

<style>
.error-message {
  color: red;
}
</style>
