import { computed } from 'vue'
import { useStore } from 'vuex'

export const useToast = () => {
    const store = useStore();

    const showToast = computed(() => {
        return store.state.showToast
    })

    const toastMessage = computed(() => {
        return store.state.toastMessage
    })

    const isToastError = computed(() => {
        return store.state.isToastError
    })

    const toastTimeout = computed(() => {
        return store.state.toastTimeout
    })

    const triggerToast = (message, isError = false) => {
        toastMessage.value = message
        isToastError.value = isError
        showToast.value = true;
        toastTimeout.value =  setTimeout(() => {
            toastMessage.value = ''
            isToastError.value = false
            showToast.value = false;
        }, 3000)
    }

    return {
        showToast,
        toastMessage,
        isToastError,
        toastTimeout,
        triggerToast,
    }
}