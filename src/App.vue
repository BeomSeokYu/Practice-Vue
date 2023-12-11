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

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li
          class="page-item"
          :class="currentPage === 1 ? 'disabled' : ''"
          @click="currentPage > 1 ? getTodos(currentPage - 1) : null"
        ><a class="page-link" href="#">Prev</a>
        </li>
        <li
          class="page-item"
          v-for="page in numberOfPages"
          :class="currentPage === page ? 'active' : ''"
          :key="page">
          <a class="page-link" @click="getTodos(page)">{{ page }}</a>
        </li>
        <li
          class="page-item"
          :class="currentPage === numberOfPages ? 'disabled' : ''"
          @click="currentPage < numberOfPages ? getTodos(currentPage + 1) : null"
          ><a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
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

    const totalCount = ref(0);

    const limit = ref(5);

    const currentPage = ref(1);

    const searchText = ref('');

    const numberOfPages = computed(() => {
      return Math.ceil(totalCount.value / limit.value);
    })

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

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(`http://localhost:3000/todos?_page=${currentPage.value}&_limit=${limit.value}`)
        todos.value = res.data;
        totalCount.value = res.headers['x-total-count']
      } catch (err) {
        console.error(err);
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
      numberOfPages,
      currentPage,
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
.page-link {
  cursor: pointer;
}
</style>
