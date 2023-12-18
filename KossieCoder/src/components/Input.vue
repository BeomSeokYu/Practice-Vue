<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="form-group">
        <label>{{ label }}</label>
        <input
            class="form-control"
            :type="type"
            :value="modelValue"
            :placeholder="placeholder"
            @input="onInput">
    </div>
    <div
        class="text-danger mt-m15"
        v-if="error">
        {{ error }}
    </div>
</template>

<script>
import { getCurrentInstance } from 'vue';
export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        },
        error: {
            type: String,
            default: ''
        },
        modelValue: {
            type: String,
            default: ''
        }
    },

    setup() {
        const { emit } = getCurrentInstance();
        const onInput = (e) => {
            console.log(e.target.value);
            emit('update:modelValue', e.target.value);
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