<script setup>
import { computed, onMounted, ref } from 'vue';  // Import necessary Vue features
import Badge from 'primevue/badge';  // Import PrimeVue Badge component
import Menu from 'primevue/menu';  // Import PrimeVue Menu component
import Toast from 'primevue/toast';  // Import PrimeVue Toast component
import { useToast } from "primevue/usetoast";  // Use toast functionality
import { useRouter } from 'vue-router';  // Import router for navigation
import { useStore } from '../stores/index';  // Import the store for state management
import LoginDialog from './LoginDialog.vue';  // Import the LoginDialog component

const router = useRouter();  // Initialize router
const toast = useToast();  // Initialize toast for notifications
const store = useStore();  // Initialize store for state management
const showLoginDialog = ref(false);  // Reactive reference for controlling login dialog visibility
const menu = ref();  // Reference for the menu component
const items = ref([  // Menu items with associated actions
  { label: 'Product Management', icon: 'pi pi-cog', command: () => { handleProductManagement(); } },
  { label: 'Logout', icon: 'pi pi-sign-out', command: () => { handleLogout(); } }
]);

// Lifecycle hook to set up event listeners when the component is mounted
onMounted(() => {
  const navbarMenu = document.getElementById("menu");  // Get the menu element
  const burgerMenu = document.getElementById("burger");  // Get the burger menu element
  const headerMenu = document.getElementById("header");  // Get the header element

  // Open/close navbar menu on clicking the burger icon
  if (burgerMenu && navbarMenu) {
    burgerMenu.addEventListener("click", () => {
      burgerMenu.classList.toggle("is-active");  // Toggle burger icon active state
      navbarMenu.classList.toggle("is-active");  // Toggle navbar menu visibility
    });
  }

  // Close navbar menu on clicking menu links
  document.querySelectorAll(".menu-link").forEach((link) => {
    link.addEventListener("click", () => {
      burgerMenu.classList.remove("is-active");  // Remove active state from burger menu
      navbarMenu.classList.remove("is-active");  // Hide navbar menu
    });
  });

  // Change header background on scrolling
  window.addEventListener("scroll", () => {
    if (window.scrollY >= 85) {
      headerMenu.classList.add("on-scroll");  // Add scroll effect class
    } else {
      headerMenu.classList.remove("on-scroll");  // Remove scroll effect class
    }
  });

  // Close navbar menu on window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      if (navbarMenu.classList.contains("is-active")) {
        navbarMenu.classList.remove("is-active");  // Close menu on wider screens
      }
    }
  });
});

// Function to handle user logout
const handleLogout = () => {
  store.logout();  // Call logout function from store
  router.push('/');  // Redirect to the home page
};

// Function to navigate to Product Management page
const handleProductManagement = () => {
  router.push('/product_management');  // Navigate to Product Management
};

// Function to toggle the menu visibility
const toggle = (event) => {
  menu.value.toggle(event);  // Toggle the menu display
};

</script>

<template>
  <section>
    <header class="header sticky top-0" id="header">
      <nav class="navbar container">
        <div class="flex items-center gap-5">
          <a href="/" class="brand">Brand</a>  <!-- Brand logo/link -->
          <div class="burger" id="burger">  <!-- Burger menu icon -->
            <span class="burger-line"></span>
            <span class="burger-line"></span>
            <span class="burger-line"></span>
          </div>
        </div>
        <div class="menu" id="menu">  <!-- Navbar menu -->
          <ul class="menu-inner">
            <li class="menu-item"><router-link to="/" class="menu-link">Home</router-link></li>
            <li class="menu-item"><router-link to="/" class="menu-link">Feature</router-link></li>
            <li class="menu-item"><router-link to="/products" class="menu-link">Products</router-link></li>
            <li class="menu-item"><router-link to="/products" class="menu-link"><i class='bx bx-heart text-lg'></i></router-link></li>
            <li class="menu-item relative">
              <router-link to="/cart" class="menu-link text-center">  <!-- Cart link with badge -->
                <i class='bx bx-cart text-xl'></i>
                <Badge :value="store.getCartCount" class="badge-cart flex items-center justify-center text-center" />
              </router-link>
            </li>
          </ul>
        </div>
        <!-- Login button visible if user is not authenticated -->
        <button v-if="!store.user" class="menu-block" @click="showLoginDialog = true">Login</button>
        <!-- User icon and dropdown menu if user is authenticated -->
        <div v-else class="text-3xl ml-3">
          <i class='bx bxs-user-circle cursor-pointer' aria-haspopup="true" aria-controls="overlay_menu" @click="toggle"></i>
          <Menu :model="items" ref="menu" :popup="true" class="px-2">
            <template v-slot:item="slotProps">
              <div class="menu-item-wrapper p-2 my-1 cursor-pointer">
                <i :class="slotProps.item.icon" style="margin-right: 10px;"></i>{{ slotProps.item.label }}  <!-- Menu item label and icon -->
              </div>
            </template>
          </Menu>
        </div>
      </nav>
    </header>
    <Toast position="bottom-center"/>  <!-- Toast notifications -->

    <LoginDialog v-model="showLoginDialog"/>  <!-- Login dialog component -->
  </section>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  margin: 0 auto;
  transition: all 0.35s ease;
  background: #080a0c;
  color: #fff;
}
.on-scroll {
  background: #0c0f13;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  column-gap: 1.25rem;
  width: 100%;
  height: 4.25rem;
  margin: 0 auto;
}
.brand {
  font-family: inherit;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: -1px;
  color: #fff;
  text-transform: uppercase;
}
.menu {
  position: fixed;
  top: -100%;
  left: 0;
  width: 100%;
  height: auto;
  padding: 4rem 0 3rem;
  background-color: #0c0f13;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.4s ease-in-out;
}
.is-active {
  top: 0;
  width: 100%;
  height: auto;
}
.menu-inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1.25rem;
}
.menu-link {
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  color: #fff;
  text-transform: uppercase;
  transition: all 0.3s ease;
}
.menu-block {
  display: inline-block;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25;
  user-select: none;
  white-space: nowrap;
  text-align: center;
  margin-left: auto;
  padding: 0.65rem 1.5rem;
  border-radius: 3rem;
  text-transform: capitalize;
  color: #fff;
  background-color: #2463eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease-in-out;
}
@media only screen and (min-width: 48rem) {
  .menu {
    position: relative;
    top: 0;
    width: auto;
    height: auto;
    padding: 0rem;
    margin-left: auto;
    background: none;
    box-shadow: none;
  }
  .menu-inner {
    display: flex;
    flex-direction: row;
    column-gap: 2rem;
    margin: 0 auto;
  }
  .menu-link {
    text-transform: capitalize;
  }
  .menu-block {
    margin-left: 2rem;
  }
}
.burger {
  position: relative;
  display: block;
  cursor: pointer;
  user-select: none;
  order: -1;
  z-index: 10;
  width: 1.6rem;
  height: 1.15rem;
  border: none;
  outline: none;
  background: none;
  visibility: visible;
  transform: rotate(0deg);
  transition: 0.35s ease;
}
@media only screen and (min-width: 48rem) {
  .burger {
    display: none;
    visibility: hidden;
  }
}
.burger-line {
  position: absolute;
  display: block;
  left: 0;
  width: 100%;
  height: 2px;
  border: none;
  outline: none;
  opacity: 1;
  border-radius: 1rem;
  transform: rotate(0deg);
  background-color: #fff;
  transition: 0.25s ease-in-out;
}
.burger-line:nth-child(1) {
  top: 0px;
}
.burger-line:nth-child(2) {
  top: 0.5rem;
  width: 70%;
}
.burger-line:nth-child(3) {
  top: 1rem;
}
.burger.is-active .burger-line:nth-child(1) {
  top: 0.5rem;
  transform: rotate(135deg);
}
.burger.is-active .burger-line:nth-child(2) {
  opacity: 0;
  visibility: hidden;
}
.burger.is-active .burger-line:nth-child(3) {
  top: 0.5rem;
  transform: rotate(-135deg);
}
.field {
  margin: 10px 0;
  position: relative;
  font-size: 14px;
  width: 100%;
  text-overflow: ellipsis;
}
input {
  padding: 9px 0px 7px 9px;
  font-size: 12px;
  width: 16rem;
  outline: none;
  background: #fafafa;
  border-radius: 3px;
  border: 1px solid #efefef;
}
.login-button {
  text-align: center;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid transparent;
  background-color: #3897f0;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
}
.separator {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999;
  margin-top: 6px;
}
.separator .line {
  height: 1px;
  width: 40%;
  background-color: #dbdbdb;
}
.other {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.fb-login-btn {
  margin: 1rem;
  border: 0;
  cursor: pointer;
  font-size: 14px;
  color: darkslateblue;
  font-weight: 600;
  background: transparent;
}
.fb-icon {
  color: #385185;
  font-size: 1rem;
  padding-right: 1px;
}
.forgot-password {
  font-size: 11px;
  color: #003569;
}
.badge-cart {
  position: absolute;
  font-size: 12px;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  top: -11px; /* Adjust based on your design */
  right: -14px; /* Adjust based on your design */
  background-color: red; /* Change color if needed */
  color: white;
}
.menu-item-wrapper {
  font-size: 12px;
  display: flex;
  align-items: center;
}
</style>
