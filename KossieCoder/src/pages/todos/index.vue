<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="pt-4">
    <div class="d-flex justify-content-between">
      <h1>To Do</h1>
      <div>
        <router-link class="btn btn-primary btn-sm" :to="{ name: 'TodoCreate'}">Create Todo</router-link>
      </div>
    </div>

    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="Search"
      @keyup.enter="searchTodo">
    <hr>

    <TodoSimpleForm @add-todo="addTodo" />

    <div v-if="todos.length === 0">
      <hr>
      <div class="text-center">표시할 항목이 없습니다.</div>
      <hr>
    </div>

    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"/>

    <Pagination
      v-if="todos.length"
      :totalPages="totalPages"
      :currentPage="currentPage"
      @click="getTodos"/>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import TodoSimpleForm from '@/components/TodoSimpleForm.vue';
import TodoList from '@/components/TodoList.vue'
import Pagination from "@/components/Pagination.vue";
import axios from '@/axios/axios'
import { useToast } from '@/composables/toast'

export default {

  components: {
    TodoSimpleForm,
    TodoList,
    Pagination,
  },

  setup() {

    const todos = ref([]);
    const totalCount = ref(0);
    const limit = ref(5);
    const currentPage = ref(1);
    const searchText = ref('');

    let timeout = null;

    const { triggerToast } = useToast();

    // const showToast = ref(false);
    // const toastMessage = ref('');
    // const isToastError = ref(false);
    // const toastTimeout = ref(null)
    // const triggerToast = (message, isError = false) => {
    //   toastMessage.value = message
    //   isToastError.value = isError
    //   showToast.value = true;
    //   toastTimeout.value =  setTimeout(() => {
    //     toastMessage.value = ''
    //     isToastError.value = false
    //     showToast.value = false;
    //   }, 3000)
    // }

    watch(searchText, () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        console.log('search');
        getTodos(1, limit.value)
      }, 2000);
    })

    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    }

    const totalPages = computed(() => {
      return Math.ceil(totalCount.value / limit.value);
    })

    // const filteredTodos = computed(() => {
    //   if (searchText.value) {
    //     return todos.value.filter((item) => {
    //       return item.subject.includes(searchText.value)
    //     });
    //   }
    //   return todos.value;
    // })

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    }

    const toggleTodo = async (index, checked) => {
      try {
        await axios.patch(`/todos/${todos.value[index].id}`, {
          complated: checked
        })
      } catch (err) {
        console.error(err);
        triggerToast('변경 사항 반영에 실패하였습니다.', true)
      }

      todos.value[index].complated = !todos.value[index].complated
    }

    const deleteTodo = async (id) => {
      try {
        await axios.delete(`/todos/${id}`);
        getTodos(totalCount.value % limit.value === 1
          ? currentPage.value - 1
          : currentPage.value);
        triggerToast('삭제되었습니다.')
      } catch (err) {
        console.error(err);
        triggerToast('삭제에 실패하였습니다.', true)
      }

    }

    const addTodo = async(data) => {
      // 데이터베이스에 저장
      try {
      await axios.post('/todos', {
          subject: data.subject,
          complated: data.complated
        })
        getTodos(1);
      } catch(err) {
        console.error(err);
        triggerToast('저장에 실패하였습니다.', true)
      }
    }

    const getTodos = async (page = currentPage.value, lim = 5) => {
      currentPage.value = page;
      limit.value = lim;
      try {
        const res = await axios.get(`/todos?_sort=id&_order=desc&_page=${currentPage.value}&_limit=${limit.value}&subject_like=${searchText.value}`)
        todos.value = res.data;
        totalCount.value = res.headers['x-total-count']
      } catch (err) {
        console.error(err);
        triggerToast('데이터를 불러오지 못했습니다.', true)
      }
    }

    onMounted(() => {
      getTodos();
    })

    return {
      todos,
      // filteredTodos,
      addTodo,
      getTodos,
      toggleTodo,
      deleteTodo,
      searchTodo,
      todoStyle,
      searchText,
      totalPages,
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