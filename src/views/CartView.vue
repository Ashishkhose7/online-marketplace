<script setup>
import { computed, ref } from 'vue';
import { useStore } from '../stores/index';
import { useToast } from "primevue/usetoast";
import LoginDialog from '@/components/LoginDialog.vue';

const toast = useToast();
const store = useStore();
const quantity = ref();
const showLoginDialog = ref(false);

// Computed property for cart list
const cartlist = computed(() => {
    return store.cart;
});

// Function to update cart
const updateCart = (product, quantity) => {
    store.updateCart(product, quantity);
};

// Increment quantity of a product
const incrementQuantity = (product) => {
    store.incrementQuantity(product);
};

// Decrement quantity of a product
const decrementQuantity = (product) => {
    store.decrementQuantity(product);
};

// Update API for cart quantity
const updateAPI = (product, quantity) => {
    // Restricting user to do not input quantity less than zero
    if (quantity < 1) {
        quantity = 1;
    }
    store.updateApiCart(product, quantity);
};

// Handle item removal from cart
const handleRemoveCart = async (item) => {
    const res = await store.removeFromCart(item);
    toast.add({ severity: 'contrast', summary: '', detail: res.message, life: 3000 });
};

// Handle checkout process
const handleCheckout = () => {
    if (!store.user) {
        showLoginDialog.value = true;
    }
};
</script>

<template>
    <section>
        <div class="container section__prod mx-auto px-4 py-8">
            <!-- Empty Cart State -->
            <div v-if="cartlist.length < 1" class="bg-white rounded-lg p-6 mb-8">
                <div class="text-center py-12">
                    <svg class="w-24 h-24 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                    </svg>
                    <h2 class="text-2xl font-bold mb-4">Your cart is empty</h2>
                    <p class="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
                    <router-link to="/products" class="inline-block bg-black text-white px-8 rounded-lg hover:bg-gray-800 transition-colors py-[5px] text-base">
                        Continue Shopping
                    </router-link>
                </div>
            </div>
            <div v-else class="lg:flex lg:space-x-8">
                <!-- Cart Section -->
                <div class="lg:w-2/3">
                    <div class="bg-white rounded-lg px-6 mb-4">
                        <h2 class="text-2xl font-bold mb-8">Shopping Cart</h2>
                        
                        <!-- Cart Items -->
                        <div class="space-y-4">
                            <div class="flex items-center pb-4" v-for="(item, index) in cartlist" :key="item.id" :class="store.getCartCount == index + 1 ? '' : 'border-b'">
                                <img :src="item.image" alt="Product image" class="w-20 h-20 rounded"/>
                                <div class="flex-1 ml-4">
                                    <div class="font-medium text-base">{{ item.title }}</div>
                                    <div class="flex items-center mt-2">
                                        <button class="text-gray-500 px-2 hover:text-red-500" @click="decrementQuantity(item)">-</button>
                                        <input type="number" v-model.number="item.quantity" class="w-12 text-center border mx-2 rounded" @input="updateCart(item, item.quantity)" @change="updateAPI(item, item.quantity)"/>
                                        <button class="text-gray-500 px-2 hover:text-green-500" @click="incrementQuantity(item)">+</button>
                                    </div>
                                </div>
                                <div class="font-medium text-base">&#8377&nbsp;{{ item.totalPrice || item.quantity * item.price }}</div>
                                <button class="ml-4 text-gray-300 hover:text-red-600" @click="handleRemoveCart(item)"><i class='bx bx-trash-alt'></i></button>
                            </div>
                        </div>

                        <router-link to="/products" class="inline-flex items-center text-gray-600 mt-8 text-xs">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                            </svg>
                            Back to shop
                        </router-link>
                    </div>
                </div>

                <!-- Summary Section -->
                <div class="lg:w-1/3">
                    <div class="sticky top-16">
                        <div class="bg-white rounded-lg shadow-md p-6">
                            <h2 class="text-xl font-bold mb-4">Summary</h2>
                            
                            <div>
                                <div class="text-gray-600 mb-4 text-base">{{ store.getCartCount }} Items</div>

                                <div class="mb-4 text-xs">
                                    <label class="block text-gray-600 mb-2">GIVE CODE</label>
                                    <div class="flex">
                                        <input type="text" placeholder="Enter your code" class="flex-1 p-2 border rounded"/>
                                        <button class="bg-gray-100 px-4 border border-l-0 rounded-r">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="calculations">
                                    <div class="flex justify-between pt-4 mb-2 text-sm">
                                        <span class="font-light">Items Price</span>
                                        <span class="font-light">&#8377 {{ Math.round(store.totalAmount) }}</span>
                                    </div>
                                    <div class="flex justify-between pt-4 mb-2 text-sm">
                                        <span class="font-light">Shipping</span>
                                        <span class="font-light">&#8377 10</span>
                                    </div>
                                    <div class="flex justify-between border-t pt-4 mb-4 text-base">
                                        <span class="font-bold">Total Price</span>
                                        <span class="font-bold">&#8377 {{ Math.round(store.totalAmount) + 10 }}</span>
                                    </div>
                                </div>
                                <button class="w-full bg-blue-600 text-white py-[5px] rounded text-base" @click="handleCheckout">Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <LoginDialog v-model="showLoginDialog"/> <!-- Login dialog component -->
    </section>
</template>

<style scoped>

</style>
