<script setup>
import { RouterLink, RouterView } from 'vue-router'; // Import RouterLink and RouterView for routing
import Header from './components/Header.vue'; // Import Header component
</script>

<template>
  <section class="flex flex-col"> <!-- Main layout container -->
    <div class="header sticky top-0 z-50"> <!-- Sticky header for navigation -->
      <Header/> <!-- Render the Header component -->
    </div>
    <div class="main"> <!-- Main content area -->
      <RouterView /> <!-- Dynamic view based on the current route -->
    </div>
  </section>
</template>

<style scoped>

</style>
