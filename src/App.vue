<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/Header.vue'
import Header from './components/Header.vue';


</script>

<template>

  <section class="flex flex-col">
    <div class="header sticky top-0 z-50">
      <Header/>
    </div>
    <div class="main">
      <RouterView />
    </div>
  </section>

</template>

<style scoped>

</style>
