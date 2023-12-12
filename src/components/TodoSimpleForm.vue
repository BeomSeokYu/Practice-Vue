<template>
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
        추가 할 Todo를 입력하세요
    </div>
</form>
</template>

<script>
import { ref } from 'vue';
export default {
    emits: ['add-todo'],
    setup(props, { emit }) {
        const todo = ref('');
        const hasError = ref(false);

        const onSubmit = () => {
            if (todo.value === '') {
                hasError.value = true;
                return;
            }

            emit('add-todo', {
                id: Date.now(),
                subject: todo.value,
                complated: false
            });
            // todos.value.push({
            //     id: Date.now(),
            //     subject: todo.value,
            //     complated: false
            // })
            todo.value = '';
            hasError.value = false;
        }

        return {
            todo,
            hasError,
            onSubmit
        }
    },
}
</script>

<style>

</style>