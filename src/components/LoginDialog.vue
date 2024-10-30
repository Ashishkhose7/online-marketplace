<script setup>
import { ref, watch } from 'vue';  // Import necessary Vue features
import Dialog from 'primevue/dialog';  // Import PrimeVue Dialog component
import Button from 'primevue/button';  // Import PrimeVue Button component
import { useStore } from '@/stores';  // Import the store for state management

// Define props to accept modelValue for controlling dialog visibility

const  props   = defineProps(['modelValue'])

// Initialize store and reactive state for login
const store = useStore();
const isLoading = ref(false);  // Track loading state
const username = ref('');  // Reactive reference for username input
const password = ref('');  // Reactive reference for password input

// Define emits for communication with parent component
const emit = defineEmits(['update:modelValue']);

// Create a reactive reference for dialog visibility
const visible = ref(props.modelValue);

// Watch for changes in modelValue and update the visible reference
watch(() => props.modelValue, newVal => {
  visible.value = newVal;
});

// Watch for changes in visible reference and emit updates to parent
watch(visible, newVal => {
  emit('update:modelValue', newVal);
});

// Function to handle the login process
const handleLogin = async () => {
  isLoading.value = true;  // Set loading state to true
  await store.login(username.value, password.value);  // Attempt to login using store
  if (!store.loginError) {
    // If login is successful, close the dialog and reset loading state
    visible.value = false;
    isLoading.value = false;
  } else {
    // If there's an error, just reset the loading state
    isLoading.value = false;
  }
};

// Function to handle dialog close event
const onDialogHide = () => {
  visible.value = false;  // Set visible to false when dialog is hidden
};
</script>

<template>
  <!-- Handle dialog visibility update -->
  <!-- Handle dialog hide event -->
  <Dialog 
    :visible="visible" 
    modal 
    @update:visible="onDialogHide"  
    @hide="onDialogHide" 
    :closeOnEscape="true"
    :dismissableMask="true"
    pt:root:class="!border-0 !bg-transparent" 
    pt:mask:class="backdrop-blur-sm">
      
    <template #container="{ closeCallback }">
      <div class="flex flex-col text-center px-8 py-8 gap-6 rounded-2xl" style="background-color: white;">
        <!-- Icon representing a lock for the login dialog -->
        <i class='bx bx-lock-alt text-2xl'></i>
        <div>
          <form class="login-form" @submit.prevent="handleLogin">  <!-- Prevent default form submission -->
            <div class="field">
              <!-- Bind username input to reactive reference -->
              <!-- Input type for username -->
              <input 
                id="username" 
                type="text"  
                placeholder="Phone number, username, or email" 
                v-model="username"
                required  
              />
            </div>
            <div class="field">
              <!-- Bind password input to reactive reference -->
              <input 
                id="password" 
                type="password" 
                placeholder="password" 
                v-model="password"
                required 
              />
            </div>
            <div class="separator">
              <div class="line"></div>  <!-- Visual separator line -->
              <p>OR</p>  <!-- Alternative login option -->
              <div class="line"></div>
            </div>
            <div class="other">
              <!-- Button for logging in with Google -->
              <button class="fb-login-btn" type="button">
                <i class="fa fa-facebook-official fb-icon"></i>
                <span>Log in with Google</span>
              </button>
              <a class="forgot-password" href="#">Forgot password?</a>  <!-- Link to password recovery -->
            </div>
            <div class="mt-6">
              <!-- Conditional label based on loading state -->
              <!-- Disable button during loading -->
              <Button 
              :label="isLoading ? 'Logging In' : 'Log In'"  
                :disabled="isLoading"  
                type="submit"
                class="!p-1 w-full !bg-blue-500 !text-white !border !border-white/30 hover:!bg-blue-600 flex justify-center items-center"
              >
                <template v-if="isLoading">
                  <span class="loading-dots p-0 m-0">  <!-- Loading animation dots -->
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                </template>
              </Button>
            </div>
          </form>
          <!-- Display login error message if it exists -->
          <p v-if="store.loginError" class="error mt-4 text-xs text-red-600">{{ store.loginError }}</p>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
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

.forgot-password {
  font-size: 11px;
  color: #003569;
}
</style>
