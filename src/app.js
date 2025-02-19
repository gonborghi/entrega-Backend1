import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import http from "http";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./ProductManager.js";


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


const PORT = 8080;

app.use(express.json());
app.use(express.static("public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

const productManager = new ProductManager("./src/data/products.json");
io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");

    socket.on("newProduct", async(productData) => {
        try {
            const newProduct = await productManager.addProduct(productData);
            io.emit("productAdded", newProduct);
        } catch (error) {
            console.error("Error añadiendo producto", error.message)
        }
    })
})

server.listen(PORT, ()=> console.log(`Servidor iniciado en: http://localhost:${PORT}`) );