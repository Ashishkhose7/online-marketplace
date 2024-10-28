<script setup>
import { useStore } from '@/stores';
import { useToast } from 'primevue/usetoast';
import { ref, computed, onMounted, watch } from 'vue'
import AddProductDialog from '@/components/AddProductDialog.vue';
import ProgressSpinner from 'primevue/progressspinner';
import Skeleton from 'primevue/skeleton';

const toast = useToast();
const store = useStore(); // Accessing the store for managing product data

// Table headers configuration for product listing
const tableHeaders = [
  { key: 'image', label: 'Image', sortable: false },
  { key: 'title', label: 'Title', sortable: true },
  { key: 'category', label: 'Category', sortable: true },
  { key: 'price', label: 'Price', sortable: true },
  { key: 'description', label: 'Description', sortable: false },
  { key: 'actions', label: 'Actions', sortable: false }
]

// State variables for searching and filtering products
const searchQuery = ref('') // Bindable input for product search
const selectedCategory = ref('') // Selected category for filtering
const sortKey = ref('title') // Current sorting key
const sortOrder = ref('asc') // Current sorting order
const showDeleteModal = ref(false) // State to toggle delete confirmation modal
const productToDelete = ref(null) // Product to be deleted
const expandedDescriptions = ref(new Set()); // Track expanded description IDs
const isLoading = ref(false); // Loading indicator
const showAddProductDialog = ref(false);
const selectedProduct = ref(null);
const loading = ref(false);

// Fetch products on component mount
onMounted(async()=>{
  loading.value = true;
  const res = await store.fetchProducts(); // Fetch products from the store
  if(res?.status === 200){
    loading.value = false;
  }else{
    loading.value = false;
  }
})

// Computed property to derive unique categories from products
const categories = computed(() => {
  const uniqueCategories = new Set(store.products.map(p => p.category))
  return Array.from(uniqueCategories) // Convert Set to Array
})

// Computed property for filtered and sorted products
const filteredAndSortedProducts = computed(() => {
  let filtered = store.products // Start with the complete product list

  // Apply search filter if query exists
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(product => 
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    )
  }

  // Apply category filter if selected
  if (selectedCategory.value) {
    filtered = filtered.filter(product => 
      product.category === selectedCategory.value
    )
  }

  // Apply sorting logic based on sortKey and sortOrder
  return filtered.sort((a, b) => {
    let aValue = a[sortKey.value]
    let bValue = b[sortKey.value]
    
    // Handle string and number comparisons
    if (typeof aValue === 'string') {
      const comparison = aValue.localeCompare(bValue)
      return sortOrder.value === 'asc' ? comparison : -comparison
    }
    
    const comparison = aValue - bValue
    return sortOrder.value === 'asc' ? comparison : -comparison
  })
})

// Method to format price to two decimal places
const formatPrice = (price) => price.toFixed(2)

// Method to handle sorting by a specific key
const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc' // Toggle order if same key is clicked
  } else {
    sortKey.value = key
    sortOrder.value = 'asc' // Default to ascending order for new key
  }
}

// Method to handle modification of a product
const handleModify = (product) => {
  selectedProduct.value = { ...product }; // Clone the product to avoid direct mutations
  showAddProductDialog.value = true; // Show the edit dialog
};

// Method to confirm deletion of a product
const confirmDelete = (product) => {
  productToDelete.value = product // Store the product to delete
  showDeleteModal.value = true // Show the confirmation modal
}

// Method to handle deletion of the confirmed product
const handleDelete = async () => {
  if (productToDelete.value) {
    isLoading.value = true // Show loading indicator
    const res = await store.deleteProduct(productToDelete.value.id)
    showDeleteModal.value = false // Hide the modal
    productToDelete.value = null // Reset the product reference
    if (res.status === 200) {
      isLoading.value = false // Hide loading indicator
      toast.add({ severity: 'contrast', summary: '', detail: 'Product Deleted', life: 3000 });
    }
  }
}

// Method to toggle description visibility
const toggleDescription=(id) => {
  if (expandedDescriptions.value.has(id)) {
    expandedDescriptions.value.delete(id);
  } else {
    expandedDescriptions.value.add(id);
  }
}

// Method to check if description is expanded
const isDescriptionExpanded=(id) => {
  return expandedDescriptions.value.has(id);
}

</script>

<template>
  <section>
      <div class="p-4 container section__prod text-base">
      <!-- Search and Filters -->
      <div class="mx-3 sm:mx-0 mb-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
        <!-- Search Input -->
        <div class="relative flex-1 max-w-sm">
          <input 
            v-model="searchQuery"
            type="search"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Search products..."
          >
          <div class="absolute left-3 top-2.5 text-gray-400 cursor-pointer">
            <!-- Search Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div class="flex items-center">
          <!-- Category Filter -->
            <select 
            v-model="selectedCategory"
            class="xs:w-full w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category" class="">
              {{ category }}
            </option>
          </select>
          <button @click="handleModify" class="text-blue-500 ml-6 text-3xl hover:text-blue-800"><i class='bx bxs-plus-circle'></i></button>
        </div>
       </div>
  
      <!-- Desktop and Tablet View -->
      <div class="hidden sm:block overflow-x-auto bg-white rounded-lg shadow">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-50">
              <th v-for="header in tableHeaders" 
                  :key="header.key"
                  :class="['p-4 text-center text-sm font-medium text-gray-700', 
                           header.key === 'actions' ? 'text-center' : '']"
                  @click="header.sortable ? sortBy(header.key) : null"
                  :style="header.sortable ? 'cursor: pointer' : ''"
              >
                <div class="flex items-center space-x-1">
                  <span>{{ header.label }}</span>
                  <span v-if="header.sortable" class="text-gray-400">
                    <template v-if="sortKey === header.key">
                      {{ sortOrder === 'asc' ? '↑' : '↓' }}
                    </template>
                    <template v-else>↕</template>
                  </span>
                </div>
              </th>
            </tr>
          </thead>
      <tbody>
      <template v-if="loading">
        <tr v-for="n in 8">
          <td colspan="6" class="text-center py-4">
            <div class="flex justify-between" >
              <Skeleton class="w-28 h-24" />
              <Skeleton class="w-[280px] h-6" />
              <Skeleton class="w-[100px] h-6" />
              <Skeleton class="w-[100px] h-6" />
              <Skeleton class="w-[200px] h-6" />
              <Skeleton class="w-[80px] h-6" />
            </div>
          </td>
        </tr>
      </template>
      <template v-else-if="filteredAndSortedProducts.length === 0">
        <tr>
          <td colspan="6" class="text-center py-4">
            <p class="text-gray-700">No products available.</p>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="product in filteredAndSortedProducts" :key="product.id" class="border-t hover:bg-gray-50 transition-colors duration-150 h-[20px]">
          <td class="p-3 w-[120px]">
            <img :src="product.image" :alt="product.title" class="w-28 h-24 rounded-lg">
          </td>
          <td class="p-3 w-[280px] font-medium text-gray-900 text-base">{{ product.title }}</td>
          <td class="p-3 w-[100px] text-gray-700 capitalize">{{ product.category }}</td>
          <td class="p-3 w-[100px] text-gray-700">&#8377{{ formatPrice(product.price) }}</td>
          <td class="p-3 w-[200px] text-gray-700 max-w-xs">
            <div class="description">
              <div v-if="!isDescriptionExpanded(product.id)" class="truncate-description">
                {{ product.description.split('\n').slice(0, 2).join('\n') }}...
              </div>
              <div v-else class="full-description">{{ product.description }}</div>
              <button @click="toggleDescription(product.id)" class="text-blue-500 text-xs hover:border-b-2">
                {{ isDescriptionExpanded(product.id) ? 'See Less' : 'See More' }}
              </button>
            </div>
          </td>
          <td class="p-4 text-center w-[80px]">
            <div class="flex justify-center space-x-2">
              <button @click="handleModify(product)" class="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors duration-150">
                <!-- Edit Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button @click="confirmDelete(product)" class="p-1 text-red-600 hover:bg-red-50 rounded transition-colors duration-150">
                <!-- Delete Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
    </table>
      </div>
      <AddProductDialog 
        v-model="showAddProductDialog"
        :initialProduct="selectedProduct"
        />

        <!-- Mobile View -->
      <div class="sm:hidden space-y-4">
        <div v-for="product in filteredAndSortedProducts" 
             :key="product.id" 
             class="bg-white rounded-lg shadow p-4 space-y-3">
          <div class="flex items-center space-x-4">
            <img :src="product.image" 
                 :alt="product.title" 
                 class="w-20 h-20 object-cover rounded-lg">
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-gray-900 truncate">{{ product.title }}</h3>
              <p class="text-sm text-gray-700">{{ product.category }}</p>
              <p class="text-lg font-medium text-gray-900">&#8377{{ formatPrice(product.price) }}</p>
            </div>
          </div>
          <p class="text-sm text-gray-700 line-clamp-2">{{ product.description }}</p>
          <div class="flex justify-end space-x-2 pt-2 border-t">
            <button @click="handleModify(product)" 
                    class="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors duration-150">
              Edit
            </button>
            <button @click="confirmDelete(product)" 
                    class="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors duration-150">
              Delete
            </button>
          </div>
        </div>
      </div>
  
      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" 
           class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg p-6 max-w-sm w-full">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
          <p class="text-gray-700 mb-6">
            Are you sure you want to delete "{{ productToDelete?.title }}"? This action cannot be undone.
          </p>
          <div class="flex justify-end space-x-3">
            <button @click="showDeleteModal = false"
                    class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150">
              Cancel
            </button>
            <button @click="handleDelete"
                    class="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors duration-150"
                   :disabled="isLoading" 
                    >              
                <span v-if="isLoading">
                  <span class="loading-dots p-0 m-0 inline-block">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
              </span>
              <span v-else>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  </template>
<style scoped>
.truncate-description {
  max-height: 3.6em; /* Approx. 2 lines (assuming line height of 1.8em) */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  -webkit-box-orient: vertical;
}

.full-description {
  white-space: normal; /* Allow normal wrapping */
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