<template>

<nav class="navbar navbar-expand navbar-light bg-light">
  <router-link class="navbar-brand" :to="{ name: 'Home' }">Hihat Todo</router-link>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{ name: 'Todos' }">Todo</router-link>
      </li>
    </ul>
  </div>
</nav>
<div class="container">
  <router-view></router-view>
</div>
<transition name="fade">
  <Toast
    v-if="showToast"
    :message="toastMessage"
    :isError="isToastError"/>
</transition>
</template>

<script>
import Toast from '@/components/Toast.vue'
import { useToast } from '@/composables/toast';

export default {
  components: {
    Toast,
  },

  setup() {
    const {
      showToast,
      toastMessage,
      isToastError,
      triggerToast,
      toastTimeout,
    } = useToast();

    console.log(showToast.value);

    return {
      showToast,
      toastMessage,
      isToastError,
      triggerToast,
      toastTimeout,
    }
  }
}
</script>

<style>

</style>
