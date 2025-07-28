import express from "express";
import productsRouter from "./routes/products";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/products", productsRouter);
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
