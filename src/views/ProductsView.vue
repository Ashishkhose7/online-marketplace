<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from '../stores/index'; // Import the store for state management
import { useToast } from "primevue/usetoast"; // Import toast for notifications
import Button from 'primevue/button'; // Import button component (not used in the template)
import ProgressSpinner from 'primevue/progressspinner';


// Setup toast for notifications
const toast = useToast();
const store = useStore(); // Initialize store

// Fetch products when the component is mounted
onMounted(() => {
    store.fetchProducts();
});

// Computed property to get the list of products from the store
const productlist = computed(() => store.products);

// Computed property to check if products are loading
const loadingProducts = computed(() => store.loadingProducts);

// State to track favorited product indices
const favoritedIndices = ref([]);

// Function to check if a specific product is loading
const isLoading = (productId) => {
  return loadingProducts.value.includes(productId);
};

// Function to toggle the favorite status of a product
const toggleHeart = (index) => {
  if (favoritedIndices.value.includes(index)) {
    // Remove from favorites if already favorited
    favoritedIndices.value = favoritedIndices.value.filter(i => i !== index);
  } else {
    // Add to favorites if not already favorited
    favoritedIndices.value.push(index);
  }
};

// Function to handle adding a product to the cart
const handleAddCart = async (product) => {
  // Set loading state
  isLoading.value = true;
  const res = await store.addToCart(product); // Add product to cart

  // Check the response and show appropriate toast notification
  if (res?.status === "success") {
    isLoading.value = false; // Stop loading
    toast.add({ severity: 'contrast', summary: '', detail: res.message, life: 3000 });
  } else {
    isLoading.value = false; // Stop loading
    toast.add({ severity: 'contrast', summary: '', detail: 'Item added to cart', life: 3000 });
  }
}
</script>


<template>
  <section class="section__prod" id="vegetable">
    <div class="container">
      <div class="prod__list" v-if="productlist.length">
        <!-- Iterate over the product list and display each product -->
          <section class="prod__item" v-for="(product, index) in productlist" :key="product.id" >
          <div class="prod__item__wrap text-center flex flex-col gap-0 justify-between py-3 px-1">
            <!-- Product Image -->
            <a href="" class="prod__img">
              <img :src="product?.image" alt="" class="h-[130px] w-[100%]">
            </a>
            <!-- Product Rating -->
            <del class="text-start mx-3 mt-2 inline-block float-start">
              <i class='bx bxs-star text-yellow-400 mr-[2px]'></i>{{ Math.round(product?.rating?.rate) }} ({{ product?.rating?.count }})
            </del>
            <div class="prod__content">
              <h3 class="prod__name">
                <a href="">{{ product?.title }}</a>
              </h3>
              <div class="prod__price flex justify-between items-center">
                <ins>&#8377{{ product?.price }}</ins>
                <!-- Heart Icon for Favorites -->
                <ins class="cursor-pointer">
                  <i @click="toggleHeart(index)" :class="favoritedIndices.includes(index) ? 'bx bxs-heart text-red-500' : 'bx bx-heart'"></i>
                </ins>
              </div>
            </div>
            <!-- Add to Cart Button -->
            <button 
              @click="handleAddCart(product)" 
              :disabled="isLoading(product.id)" 
              class="btn btn-darken btn-inline text-black px-16 py-[3px] flex justify-center items-center font-thin"
            >
              <span v-if="isLoading(product.id)">
                <span class="loading-dots p-0 m-0 inline-block">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </span>
              <span v-else>Add to Cart</span>
            </button>
          </div>
        </section>
    </div>
    <div v-else class="text-center h-[100vh] flex flex-col items-center justify-center">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="4" fill="transparent"
        animationDuration=".5s" aria-label="Custom ProgressSpinner" />
    </div>
    </div>
  </section>
</template>

<style scoped>
.section__prod {
  position: relative;
  padding: 30px 0 30px 0;
}
.section__prod .prod__title {
  position: relative;
  z-index: 3;
  overflow: hidden;
  margin-top: 0;
  padding: 60px 30px;
  font-size: 30px;
  text-align: center;
  color: #fff;
  border-radius: 15px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  transition: 0.25s;
}
@media (max-width: 991px) {
  .section__prod .prod__title {
    font-size: 26px;
    padding: 45px 30px;
  }
}
@media (max-width: 767px) {
  .section__prod .prod__title {
    font-size: 20px;
    text-align: center;
    padding: 30px 15px;
  }
}
.section__prod .prod__title:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
.section__prod .prod__list {
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  margin: 0 -15px;
  transition: 0.25s;
}
@media (max-width: 991px) {
  .section__prod .prod__list {
    margin: 0 -10px;
  }
}
.section__prod .prod__list .prod__item {
  flex: 0 0 25%;
  padding: 15px;
}
@media (max-width: 991px) {
  .section__prod .prod__list .prod__item {
    flex: 0 0 33.333333%;
    padding: 10px;
  }
}
@media (max-width: 767px) {
  .section__prod .prod__list .prod__item {
    flex: 0 0 50%;
  }
}
.section__prod .prod__list .prod__item .prod__item__wrap {
  height: 100%;
  border: 1px solid #eee;
  border-radius: 3px;
  overflow: hidden;
  transition: 0.25s;
}
.section__prod .prod__list .prod__item .prod__item__wrap:hover {
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.section__prod .prod__list .prod__item .prod__img {
  display: flex;
}
.section__prod .prod__list .prod__item .prod__img img {
  width: 100%;
  transform: scale(1) rotate(0);
  transition: 0.25s;
}
.section__prod .prod__list .prod__item .prod__content {
  padding: 0 15px 10px 15px;
  display: flex;
  flex-flow: column;
}
.section__prod .prod__list .prod__item .prod__name {
  margin: 10px 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  text-align: start;
}
@media (max-width: 767px) {
  .section__prod .prod__list .prod__item .prod__name {
    font-size: 14px;
  }
}
.section__prod .prod__list .prod__item .prod__name a {
  text-decoration: none;
  color: #000;
  transition: 0.25s;
}
.section__prod .prod__list .prod__item .prod__name a:hover {
  color: #41b93c;
}
.section__prod .prod__list .prod__item .prod__price {
  font-weight: 500;
}
.section__prod .prod__list .prod__item .prod__price ins {
  font-size: 18px;
  text-decoration: none;
  color: black;
}
.section__prod .prod__list del {
  color: gray;
  font-weight: 200;
  font-size: 12px;
}
.section__prod .prod__viewall {
  text-align: center;
}
.section__prod .prod__viewall a {
  text-decoration: none;
  color: #555;
  border: 1px solid #ddd;
  border-radius: 30px;
  padding: 12px 40px;
  transition: 0.25s;
}
.section__prod .prod__viewall a:hover {
  color: #fff;
  border-color: #41b93c;
  background-color: #41b93c;
}
.btn {
	 display: inline-block;
	 font-family: inherit;
	 font-size: 14px;
	 font-weight: 500;
	 text-align: center;
    margin: 5px 10px;
	 vertical-align: middle;
	 white-space: nowrap;
	 user-select: none;
	 outline: none;
    border: 1px solid #333333;
	 border-radius: 0.25rem;
	 text-transform: unset;
	 transition: all 0.2s ease-in-out;
}
.btn:hover{
   color:  white;
   background: #2463eb;
   border: 1px solid #2463eb;
}
 .btn-inline {
	 display: inline-flex;
	 align-items: center;
	 justify-content: center;
	 column-gap: 0.5rem;
}
</style>