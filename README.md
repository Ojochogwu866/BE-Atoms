# Atoms E-commerce Backend

Atoms is an e-commerce backend built with TypeScript and Express.js. It provides a set of RESTful APIs for managing products, user authentication, and shopping cart functionality.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
  - [Product Routes](#product-routes)
  - [Cart Routes](#cart-routes)
  - [Authentication Routes](#authentication-routes)
- [Middleware](#middleware)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (signup, signin, superuser creation)
- Product management (CRUD operations)
- Shopping cart functionality
- Category-based product browsing
- Role-based access control

## Prerequisites

- Node.js (v18 or later recommended)
- npm
- TypeScript
- MongoDB (or your preferred database)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/Ojochogwu866/atoms.git
   cd atoms
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up your environment variables in a `.env` file:

   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Compile TypeScript:

   ```
   npm run build
   ```

5. Start the server:
   ```
   npm start
   ```

## Project Structure

```
src/
├── config/
│   ├── auth.ts
│   ├── database.ts
├── controllers/
│   ├── authControllers.ts
│   ├── cartControllers.ts
│   └── productControllers.ts
├── middlewares/
│   └── auth.ts
│   └── errorHandler.ts
│   └── rateLimiter.ts
│   └── validator.ts
├── routes/
│   ├── authRoutes.ts
│   ├── cartRoutes.ts
│   └── index.ts
│   └── productRoutes.ts
├── models/
│   ├── User.ts
│   ├── Product.ts
│   ├── Cart.ts
├── services/
│   ├── authService.ts
│   ├── productService.ts
│   ├── cartService.ts
├── utils/
│   ├── logger.ts
└── app.ts
```

## API Routes

### Product Routes

- `GET /products`: Get all products
- `GET /products/:id`: Get a specific product
- `GET /products/categories`: Get all categories
- `GET /products/category/:category`: Get products by category
- `POST /products`: Create a new product (Admin/Superuser only)
- `PATCH /products/:id`: Update a product (Admin/Superuser only)
- `DELETE /products/:id`: Delete a product (Admin/Superuser only)

### Cart Routes

- `GET /cart`: Get the user's cart
- `POST /cart/add`: Add a product to the cart
- `DELETE /cart/remove/:productId`: Remove a product from the cart
- `DELETE /cart/clear`: Clear the entire cart

### Authentication Routes

- `POST /auth/signup`: User registration
- `POST /auth/signin`: User login
- `POST /auth/superuser`: Create a superuser

## Middleware

- `authMiddleware`: Ensures that the user is authenticated
- `restrictTo`: Restricts access to specific user roles

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
