<template>
  <List :items="todos">
    <!-- <template v-for="(item, index) in todos" :key="item.id"> -->
    <template #default="{ item, index }">
      <div class="card mt-2 cursor-pointer">
      <div class="card-body p-2 d-flex align-items-center"
        @click="moveToPage(item.id)">
        <div class="flex-grow-1">
          <input
            class="mx-2"
            type="checkbox"
            :checked="item.complated"
            @click.stop="toggleTodo(index, $event)">
          <span
            :class="{ 'todo-complated': item.complated }">
            {{ item.subject }}
          </span>
        </div>
        <div>
          <button
            class="btn btn-danger btn-sm"
            @click.stop="openModal(item.id)">delete</button>
        </div>
      </div>
    </div>
    </template>
      <!-- </template> -->
  </List>
  <teleport to="#top">
    <modal
      v-if="showModal"
      @close="closeModal"
      @delete="deleteTodo">
    </modal>
  </teleport>
</template>

<script>
import { useRouter } from 'vue-router'
import Modal from '@/components/Modal.vue'
import List from '@/components/List.vue'
import { getCurrentInstance, ref } from 'vue'

export default {

  props: ['todos'],

  emits: ['toggle-todo', 'delete-todo'],

  components: {
    Modal,
    List,
  },

  setup() {
    const { emit } = getCurrentInstance();
    const router = useRouter();

    const showModal = ref(false);
    const todoDeleteId = ref(null);

    const openModal = (id) => {
      todoDeleteId.value = id;
      showModal.value = true;
    }

    const closeModal = () => {
      todoDeleteId.value = null;
      showModal.value = false;
    }

      const toggleTodo = (index, event) => {
          emit('toggle-todo', index, event.target.checked)
      }

      const deleteTodo = () => {
          emit('delete-todo', todoDeleteId.value)
          closeModal();
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
        showModal,
        deleteTodo,
        toggleTodo,
        moveToPage,
        openModal,
        closeModal,
      }

  }
}
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>