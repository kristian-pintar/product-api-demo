# 🛍️ TypeScript Product API

REST API for managing products in an e-commerce platform.

## Tech Stack
- Node.js
- Express
- TypeScript

## Database
- src/db/products.json

## Endpoints

1) GET /products
Get all products

`curl http://localhost:3000/products`

2) Optional filter ?category=
Get all products from category

`curl http://localhost:3000/products?category=electronics`

3) GET /products/:id
Get a single product by ID

`curl http://localhost:3000/products/1`

4) POST /products
Add a new product

`curl -X POST http://localhost:3000/products \`
`  -H "Content-Type: application/json" \`
`  -d '{"title":"...","price": 1,"description":"...","category":"...","image":"...","rating":{"rate":1,"count":1}}'`

## Installation:

# Install dependencies
npm install

# Start in dev mode
npm run dev

# OR build and run
npm run build
npm start
