<script setup>
import { ref, watch } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { useStore } from '@/stores';
import { useToast } from 'primevue/usetoast';
const toast = useToast();

const props = defineProps(['modelValue', 'initialProduct']);
const emit = defineEmits(['update:modelValue', 'save']);

const store = useStore();
const isLoading = ref(false); // Loading state for save operation
const title = ref('');
const price = ref(0);
const description = ref('');
const image = ref('');
const category = ref('');

// Watch for initialProduct changes to populate fields
watch(() => props.initialProduct, (newProduct) => {
  if (newProduct) {
    title.value = newProduct.title;
    price.value = newProduct.price;
    description.value = newProduct.description;
    image.value = newProduct.image;
    category.value = newProduct.category;
  }
}, { immediate: true });

// Watch for dialog visibility to clear fields
watch(() => props.modelValue, (newVal) => {
  if (!newVal) {
    clearFields(); // Clear fields on dialog close
  }
});

// Function to clear form fields
const clearFields = () => {
  title.value = '';
  price.value = 0;
  description.value = '';
  image.value = '';
  category.value = '';
};

// Function to handle save action
const handleSave = async () => {
  isLoading.value = true; // Set loading state
  const product = {
    title: title.value,
    price: price.value,
    description: description.value,
    image: image.value,
    category: category.value
  };

  try {
    if (props.initialProduct?.id) {
      // Update existing product
      const updatedProduct = { id: props.initialProduct.id, ...product };
      await store.updateProduct(updatedProduct);
      toast.add({ severity: 'contrast', summary: '', detail: 'Product updated successfully', life: 3000 });
    } else {
      // Add new product
      await store.addProduct(product);
      toast.add({ severity: 'contrast', summary: '', detail: 'Product added successfully', life: 3000 });
    }
  } catch (error) {
    // Handle any errors that occur
    toast.add({ severity: 'error', summary: '', detail: 'Failed to save product', life: 3000 });
  } finally {
    isLoading.value = false; // Reset loading state
    emit('update:modelValue', false); // Close dialog
  }
};

// Function to handle dialog hide
const onDialogHide = () => {
  emit('update:modelValue', false);
  clearFields(); // Clear fields on dialog close
};
</script>

<template>
  <Dialog 
    :visible="modelValue" 
    modal 
    @update:visible="onDialogHide"
    @hide="onDialogHide"
    :closeOnEscape="true"
    :dismissableMask="true"
    style="width: 500px;"  
  >
    <template #container="{ closeCallback }">
      <div class="flex flex-col text-center px-8 py-8 gap-6 overflow-hidden">
        <h3>{{ props.initialProduct?.id ? 'Edit Product' : 'Add New Product' }} {{ props.initialProduct?.id }}</h3>
        <form @submit.prevent="handleSave">
          <div class="field">
            <input v-model="title" placeholder="Title" required />
          </div>
          <div class="field">
            <input type="number" v-model="price" placeholder="Price" required />
          </div>
          <div class="field">
            <textarea v-model="description" placeholder="Description" rows="4" style="height: 100px;" required></textarea>
          </div>
          <div class="field">
            <input v-model="image" placeholder="Image URL" required />
          </div>
          <div class="field">
            <select v-model="category">
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>
          <Button :label="isLoading ? 'Saving...' : 'Save'" :disabled="isLoading" type="submit" />
        </form>
      </div>
    </template>
  </Dialog>
</template>
  
<style scoped>
.dialog-content {
  max-height: 80vh; /* Adjust the maximum height as needed */
  overflow-y: auto; /* Enable vertical scrolling */
  padding: 16px; /* Optional padding */
}
  .field {
    margin: 10px 0;
    position: relative;
    font-size: 14px;
    width: 100%;
    text-overflow: ellipsis;
  }
  input,
  textarea,
  select {
    padding: 9px;
    font-size: 12px;
    width: 100%;
    outline: none;
    background: #fafafa;
    border-radius: 3px;
    border: 1px solid #efefef;
  }
  textarea {
    resize: vertical;
  }
  </style>
  