<script setup>
import { onMounted } from 'vue';

defineProps({
 
})
onMounted(()=>{
	const navbarMenu = document.getElementById("menu");
const burgerMenu = document.getElementById("burger");
const headerMenu = document.getElementById("header");

// Open Close Navbar Menu on Click Burger
if (burgerMenu && navbarMenu) {
   burgerMenu.addEventListener("click", () => {
      burgerMenu.classList.toggle("is-active");
      navbarMenu.classList.toggle("is-active");
   });
}

// Close Navbar Menu on Click Menu Links
document.querySelectorAll(".menu-link").forEach((link) => {
   link.addEventListener("click", () => {
      burgerMenu.classList.remove("is-active");
      navbarMenu.classList.remove("is-active");
   });
});

// Change Header Background on Scrolling
window.addEventListener("scroll", () => {
   if (window.scrollY >= 85) {
      headerMenu.classList.add("on-scroll");
   } else {
      headerMenu.classList.remove("on-scroll");
   }
});

// Fixed Navbar Menu on Window Resize
window.addEventListener("resize", () => {
   if (window.innerWidth > 768) {
      if (navbarMenu.classList.contains("is-active")) {
         navbarMenu.classList.remove("is-active");
      }
   }
});
})

</script>

<template>
  <header class="header sticky top-0" id="header">
   <nav class="navbar container">
      <a href="/" class="brand">Brand</a>
      <div class="burger" id="burger">
         <span class="burger-line"></span>
         <span class="burger-line"></span>
         <span class="burger-line"></span>
      </div>
      <div class="menu" id="menu">
         <ul class="menu-inner">
            <li class="menu-item"><router-link to="/" class="menu-link">Home</router-link></li>
            <li class="menu-item"><router-link to="#" class="menu-link">Feature</router-link></li>
            <li class="menu-item"><router-link to="/products" class="menu-link">Products</router-link></li>
            <li class="menu-item"><router-link to="/wishlist" class="menu-link"><i class='bx bx-heart text-lg'></i></router-link></li>
            <li class="menu-item"><router-link to="/cart" class="menu-link"><i class='bx bx-cart text-xl'></i></router-link></li>
			
         </ul>
      </div>
      <router-link to="/login" class="menu-block">Login</router-link>
   </nav>
</header>
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
	 justify-content: flex-start;
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
	 overflow: hidden;
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
 .burger .is-active .burger-line:nth-child(1) {
	 top: 0.5rem;
	 transform: rotate(135deg);
}
 .burger .is-active .burger-line:nth-child(2) {
	 opacity: 0;
	 visibility: hidden;
}
 .burger .is-active .burger-line:nth-child(3) {
	 top: 0.5rem;
	 transform: rotate(-135deg);
}
</style>
