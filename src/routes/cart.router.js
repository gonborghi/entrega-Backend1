import express from "express";
import CartManager from "../CartManager.js";

const cartRouter = express.Router();
const cartManager = new CartManager("./src/data/cart.json");

export default cartRouter;
