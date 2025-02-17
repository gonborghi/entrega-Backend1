import express from "express";
import ProductManager from "../ProductManager.js";

const productsRouter = express.Router();
const productManager = new ProductManager("./src/data/products.json");

productsRouter.get("/", async(req, res) => {
  try {
    const data = await productManager.get();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productManager.get(parseInt(id));
    if (!product) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await productManager.addProduct(productData);
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productsRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedProduct = await productManager.put(parseInt(id), updatedData);
    if (!updatedProduct) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productManager.deleteProduct(id);
    if (!deletedProduct) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }
    res.status(200).send({ message: "Producto eliminado con éxito", deletedProduct });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default productsRouter;
