export default {
    namespaced: true,
    state: {
        toasts: [],
        showToast: false,
        toastMessage: '',
        isToastError: false,
    },
    mutations: {
        UPDATE_TOAST_MESSAGE (state, payload) {
            state.toastMessage = payload;
        },
        UPDATE_TOAST_STATUS (state, payload) {
            state.showToast = payload;
        },
        UPDATE_TOAST_IS_ERROR (state, payload) {
            state.isToastError = payload;
        },
        ADD_TOAST (state, payload) {
            state.toasts.unshift(payload);
        },
        REMOVE_TOAST (state) {
            state.toasts.pop();
        }
    },
    actions: {
        triggerToast({ commit }, payload) {
            // commit('UPDATE_TOAST_MESSAGE', message);
            // commit('UPDATE_TOAST_IS_ERROR', isError);
            // commit('UPDATE_TOAST_STATUS', true);
            commit('ADD_TOAST', {
                id: Date.now(),
                message: payload.message,
                isError: payload.isError
            })

            setTimeout(() => {
                // commit('UPDATE_TOAST_MESSAGE', '');
                // commit('UPDATE_TOAST_IS_ERROR', false);
                // commit('UPDATE_TOAST_STATUS', false);
                commit('REMOVE_TOAST', {})
            }, 3000)
        }
    },
    getters: {
        toastMessageWithSmile(state) {
            return state.toastMessage + "^^";
        }
    },
}