import { createStore } from 'vuex'

const store = createStore({
    state: {
        showToast: false,
        toastMessage: '',
        isToastError: false,
        toastTimeout: null,
    },
    mutations: {
        UPDATE_TOAST_MESSAGE (state, payload) {
            state.message = payload;
        },
        UPDATE_TOAST_STATUS (state, payload) {
            state.showToast = payload;
        },
        UPDATE_TOAST_IS_ERROR (state, payload) {
            state.isToastError = payload;
        },
        UPDATE_TOAST_TIMEOUT (state, payload) {
            state.toastTimeout = payload;
        },
    },
    actions: {
        triggerToast({ commit }, message, isError = false) => {
            commit('UPDATE_TOAST_MESSAGE', message);
            commit('UPDATE_TOAST_IS_ERROR', isError);
            commit('UPDATE_TOAST_STATUS', true);
            commit('UPDATE_TOAST_TIMEOUT', isError);
            toastTimeout.value =  setTimeout(() => {
                commit('UPDATE_TOAST_MESSAGE', '');
                commit('UPDATE_TOAST_IS_ERROR', false);
                commit('UPDATE_TOAST_STATUS', false);
            }, 3000)
        }
    }
})

export default store