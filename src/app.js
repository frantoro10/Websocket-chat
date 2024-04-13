const express = require("express");
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const app = express();
const PORT = 8080;

// Middleware
app.use(express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Configuramos handlebars:
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// endpoints

app.get("/", (req,res) => {
    res.render("index"); 
})

// Almacenamos en una constante el servidor, para poder utilizarlo con socket
const httpServer = app.listen(PORT, () => {
    console.log(`Listening: ${PORT} `);
})

// Se genera una instancia de socket.io, del lado del backend.

const io = new socket.Server(httpServer);

let messages = [];

// Se establece la conexion de socket.

io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");
   //message es simplemente una convención de nombre de evento que puedes usar para enviar datos entre el cliente y el servidor.
    socket.on("message", data => {
        console.log(data);
        messages.push(data);
        console.log(messages);
        //Emitimos el mensaje para el cliente, con todo el array de mensajes, para que este los renderice y se vean el chat.
        io.emit("messagesLogs", messages);
    })
});

