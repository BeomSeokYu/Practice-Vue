<template>
  <div v-if="loading">
    <hr>
    <div class="text-center">Loading...</div>
    <hr>
  </div>
  <form v-else @submit.prevent>
    <div class="row">
        <div class="col-6 mb-3">
            <!-- <div class="form-group">
                <label>Todo Subject</label>
                <input type="text"
                    class="form-control"
                    v-model="todo.subject">
            </div>
            <div
                class="text-danger mt-m15"
                v-if="subjectError">
                {{ subjectError }}
            </div> -->
            <Input
                label="Todo Subject"
                v-model="todo.subject"
                :error="subjectError"
                placeholder="할 일 입력" />
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
        <div class="col-12">
            <div class="form-group">
                <label>Todo Content</label>
                <textarea
                    class="form-control"
                    v-model="todo.body"
                    id=""
                    cols="30"
                    rows="10" :placeholder="editing ? '내용 없음' : '상세 내용 입력'">
                </textarea>
            </div>
        </div>
    </div>
    <div class="d-flex">
        <div class="flex-grow-1">
            <button class="btn btn-primary"
                @click="editing ? updateTodo() : createTodo()"
                :disabled="!isTodoUpdated">
                {{ editing ? 'update' : 'create' }}
            </button>
            <button class="btn btn-outline-dark ml-2"
                @click="moveToTodoList">
                cancel
            </button>
        </div>
        <div v-if="editing">
            <button class="btn btn-outline-danger"
                @click="openModal">
                delete
            </button>
        </div>
    </div>
  </form>
    <modal
        v-if="showModal"
        @close="closeModal"
        @delete="deleteTodo">
    </modal>
</template>

<script>
import axios from '@/axios/axios';
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue';
import _ from 'lodash';
// import Toast from '@/components/Toast.vue'
import { useToast } from '@/composables/toast';
import Input from '@/components/Input.vue'
import Modal from '@/components/Modal.vue'

export default {

    components: {
        // Toast,
        Input,
        Modal
    },

    props: {
        editing: {
            type: Boolean,
            default: false
        }
    },

    setup(props) {
        const route = useRoute();
        const router = useRouter();
        const todo = ref({
            subject: '',
            complated: false,
            body: '',
        });
        const originalTodo = ref(null);
        const loading = ref(false);

        const subjectError = ref('')

        const { triggerToast } = useToast();
        // const showToast = ref(false);
        // const toastMessage = ref('');
        // const isToastError = ref(false);
        // const timeout = ref(null);
        // const triggerToast = (message, isError = false) => {
        //     toastMessage.value = message
        //     isToastError.value = isError
        //     showToast.value = true;
        //     timeout.value =  setTimeout(() => {
        //         toastMessage.value = ''
        //         isToastError.value = false
        //         showToast.value = false;
        //     }, 3000)
        // }

        const todoId = route.params.id;

        const isTodoUpdated = computed(() => {
            return !_.isEqual(todo.value, originalTodo.value)
        })

        const getTodo = async () => {
            loading.value = true;
            try {
                const res = await axios.get(`/todos/${todoId}`);
                todo.value = { ...res.data };
                originalTodo.value = { ...res.data };
                loading.value = false;
            } catch (err) {
                console.error(err);
                triggerToast("데이터를 불러오지 못했습니다.", true);
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
            if (todo.value.subject === '') {
                subjectError.value = 'Todo의 제목은 필수 항목입니다.'
                return
            }
            try {
                await axios.put(`/todos/${todoId}`, {
                    subject: todo.value.subject,
                    complated: todo.value.complated,
                    body: todo.value.body
                });
                triggerToast("수정되었습니다.");
                getTodo()
            } catch (err) {
                console.error(err);
                triggerToast("수정에 실패하였습니다.", true);
            }
        }

        const createTodo = async () => {
            if (todo.value.subject === '') {
                subjectError.value = 'Todo의 제목은 필수 항목입니다.'
                return
            }

            try {
                await axios.post(`/todos`, {
                    subject: todo.value.subject,
                    complated: todo.value.complated,
                    body: todo.value.body
                });
                triggerToast("저장되었습니다.");
                moveToTodoList();
            } catch (err) {
                console.error(err);
                triggerToast("저장에 실패하였습니다.", true);
            }
        }


        const showModal = ref(false);
        const deleteTodo = async () => {
            try {
                await axios.delete(`/todos/${todoId}`);
                triggerToast('삭제되었습니다.')
                moveToTodoList();
            } catch (err) {
                console.error(err);
                triggerToast('삭제에 실패하였습니다.', true)
            }
        }

        const openModal = () => {
            showModal.value = true;
        }

        const closeModal = () => {
            showModal.value = false;
        }

        onMounted(() => {
            if (props.editing) getTodo();
        })

        return {
            todo,
            loading,
            isTodoUpdated,
            subjectError,
            showModal,
            toggleTodoStatus,
            moveToTodoList,
            updateTodo,
            createTodo,
            deleteTodo,
            openModal,
            closeModal,
        }
    }
}
</script>

<style scoped>

</style>