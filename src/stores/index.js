import { defineStore } from 'pinia'
import axios from 'axios';

export const useStore = defineStore('main', {
  state:() => ({
    // all state variables
    user: null,
    products: [],
    cart: [],
  }),
  getters:{
    getProducts(state){
      return state.products;
    }
  },
  actions: {
    // actions goes here
    async fetchProducts() {
      // make API request to fetch products
      this.products = [];
      const res = await axios.get('https://fakestoreapi.com/products');
      this.products = res.data;
      // console.log(this.products);
      
    },
    addToCart(product) {
      this.cart.push(product);
    },
    removeFromCart(product) {
      this.cart = this.cart.filter(item => item.id !== product.id);
    },
  }
})
