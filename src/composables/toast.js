import { ref } from 'vue'

export const useToast = () => {

    const showToast = ref(false);
    const toastMessage = ref('');
    const isToastError = ref(false);
    const toastTimeout = ref(null);

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