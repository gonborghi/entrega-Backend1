import fs from "fs";

class ProductManager {
  constructor(pathFile) {
    this.pathFile = pathFile;
  }

  get = async (id) => {
    try {
      const products = await this.getProducts();
      if (id) {
        const product = products.find(p => p.id == id);
        return product || null;
      }
      return products;
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  };
  
  put = async (id, updatedData) => {
    try {
      const products = await this.getProducts();
      const index = products.findIndex(p => p.id == id);
      if (index === -1) {
        return null;
      }
      const updatedProduct = { ...products[index], ...updatedData };
      products[index] = updatedProduct;
      await fs.promises.writeFile(this.pathFile, JSON.stringify(products, null, 2));
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  };
  
  

  getProducts = async () => {
    try {
      const fileData = await fs.promises.readFile(this.pathFile, 'utf-8');
      const data = JSON.parse(fileData);
      return data;
    } catch (error) {
      throw new Error(`Error al leer el archivo de productos: ${error.message}`);
    }
  };

  getProductById = async (id) => {
    try {
      const products = await this.getProducts();
      const product = products.find(p => p.id == id);
      return product || null;
    } catch (error) {
      throw new Error(`Error al obtener el producto por ID: ${error.message}`);
    }
  };

  addProduct = async (productData) => {
    try {
      const products = await this.getProducts();
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      const newProduct = { id: newId, ...productData };
      products.push(newProduct);
      await fs.promises.writeFile(this.pathFile, JSON.stringify(products, null, 2));
      return newProduct;
    } catch (error) {
      throw new Error(`Error al agregar el producto: ${error.message}`);
    }
  };

  updateProduct = async (id, updatedData) => {
    try {
      const products = await this.getProducts();
      const index = products.findIndex(p => p.id == id);
      
      if (index === -1) {
        return null;
      }

      const updatedProduct = { ...products[index], ...updatedData };
      products[index] = updatedProduct;
      await fs.promises.writeFile(this.pathFile, JSON.stringify(products, null, 2));
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  };

  deleteProduct = async (id) => {
    try {
      const products = await this.getProducts();
      const index = products.findIndex(p => p.id == id);

      if (index === -1) {
        return null;
      }

      const [deletedProduct] = products.splice(index, 1);
      await fs.promises.writeFile(this.pathFile, JSON.stringify(products, null, 2));
      return deletedProduct;
    } catch (error) {
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    }
  };
}

export default ProductManager;
