level-2-Assignment-2


This project is a backend application for product inventory and order management built using Node.js, TypeScript, Express, and MongoDB. It is designed to provide a RESTful API for managing products, placing orders, and calculating revenues, ensuring scalability and performance.

.....................................................................................................................

Features
Product Management
...................
Create, retrieve, update, and delete products.
Search for products by name, brand, or category.
Manage product stock quantities and availability status.


Order Management
...................
Place orders, ensuring inventory validation.
Calculate total revenue from all completed orders.
Fetch details and summaries of all orders


Product Management APIs
Create Product

Endpoint: POST /api/products/create
Purpose: Adds a new product to inventory with details like name, price, category, and stock.
Usage: Used by admins to manage inventory.
Retrieve All Products

Endpoint: GET /api/products
Purpose: Fetches a list of all products.
Search: Supports filtering by name, brand, or category using the searchTerm query parameter.
Retrieve Single Product

Endpoint: GET /api/product/:productId
Purpose: Provides detailed information about a specific product.
Update Product

Endpoint: PUT /api/product/:productId
Purpose: Updates an existing product’s details, like price or stock.
Delete Product

Endpoint: DELETE /api/product/:productId
Purpose: Removes a product permanently from the inventory.
Order Management APIs
Create Order

Endpoint: POST /api/order
Purpose: Places an order, validates stock, updates inventory, and calculates the total price.
Retrieve All Orders

Endpoint: GET /api/orders/count-details
Purpose: Fetches all orders, including total count and details.
Calculate Revenue

Endpoint: GET /api/orders/revenue
Purpose: Calculates total revenue from all completed orders.
























├── src/
│   ├── config/
│   │   └── index.ts          # Environment configuration loader
│   ├── module/
│   │   ├── order/
│   │   │   ├── order.controller.ts  # Order-related API endpoints
│   │   │   ├── order.service.ts     # Business logic for orders
│   │   │   ├── order.model.ts       # MongoDB schema for orders
│   │   │   ├── order.route.ts       # Routes for order APIs
│   │   ├── product/
│   │   │   ├── product.controller.ts # Product-related API endpoints
│   │   │   ├── product.service.ts    # Business logic for products
│   │   │   ├── product.model.ts      # MongoDB schema for products
│   │   │   ├── product.route.ts      # Routes for product APIs
│   ├── app.ts                # Main Express application
│   └── server.ts             # Server entry point
├── package.json              # Node.js dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── .env                      # Environment variables (not included in repo)
└── README.md                 # Documentation (this file)
