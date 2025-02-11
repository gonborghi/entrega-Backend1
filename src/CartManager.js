import fs from "fs";

class CartManager {
  constructor(pathFile) {
    this.pathFile = pathFile;
  }

  getCarts = async () => {
    try {
      const fileData = await fs.promises.readFile(this.pathFile, 'utf-8');
      const data = JSON.parse(fileData);
      return data;
    } catch (error) {
      throw new Error(`Error al leer el archivo de carritos: ${error.message}`);
    }
  };

  addCart = async () => {
    try {
      const carts = await this.getCarts();
      const newId = carts.length > 0 ? Math.max(...carts.map(c => c.id)) + 1 : 1;
      const newCart = { id: newId, products: [] };
      carts.push(newCart);

      await fs.promises.writeFile(this.pathFile, JSON.stringify(carts, null, 2));
      return newCart;
    } catch (error) {
      throw new Error(`Error al agregar el carrito: ${error.message}`);
    }
  };

  getCartById = async (id) => {
    try {
      const carts = await this.getCarts();
      const cart = carts.find(c => c.id === id);
      return cart || null;
    } catch (error) {
      throw new Error(`Error al obtener el carrito por ID: ${error.message}`);
    }
  };

  addProductInCartById = async (cartId, productId) => {
    try {
      const carts = await this.getCarts();
      const cart = carts.find(c => c.id === cartId);

      if (!cart) {
        return null;
      }

      const productIndex = cart.products.findIndex(p => p.id === productId);
      if (productIndex === -1) {
        cart.products.push({ id: productId, quantity: 1 });
      } else {
        cart.products[productIndex].quantity += 1;
      }

      await fs.promises.writeFile(this.pathFile, JSON.stringify(carts, null, 2));
      return cart;
    } catch (error) {
      throw new Error(`Error al agregar el producto al carrito: ${error.message}`);
    }
  };
}

export default CartManager;
