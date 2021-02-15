const express = require('express');
const app = express();
const SocketIO = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = app.listen(process.env.PORT || 4000, () => {
  console.log('Socket escuchando por el puerto 4000');
});

//Socket
const io = SocketIO(server);

io.on('connection', (clientSocket) => {
  console.log(clientSocket.id);
  clientSocket.on('disconnect', () => {
    console.log('se fue', clientSocket.id);
  });
  app.use('/api', (req, res) => {
    console.log('de');
  });
});
