import { createRouter, createWebHistory } from 'vue-router'; // Import necessary functions from Vue Router
import HomeView from '../views/HomeView.vue'; // Import Home view component
import ProductsView from '../views/ProductsView.vue'; // Import Products view component
import CartView from '../views/CartView.vue'; // Import Cart view component
import ProductManagement from '../views/ProductManagement.vue'; // Import Product Management view component
import NotFound from '../components/NotFound.vue';
import { isAuthenticated } from '../auth/auth';

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
      component: ProductManagement, // Component to render for product management
      beforeEnter: (to, from, next) => {
        if (!isAuthenticated()) {
          next('/'); // Redirect to home if not authenticated
        } else {
          next(); // Allow access if authenticated
        }
      }
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },  // Catch-all route for 404 Not Found


  ]
});

export default router; // Export the router instance for use in the application
