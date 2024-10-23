<script setup>
import { onMounted, ref } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import Badge from 'primevue/badge';
import OverlayBadge from 'primevue/overlaybadge';

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


const visible = ref(false);
const isLoading = ref(false);

const onDialogHide  = () => {
	// console.log("hide");
	
	// visible.value = false;
};
import { useToast } from "primevue/usetoast";
const toast = useToast();


const handleLogin = () => {
		isLoading.value = true;
		isLoading.value = false;
		toast.add({ severity: 'success', summary: 'Success', detail: 'Message Content', life: 3000 });
		visible.value = false;
    };
</script>

<template>
	<section>

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
            <li class="menu-item relative">
				<router-link to="/cart" class="menu-link">
					<i class='bx bx-cart text-xl'></i>
					<Badge value="15" class="badge-cart flex items-center justify-center" />
				</router-link>
			</li>
		</ul>
      </div>
      <button class="menu-block" @click="visible = true">Login</button>
   </nav>
</header>

<Dialog v-model:visible="visible" modal @hide="onDialogHide"
:closeOnEscape="true"
      :dismissableMask="true"
pt:root:class="!border-0 !bg-transparent" pt:mask:class="backdrop-blur-sm">
            <template #container="{ closeCallback }">
                <div class="flex flex-col text-center px-8 py-8 gap-6 rounded-2xl" style="background-color: white;">
					<i class='bx bx-lock-alt text-2xl'></i>
					<div>
						<form class="login-form">
                <div class="field">
                    <input id="username" type="name" placeholder="Phone number, username, or email" />
                </div>
                <div class="field">
                    <input id="password" type="password" placeholder="password" />
                </div>
                <div class="separator">
                    <div class="line"></div>
                    <p>OR</p>
                    <div class="line"></div>
                </div>
                <div class="other">
                    <button class="fb-login-btn" type="button">
                        <i class="fa fa-facebook-official fb-icon"></i>
                        <span class="">Log in with Google</span>
                    </button>
                    <a class="forgot-password" href="#">Forgot password?</a>
                </div>
            </form>
					</div>
                    <div class="">
                        <Button 
							:label="isLoading ? 'Logging In' : 'Log In'" 
							:disabled="isLoading" 
							class="!p-1 w-full !bg-blue-500 !text-white !border !border-white/30 hover:!bg-blue-600 flex justify-center items-center"
							@click="handleLogin()"
							>
							<template v-if="isLoading">
								<span class="loading-dots p-0 m-0">
									<span>.</span>
									<span>.</span>
									<span>.</span>
									<span>.</span>
								</span>
							</template>
							</Button>
                    </div>
                </div>
            </template>
        </Dialog>
		<Toast position="bottom-center"/>
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
	 /* overflow: hidden; */
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
.loading-dots {
  /* display: inline-flex; */
  margin-left: 5px; 
}

.loading-dots span {
  animation: blink 1s infinite;
  font-size: 16px; /* Adjust as needed */
  margin: 0 1px;
}
.badge-cart {
    position: absolute;
	font-size: 12px;
	height: 23px;
	width: 23px;
	border-radius: 50%;
    top: -11px; /* Adjust based on your design */
    right: -14px; /* Adjust based on your design */
    background-color: red; /* Change color if needed */
    color: white;
}
@keyframes blink {
  0%, 20% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}
</style>
