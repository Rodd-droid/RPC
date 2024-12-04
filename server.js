const express = require('express');
const { JSONRPCServer } = require('json-rpc-2.0');

// Crea un servidor JSON-RPC
const server = new JSONRPCServer();

// Define un método remoto
server.addMethod("sayHello", ({ name }) => {
  if (!name) {
    throw new Error("El parámetro 'name' es obligatorio");
  }
  return `Hola ${name} desde RCP`;
});

const app = express();
app.use(express.json());

app.post('/rpc', (req, res) => {
  const jsonRPCRequest = req.body;

  server.receive(jsonRPCRequest).then((jsonRPCResponse) => {
    if (jsonRPCResponse) {
      res.json(jsonRPCResponse);
    } else {
      res.sendStatus(204);
    }
  });
});

app.listen(4000, () => {
  console.log('Servidor RPC escuchando en http://localhost:4000/rpc');
});
