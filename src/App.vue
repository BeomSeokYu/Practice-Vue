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
<Toast />
</template>

<script>
import Toast from '@/components/Toast.vue'

export default {
  components: {
    Toast,
  },
}
</script>

<style>

</style>
