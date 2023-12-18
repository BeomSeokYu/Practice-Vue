<template>
<div class="container">
  <Navbar />
  <router-view></router-view>
</div>
<Toast />
</template>

<script>
import Toast from '@/components/Toast.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Toast,
    Navbar,
  },
}
</script>

<style>

</style>
