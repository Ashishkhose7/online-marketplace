import { createRouter, createWebHistory } from 'vue-router'; // Import necessary functions from Vue Router
import HomeView from '../views/HomeView.vue'; // Import Home view component
import ProductsView from '../views/ProductsView.vue'; // Import Products view component
import CartView from '../views/CartView.vue'; // Import Cart view component
import ProductManagement from '../views/ProductManagement.vue'; // Import Product Management view component

// Create a router instance
const router = createRouter({
  history: createWebHistory(),
  // Define routes for the application
  routes: [ 
    {
      path: '/', // Path for the home page
      component: HomeView // Component to render for the home page
    },
    {
      path: '/products', // Path for the products page
      component: ProductsView // Component to render for the products page
    },
    {
      path: '/cart', // Path for the cart page
      component: CartView // Component to render for the cart page
    },
    {
      path: '/product_management', // Path for the product management page
      component: ProductManagement // Component to render for product management
    },
  ]
});

export default router; // Export the router instance for use in the application
