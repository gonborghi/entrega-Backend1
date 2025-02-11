import express from "express";
import CartManager from "../CartManager.js";

const cartRouter = express.Router();
const cartManager = new CartManager("./src/data/cart.json");

cartRouter.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.status(200).send(carts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

cartRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await cartManager.getCartById(id);
    if (!cart) {
      return res.status(404).send({ message: "Carrito no encontrado" });
    }
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).send(newCart);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

cartRouter.post("/:cartId/productos", async (req, res) => {
  try {
    const { cartId } = req.params;
    const product = req.body;
    const updatedCart = await cartManager.addProductToCart(cartId, product);
    if (!updatedCart) {
      return res.status(404).send({ message: "Carrito no encontrado" });
    }
    res.status(200).send(updatedCart);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

cartRouter.delete("/:cartId/productos/:productId", async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const updatedCart = await cartManager.removeProductFromCart(cartId, productId);
    if (!updatedCart) {
      return res.status(404).send({ message: "Carrito o producto no encontrado" });
    }
    res.status(200).send(updatedCart);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

cartRouter.delete("/:cartId", async (req, res) => {
  try {
    const { cartId } = req.params;
    const result = await cartManager.clearCart(cartId);
    if (!result) {
      return res.status(404).send({ message: "Carrito no encontrado" });
    }
    res.status(200).send({ message: "Carrito vaciado correctamente" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default cartRouter;
