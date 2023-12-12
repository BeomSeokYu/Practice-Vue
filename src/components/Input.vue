<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="form-group">
        <label>{{ label }}</label>
        <input type="text"
            class="form-control"
            :value="subject"
            @input="onInput">
    </div>
    <div
        class="text-danger mt-m15"
        v-if="error">
        {{ error }}
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        error: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        }
    },

    setup(props, { emit }) {
        const onInput = (e) => {
            console.log(e.target.value);
            emit('update:subject', e.target.value);
        }

        return {
            onInput
        }
    }
}
</script>

<style scoped>
.text-danger {
    color: red;
}
.mt-m15 {
    margin-top: -15px;
}
</style>