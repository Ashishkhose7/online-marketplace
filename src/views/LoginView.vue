<script setup>
import { onMounted } from 'vue';

onMounted(()=>{
  document.title = 'Login - MarketPlace';

})
</script>

<template>
    <main class="container" v-for="n in 30">
        <h6>Login View</h6>
    </main>
</template>

<style scoped>

</style>
