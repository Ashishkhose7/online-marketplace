# online-marketplace

## Summary of Implementation

### 1. User Authentication
- Implemented user authentication using tokens provided by **FakeStoreAPI**.
- The **login component** handles user authentication and updates the user state upon successful login.
- Authentication status is checked for protected routes using **Vue Router's navigation guards**, ensuring only authenticated users can access certain pages.

### 2. Design Concept
- The platform features a **clean, responsive, and user-friendly design**.
- Utilizes **Tailwind CSS** for styling, ensuring the application is visually appealing and functions well across different devices.

### 3. Product Management
- Products can be managed using **FakeStoreAPI**.
- Capabilities include adding new products, updating existing ones, and deleting products.
- The product management component includes forms for adding and editing products, with fields for title, price, description, image URL and category.

### 4. Cart Management
- Cart management functionality includes:
  - Adding, updating, and deleting products from the cart.
  - Calculating the total amount based on items in the cart.
- Validation ensures that the quantity of cart items never goes below **1**.

### 5. Scalability and Fault Tolerance
- Utilized **Pinia** for state management to ensure efficient state handling as the application grows.
- Implemented error handling using **try-catch blocks** for API requests to manage potential faults effectively.


This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
