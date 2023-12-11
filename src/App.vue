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
import { ref, computed, onMounted } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue'
import axios from 'axios'

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

    const toggleTodo = async (index) => {
      try {
        await axios.patch(`http://localhost:3000/todos/${todos.value[index].id}`, {
          complated: !todos.value[index].complated
        })
      } catch (err) {
        console.error(err);
        alert('변경 사항 반영에 실패하였습니다.')
      }

      todos.value[index].complated = !todos.value[index].complated
    }

    const deleteTodo = async (index) => {
      try {
        await axios.delete(`http://localhost:3000/todos/${todos.value[index].id}`);
        todos.value.splice(index, 1);
      } catch (err) {
        console.error(err);
        alert('삭제에 실패하였습니다.')
      }

    }

    const addTodo = async(data) => {
      // 데이터베이스에 저장
      try {
      const res = await axios.post('http://localhost:3000/todos', {
          subject: data.subject,
          complated: data.complated
        })
        todos.value.push(res.data)
      } catch(err) {
        console.error(err);
        alert('저장에 실패하였습니다.')
      }
    }

    const getTodos = async () => {
      try {
        const res = await axios.get('http://localhost:3000/todos')
        todos.value = res.data
      } catch (err) {
        console.error(err);
        alert('목록을 가져오는데 실패하였습니다.')
      }
    }

    onMounted(() => {
      getTodos();
    })

    return {
      todos,
      filteredTodos,
      addTodo,
      getTodos,
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
