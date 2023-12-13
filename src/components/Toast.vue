<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="toast-box">
        <transition-group name="slide">
            <div v-for="toast in toasts" :key="toast.id"
                class="alert"
                :class="toast.isError ? 'alert-danger' : 'alert-success'"
                role="alert">
                {{ toast.message }}
            </div>
        </transition-group>
    </div>
</template>

<script>
import { useToast } from "@/composables/toast";

export default {
    props: {
        message: {
            type: String,
            required: true
        },
        isError: {
            type: Boolean,
            default: false
        }
    },

    setup() {
        const { toasts } = useToast();

        return {
            toasts
        }
    }
}
</script>

<style scoped>
.toast-box {
    position: fixed;
    top: 10px;
    right: 10px;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.5s ease;
}

.slide-enter-from {
    opacity: 0;
    transform: translateY(-30px)
}

.slide-enter-to {
    opacity: 1;
    transform: translateY(0px)
}

.slide-leave-from {
    opacity: 1;
    transform: translateY(0px)
}

.slide-leave-to {
    opacity: 0;
    transform: translateY(30px)
}

</style>