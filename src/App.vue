<template>
  <div class="container pt-5">
    <h1>To Do</h1>

    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="Search">
    <hr>

    <TodoSimpleForm @add-todo="addTodo" />

    <div v-if="filteredTodos.length === 0">
      <hr>
      <div class="text-center">표시할 항목이 없습니다.</div>
      <hr>
    </div>

    <TodoList
      :todos="filteredTodos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"/>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue'

export default {

  components: {
    TodoSimpleForm,
    TodoList
  },

  setup() {

    const todos = ref([]);

    const searchText = ref('');

    const filteredTodos = computed(() => {
      if (searchText.value) {
        return todos.value.filter((item) => {
          return item.subject.includes(searchText.value)
        });
      }
      return todos.value;
    })

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    }

    const toggleTodo = (index) => {
      todos.value[index].complated = !todos.value[index].complated
    }

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    }

    const addTodo = (data) => {
      todos.value.push(data)
    }

    return {
      todos,
      filteredTodos,
      addTodo,
      toggleTodo,
      deleteTodo,
      todoStyle,
      searchText,
    }
  }
}
</script>

<style>
.error-message {
  color: red;
}
.todo-complated {
  text-decoration: line-through;
  color: gray;
}
</style>
