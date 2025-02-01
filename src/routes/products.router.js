import express from "express";
import ProductManager from "../ProductManager.js";

const productsRouter = express.Router();
const productManager = new ProductManager("./src/data/produc.json");

productsRouter.get("/", async(req, res)=> {
  try {
    const data = await productManager.getProducts();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

export default productsRouter;