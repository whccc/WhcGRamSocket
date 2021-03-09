const express = require('express');
const app = express();
const cors = require('cors');
const { ConectionSocketAsync } = require('./Components/SocketIO/SocketIOStart');

app.use(cors());

const server = app.listen(process.env.PORT || 4000, () => {
  console.log('Socket escuchando por el puerto 4000');
});

//Socket
ConectionSocketAsync(server);
