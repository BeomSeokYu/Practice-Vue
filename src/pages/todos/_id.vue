<template>
  <h1>To-Do Page</h1>
  <div v-if="loading">
    <hr>
    <div class="text-center">Loading...</div>
    <hr>
  </div>
  <form v-else @submit.prevent>
    <div class="row">
        <div class="col-6">
            <div class="form-group">
                <label>Todo Subject</label>
                <input type="text"
                    class="form-control"
                    v-model="todo.subject">
            </div>
        </div>
        <div class="col-6">
            <div class="form-group">
                <label>Status</label>
                <div>
                    <button
                        type="button"
                        @click="toggleTodoStatus()"
                        class="btn"
                        :class="todo.complated
                            ? 'btn-success'
                            : 'btn-outline-danger'">
                            {{ todo.complated ? '완료' : '미완료' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <button class="btn btn-primary"
        @click="updateTodo"
        :disabled="!isTodoUpdated">
        save
    </button>
    <button class="btn btn-outline-dark ml-2"
        @click="moveToTodoList">
        cancel
    </button>
  </form>
</template>

<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue';
import _ from 'lodash';

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();

        const todo = ref(null);
        const originalTodo = ref(null);


        const loading = ref(true);

        const todoId = route.params.id;

        const isTodoUpdated = computed(() => {
            return !_.isEqual(todo.value, originalTodo.value)
        })

        const getTodo = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
                todo.value = { ...res.data };
                originalTodo.value = { ...res.data };
                loading.value = false;
            } catch (err) {
                console.error(err);
            }
        }

        const toggleTodoStatus = () => {
            return todo.value.complated = !todo.value.complated;
        }

        const moveToTodoList = () => {
            router.push({
                name: 'Todos'
            })
        }

        const updateTodo = async () => {
            try {
                await axios.put(`http://localhost:3000/todos/${todoId}`, {
                    subject: todo.value.subject,
                    complated: todo.value.complated
                });
                moveToTodoList();
            } catch (err) {
                console.error(err);
            }
        }

        onMounted(() => {
            getTodo();
        })

        return {
            todo,
            loading,
            isTodoUpdated,
            toggleTodoStatus,
            moveToTodoList,
            updateTodo,
        }
    }
}
</script>

<style>

</style>