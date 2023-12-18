<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="mt-2">
      <ul class="pagination">
        <li
          class="page-item"
          :class="currentPage === 1 ? 'disabled' : ''"
          @click="currentPage > 1 ? onClick(currentPage - 1) : null"
        ><a class="page-link" href="#">Prev</a>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :class="currentPage === page ? 'active' : ''"
          :key="page">
          <a class="page-link" @click="onClick(page)">{{ page }}</a>
        </li>
        <li
          class="page-item"
          :class="currentPage === totalPages ? 'disabled' : ''"
          @click="currentPage < totalPages ? onClick(currentPage + 1) : null"
          ><a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
</template>

<script>
import { getCurrentInstance } from 'vue'

export default {
    props: {
        totalPages: {
            type: Number,
            require: true
        },
        currentPage: {
            type: Number,
            require: true
        }
    },

    emits: ['click'],

    setup() {
        const { emit } = getCurrentInstance();

        const onClick = (page) => {
          emit('click', page)
        }

        return {
          onClick
        }
    }
}
</script>

<style>

</style>