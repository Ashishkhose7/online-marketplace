import { defineStore } from "pinia";
import axios from "axios";

// Define the main store
export const useStore = defineStore("main", {
  // State: define the reactive data for the store
  state: () => ({
    user: JSON.parse(sessionStorage.getItem("user")) || null, // User information from session storage
    products: JSON.parse(sessionStorage.getItem("products")) || [], // All fetched products
    cart: JSON.parse(sessionStorage.getItem("cart")) || [], // Current cart items
    loadingProducts: [], // Track loading states for individual products
    loginError: null, // Error message for login attempts
    token: sessionStorage.getItem("token") || null, // Auth token for user sessions
  }),

  // Getters: compute derived state
  getters: {
    getProducts(state) {
      return state.products; // Return all products
    },
    getCartCount(state) {
      return state.cart.length; // Count of items in the cart
    },
    totalAmount: (state) => {
      // Calculate total amount of items in the cart
      return state.cart
        .reduce((total, item) => total + item.totalPrice, 0)
        .toFixed(2);
    },
  },

  // Actions: define methods that can modify state or perform async operations
  actions: {
    // Save the current state to session storage
    saveTosessionStorage() {
      sessionStorage.setItem("cart", JSON.stringify(this.cart));
      sessionStorage.setItem("user", JSON.stringify(this.user));
      sessionStorage.setItem("products", JSON.stringify(this.products));
      sessionStorage.setItem("token", this.token);
    },

    // Clear session storage
    clearsessionStorage() {
      sessionStorage.removeItem("cart");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("products");
      sessionStorage.removeItem("token");
    },

    // Fetch products from the API
    async fetchProducts() {
      if(this.products?.length>0) return;
      try {
          const res = await axios.get("https://fakestoreapi.com/products");
          this.products = res.data; // Update products state
          this.saveTosessionStorage(); // Save products to session storage
          return res;
        } catch (error) {
          console.error("Error fetching products:", error); // Log any errors
        }
    },

    // Fetch the user's cart from the API
    async fetchCart() {
      if (!this.user) return; // Return if user is not logged in

      try {
        const res = await axios.get(
          `https://fakestoreapi.com/carts/user/${this.user.id}`
        );
        const cartItems = res.data; // Fetch cart data
        let allCartItems = [];
        cartItems.forEach((cart) => {
          allCartItems = allCartItems.concat(cart.products); // Combine all products from carts
        });

        // Fetch detailed product information for each cart item
        const productDetails = await Promise.all(
          allCartItems.map(async (item) => {
            const productRes = await axios.get(
              `https://fakestoreapi.com/products/${item.productId}`
            );
            return {
              ...productRes.data,
              quantity: item.quantity,
              totalPrice: Number(
                (item.quantity * productRes.data.price).toFixed(2)
              ),
            };
          })
        );

        // Combine duplicate items from fetched products
        const combinedFetchedCart = {};
        productDetails.forEach((item) => {
          if (combinedFetchedCart[item.id]) {
            combinedFetchedCart[item.id].quantity += item.quantity; // Increment quantity if exists
            combinedFetchedCart[item.id].totalPrice = Number(
              (
                combinedFetchedCart[item.id].quantity *
                combinedFetchedCart[item.id].price
              ).toFixed(2)
            );
          } else {
            combinedFetchedCart[item.id] = item; // Add new item
          }
        });

        // Prepare the final cart, combining fetched data and existing state
        const finalCart = [];
        Object.values(combinedFetchedCart).forEach((newItem) => {
          const existingItem = this.cart.find((item) => item.id === newItem.id);
          if (existingItem) {
            existingItem.quantity += newItem.quantity; // Update existing item
            existingItem.totalPrice = Number(
              (existingItem.quantity * existingItem.price).toFixed(2)
            );
            finalCart.push(existingItem);
          } else {
            finalCart.push(newItem); // Add new item to final cart
          }
        });

        // Add items that are only in the current cart state and not in fetched cart
        this.cart.forEach((item) => {
          if (!combinedFetchedCart[item.id]) {
            finalCart.push(item); // Keep existing items not fetched
          }
        });

        this.cart = finalCart; // Update cart state
        this.saveTosessionStorage(); // Save updated cart to session storage
      } catch (error) {
        console.error("Error fetching cart:", error); // Log any errors
      }
    },

    // Add a product to the cart
    async addToCart(product) {
      this.loadingProducts.push(product.id); // Set loading state for this product
      const existingProduct = this.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1; // Increment quantity if product exists
      } else {
        this.cart.push({
          ...product,
          quantity: 1,
          totalPrice: Number(product.price.toFixed(2)),
        }); // Add new product
      }
      try {
        const res = await this.updateCartAPI("Item added to cart"); // Update cart in the API
        return res; // Return response
      } catch (error) {
        console.error("Error adding item to cart:", error); // Log any errors
      } finally {
        this.loadingProducts = this.loadingProducts.filter(
          (id) => id !== product.id
        ); // Clear loading state for this product
        this.saveTosessionStorage(); // Save updated cart to session storage
      }
    },

    // Update the quantity of an item in the cart
    async updateCart(product, quantity) {
      const cartItem = this.cart.find((item) => item.id === product.id);

      if (cartItem) {
        cartItem.quantity = quantity; // Update quantity
        cartItem.totalPrice = Number(
          // Update total price
          (cartItem.quantity * cartItem.price).toFixed(2)
        ); 
      }
        this.saveTosessionStorage(); // Save updated cart to session storage

      // try {
      //   // await this.updateCartAPI(); // Update cart in the API
      // } catch (error) {
      //   console.error("Error updating cart:", error); // Log any errors
      // }
    },

    async updateApiCart(product, quantity) {
      const cartItem = this.cart.find((item) => item.id === product.id);

      if (cartItem) {
        cartItem.quantity = quantity; // Update quantity
        cartItem.totalPrice = Number(
          // Update total price
          (cartItem.quantity * cartItem.price).toFixed(2)
        ); 
      }

      try {
        await this.updateCartAPI(); // Update cart in the API
        this.saveTosessionStorage(); // Save updated cart to session storage
      } catch (error) {
        console.error("Error updating cart:", error); // Log any errors
      }
    },

    // Increment the quantity of an item in the cart
    async incrementQuantity(product) {
      const cartItem = this.cart.find((item) => item.id === product.id);

      if (cartItem) {
        cartItem.quantity += 1; // Increment quantity
        cartItem.totalPrice = Number(
          (cartItem.quantity * cartItem.price).toFixed(2)
        ); // Update total price
      }

      try {
        await this.updateCartAPI(); // Update cart in the API
        this.saveTosessionStorage(); // Save updated cart to session storage
      } catch (error) {
        console.error("Error incrementing quantity:", error); // Log any errors
      }
    },

    // Decrement the quantity of an item in the cart
    async decrementQuantity(product) {
      const cartItem = this.cart.find((item) => item.id === product.id);

      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1; // Decrement quantity
        cartItem.totalPrice = Number(
          (cartItem.quantity * cartItem.price).toFixed(2)
        ); // Update total price
      }

      try {
        await this.updateCartAPI(); // Update cart in the API
        this.saveTosessionStorage(); // Save updated cart to session storage
      } catch (error) {
        console.error("Error decrementing quantity:", error); // Log any errors
      }
    },

    // Remove an item from the cart
    async removeFromCart(product) {
      this.cart = this.cart.filter((item) => item.id !== product.id); // Filter out the removed product

      try {
        const res = await this.updateCartAPI("Item removed from cart"); // Update cart in the API
        this.saveTosessionStorage(); // Save updated cart to session storage
        return res; // Return response
      } catch (error) {
        console.error("Error removing item from cart:", error); // Log any errors
      }
    },

    // Update the cart in the API
    async updateCartAPI(message) {
      if (!this.user) {
        setTimeout(() => {
          return {
            status: "success",
            message: message,
          };
        }, 1000);
      }; // Return if user is not logged in

      const cartData = this.cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      try {
        const res = await axios.put(
          `https://fakestoreapi.com/carts/${this.user?.id ? this.user.id : 1}`,
          {
            userId: this.user?.id ? this.user.id : 1,
            date: new Date(),
            products: cartData,
          }
        );

        console.log(res);
        if (message && res.status === 200) {
          return {
            status: "success",
            message: message,
          };
        }
      } catch (error) {
        console.error("Error updating cart:", error); // Log any errors
      }
    },

    // Product Management Logic
    async addProduct(newProduct) {
      try {
        const uniqueId = this.generateUniqueId(); // Generate a unique ID
        const productWithId = { id: uniqueId, ...newProduct }; // Combine new product with unique ID
        await axios.post('https://fakestoreapi.com/products', productWithId);
        this.products.push(productWithId); // Optionally add to local products array
        this.saveTosessionStorage(); // Save updated products to session storage
      } catch (error) {
        console.error('Error adding product:', error);
        throw new Error('Failed to add product'); // Rethrow error for handling in component
      }
    },
     // Function to generate a unique ID
     generateUniqueId() {
      let newId;
      do {
        newId = Math.floor(Math.random() * 10000); // Generate a random ID
      } while (this.products.some(product => product.id === newId)); // Ensure it's unique
      return newId; // Return the unique ID
    },

    async updateProduct(updatedProduct) {
      // console.log(id, updatedProduct, "Updated Product");
      try {
        const response = await axios.put(`https://fakestoreapi.com/products/${updatedProduct.id}`, updatedProduct);
        
        const index = this.products.findIndex(product => product.id === updatedProduct.id);
        
        if (index !== -1) {
          this.products[index] = updatedProduct; // Update the product in the state
          this.saveTosessionStorage(); // Save updated products to session storage
        }
      } catch (error) {
        this.error = 'Failed to update product';
      }
    },

    async deleteProduct(productId) {
      try {
        // Make DELETE request to delete the product from the FakeStoreAPI
        const res = await axios.delete(`https://fakestoreapi.com/products/${productId}`); // Send a DELETE request to remove the product
        this.products = this.products.filter((product) => product.id !== productId); // Remove the deleted product from the products array
        this.saveTosessionStorage(); // Save updated products to session storage
        return res; // Return response
      } catch (error) {
        console.error("Error deleting product:", error); // Log any errors
      }
    },

    // Handle user login
    async login(username, password) {
      try {
        const res = await axios.post("https://fakestoreapi.com/auth/login", {
          username,
          password,
        });

        this.token = res.data.token; // Save the token

        // Fetch user details using the token
        const userDetailsRes = await axios.get(
          "https://fakestoreapi.com/users/1",
          {
            headers: {
              Authorization: `Bearer ${this.token}`, // Include token in headers
            },
          }
        );

        this.user = userDetailsRes.data; // Save user details
        this.loginError = null; // Clear any previous login error

        // Fetch user's cart and products
        this.fetchCart();
        this.saveTosessionStorage(); // Save updated state to session storage
        if(this.products) return
        this.fetchProducts();
      } catch (error) {
        this.loginError =
          error.response?.data?.error || "Login failed. Please try again."; // Handle login errors
      }
    },

    // Handle user logout
    logout() {
      this.user = null; // Clear user state
      this.token = null; // Clear token
      this.cart = []; // Clear cart
      this.products = []; // Clear products
      this.clearsessionStorage(); // Clear session storage
    },
  },
});
