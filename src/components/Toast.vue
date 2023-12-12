<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <transition name="fade">
        <div
            class="alert toast-box"
            :class="isError ? 'alert-danger' : 'alert-success'"
            role="alert">
            {{ message }}
        </div>
    </transition>
</template>

<script>
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
    }
}
</script>

<style>
.toast-box {
    position: fixed;
    top: 10px;
    right: 10px;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-30px)
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
    transform: translateY(0px)
}
</style>