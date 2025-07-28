import express, { Request, Response } from "express";
import { Product } from "../models/Product";
import { promises as fs } from "fs";
import path from "path";

const router = express.Router();
const dbPath = path.join(__dirname, "../db/products.json");

const readProducts = async (): Promise<Product[]> => {
  const data = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(data);
};

const writeProducts = async (products: Product[]): Promise<void> => {
  await fs.writeFile(dbPath, JSON.stringify(products, null, 2));
};

function validateProduct(data: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];

  if (typeof data.title !== "string" || data.title.trim() === "") {
    errors.push("Invalid or missing 'title'");
  }
  if (typeof data.price !== "number" || data.price <= 0) {
    errors.push("Invalid or missing 'price'");
  }
  if (typeof data.description !== "string") {
    errors.push("Invalid or missing 'description'");
  }
  if (typeof data.category !== "string") {
    errors.push("Invalid or missing 'category'");
  }
  if (typeof data.image !== "string" || !data.image.startsWith("http")) {
    errors.push("Invalid or missing 'image'");
  }
  if (
    typeof data.rating !== "object" ||
    typeof data.rating.rate !== "number" ||
    typeof data.rating.count !== "number"
  ) {
    errors.push("Invalid or missing 'rating'");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

router.get("/", async (req: Request, res: Response) => {
  const products = await readProducts();
  const category = req.query.category as string;

  if (category) {
    const filtered = products.filter((p) =>
      p.category.toLowerCase() === category.toLowerCase()
    );
    return res.json(filtered);
  }

  res.json(products);
});

router.get("/:id", async (req: Request, res: Response) => {
  const products = await readProducts();
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

router.post("/", async (req: Request, res: Response) => {
  const { valid, errors } = validateProduct(req.body);

  if (!valid) {
    return res.status(400).json({ error: "Validation failed", details: errors });
  }

  const products = await readProducts();
  const newProduct: Product = {
    ...req.body,
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1
  };

  products.push(newProduct);
  await writeProducts(products);
  res.status(201).json(newProduct);
});

export default router;
