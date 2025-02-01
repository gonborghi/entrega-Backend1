import fs from "fs";

class ProductManager{
  constructor(pathFile){
    this.pathFile = pathFile;
  }

  getProducts = async() => {
    try {
      const fileData = await fs.promises.readFile(this.pathFile, 'utf-8');
      const data = JSON.parse(fileData);
      return data;
    } catch (error) {
      throw new Error(`Error al leer el archivo de productos: ${error.message}`)
    }
  }
}

export default ProductManager;