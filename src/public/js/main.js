// Creamos instancia socket desde el lado del cliente.

const socket = io();

// Crear variable para guardar al usario.

let user;
const chatBox = document.getElementById("chatBox");

// Sweet alert para bienvenida.

Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingresa un usuario para identificarte en el chat",
    inputValidator: (value) => {
        return !value && "Necesitas escribir un nombre para continuar";
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    console.log(user);
})

chatBox.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        if(chatBox.value.trim().length > 0){
            // Trim se utiliza para sacar los espacios en blanco del principio y del final de un string.
            // Si el mensaje tiene mas de 0 caracteres, lo enviamos al servidor.
            socket.emit("message", {user: user, message: chatBox.value});
            chatBox.value = ""; 
        }
    }
})

// Listener de mensajes.

socket.on("messagesLogs", data => {
    const log = document.getElementById("messagesLogs");
    let allMessages = "";
    //Data representa los datos que se reciben junto al evento message. Desde el lado del servidor, enviamos un array con los mensajes.
    data.forEach(message => {
        allMessages = allMessages + `${message.user} says: ${message.message} <br>`
    })
    log.innerHTML = allMessages;
})