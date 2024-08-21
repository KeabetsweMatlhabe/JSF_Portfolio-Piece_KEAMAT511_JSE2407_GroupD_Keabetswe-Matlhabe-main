# Vue.js Shopping Cart Application
This project is a modern shopping cart application built using Vue.js. It features JWT-based authentication, product filtering, searching, and a responsive design using Tailwind CSS. The application is designed to provide a seamless shopping experience, with functionalities such as product management, cart handling, and persistent cart storage using local storage.

## Features:
- JWT Authentication: Secure login and authentication with JSON Web Tokens (JWT), ensuring that only authenticated users can access the cart.
- Product Filtering & Searching: Users can filter products by category and search for specific products using a dynamic search bar.
- Cart Management: Add, update, and remove products in the cart with real-time updates to cart totals and item counts.
- Responsive Design: The application is fully responsive, ensuring a great user experience on both desktop and mobile devices.
- Persisted Cart State: The cart's state is saved in local storage, so users can resume their shopping experience even after closing the browser.


## Technologies Used
- Vue.js: A progressive JavaScript framework for building user interfaces.
- Vue Router: The official router for Vue.js, used to create single-page applications.
- Axios: A promise-based HTTP client for making API requests.
- Vite: A fast and modern build tool for web projects.
- Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.
- PostCSS: A tool for transforming CSS with JavaScript plugins.
- Autoprefixer: A PostCSS plugin to parse CSS and add vendor prefixes to CSS rules.
- Vue Router: For handling page navigation within the application.
- Pinia: A lightweight state management library, used for managing global application state.

## Authentication
- Users can log in with a username and password.
- On successful login, a JWT token is stored in Local Storage to manage session persistence.
- The Login.vue component handles the login functionality and redirects the user to the homepage on successful authentication.
- Pinia for State Management
- Cart Store (useCartStore)
State:
  - allCartItems: Stores all cart items, keyed by user ID.
  - isLoggedIn: Tracks the user's authentication status based on the presence of a JWT.
Getters:
  - cartItems: Filters and returns cart items specific to the logged-in user.
  - cartCount: Computes the total number of items in the cart.
  - totalItems: Returns the total number of unique items in the cart.
  - totalCost: Calculates the total cost of the items in the cart.
Actions:
  - addToCart(product): Adds a product to the cart or increases its quantity if already present.
  - removeFromCart(productId): Removes a specific product from the cart.
  - updateCart(productId, quantity): Updates the quantity of a specific product in the cart.
  - clearCart(): Clears all items from the cart for the current user.
  - login(jwt): Stores the JWT and sets the isLoggedIn state to true.
  - logout(): Clears the JWT, resets the isLoggedIn state, and clears the cart.


## Usage
- Authentication: Users must log in to access and manage their shopping cart.
- Filter Products: Use the dropdown menu to filter products by category.
- Search Products: Use the search bar to find products by name.
- Cart Management: Add products to the cart, adjust quantities, and remove items as needed.
- Cart Persistence: The cart's state is automatically saved and will persist across sessions.

## Hosted Application
- https://swiftcart-store-chi.vercel.app/login


### Getting Started

- npm install
- npm run dev
- Open your browser and go to http://localhost:5174/.
  
