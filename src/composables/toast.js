import { computed } from 'vue'
import { useStore } from 'vuex'

export const useToast = () => {
    const store = useStore();

    const toasts = computed(() => {
        return store.state.toast.toasts
    });

    // const showToast = computed(() => {
    //     return store.state.toast.showToast
    // })

    // const toastMessage = computed(() => {
    //     return store.state.toast.toastMessage
    // })

    // const isToastError = computed(() => {
    //     return store.state.toast.isToastError
    // })

    const triggerToast = (message, isError = false) => {
        store.dispatch('toast/triggerToast', message, isError);
    }

    return {
        toasts,
        triggerToast,
    }
}