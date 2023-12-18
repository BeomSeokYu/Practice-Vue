<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>Home page</div>
  <div>{{ count }}</div>
  <button type="button" @click="count++">+</button>
</template>

<script>
import { useCount } from '@/composables/count'

export default {
  setup() {
    const { count } = useCount();

    return {
      count
    }
  }
}
</script>

<style>

</style>