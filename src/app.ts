import WebSocket, { WebSocketServer } from "ws";

//* Crear un servidor de WebSocket con el puerto 3000
const wss = new WebSocketServer({ port: 3000 });

//* Escuchar eventos de conexión, mensaje y cierre de conexión
wss.on("connection", function connection(ws) {
  console.log("Client connected");

  //* Escuchar eventos de error
  ws.on("error", console.error);

  //* Escuchar eventos de mensaje
  ws.on("message", function message(data) {
    const payload = JSON.stringify({
      type: "custom-message",
      payload: data.toString(),
    });

    //? 'wss.clients' es un conjunto de clientes conectados al servidor WebSocket
    
    //* Enviar un mensaje a todos los clientes conectados incluyendo el cliente que envió el mensaje
    /* wss.clients.forEach((client) => {
      //* Si el cliente está conectado, enviar el mensaje 
      if (client.readyState === WebSocket.OPEN) {
        //* Enviar el mensaje al cliente conectado  
        client.send(payload,{binary: false});
      }
    }); */

    //* Enviar un mensaje a todos los clientes conectados excluyendo el cliente que envió el mensaje 
    wss.clients.forEach((client) => {
      //* Si el cliente está conectado y no es el cliente que envió el mensaje
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        //* Enviar el mensaje al cliente conectado
        client.send(payload, { binary: false });
      }
    });
  });

  //* Escuchar eventos de cierre de conexión
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("Server running on port http://localhost:3000");
