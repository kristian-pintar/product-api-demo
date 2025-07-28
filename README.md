# TypeScript Product API

REST API for managing products in an e-commerce platform.

## Postman documentation
https://productapi-9986.postman.co/workspace/ProductAPI~7c945dfa-0652-4131-8001-0638ba612ff6/collection/19358439-1a919060-69a4-4a05-83d9-bbddecf5f330?action=share&source=copy-link&creator=19358439

## Tech Stack
- Node.js
- Express
- TypeScript

## Database
- src/db/products.json

## Endpoints

GET /products (get all products)

`curl http://localhost:3000/products`

GET /products?category= (get all products from category)

`curl http://localhost:3000/products?category=electronics`

GET /products/:id (get a single product by ID)

`curl http://localhost:3000/products/1`

POST /products (add a new product)

`curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{"title":"...","price": 1,"description":"...","category":"...","image":"...","rating":{"rate":1,"count":1}}'`

## Installation:

#### Install dependencies
`npm install`

#### Start in dev mode
`npm run dev`

#### Or build and run
`npm run build`

`npm start`
