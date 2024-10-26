// Import global CSS styles
import './assets/main.css';

// Import necessary functions and libraries from Vue and other libraries
import { createApp } from 'vue';
import { createPinia } from 'pinia'; // State management library
import PrimeVue from 'primevue/config'; // PrimeVue configuration
import 'primeicons/primeicons.css'; // PrimeIcons for icons
import Aura from '@primevue/themes/aura'; // Import Aura theme
import ToastService from 'primevue/toastservice'; // Toast service for notifications

import App from './App.vue'; // Main App component
import router from './router'; // Router instance
import { definePreset } from '@primevue/themes'; // Function to define a theme preset

// Create a Vue application instance
const app = createApp(App);

// Define a custom theme preset using Aura theme
const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{sky.50}',
            100: '{sky.100}',
            200: '{sky.200}',
            300: '{sky.300}',
            400: '{sky.400}',
            500: '{sky.500}',
            600: '{sky.600}',
            700: '{sky.700}',
            800: '{sky.800}',
            900: '{sky.900}',
            950: '{sky.950}'
        }
    }
});

// Use PrimeVue with the defined theme preset and ToastService
app.use(PrimeVue, { theme: {
    preset: MyPreset,
} }).use(ToastService);

// Use Pinia for state management
app.use(createPinia());

// Use the router for navigation
app.use(router);

// Mount the app to the DOM
app.mount('#app');
