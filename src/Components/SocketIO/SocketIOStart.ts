export {};
const SocketIO = require('socket.io');
const ArraySockets = [];
module.exports = {
  async ConectionSocketAsync(server) {
    const io = SocketIO(server);
    io.on('connection', (clientSocket) => {
      console.log(clientSocket.handshake.query.myket);
      ArraySockets[clientSocket.handshake.query.myket] = clientSocket;

      //CONECTAR USUARIOS A LA SALA DE CHAT
      clientSocket.on('AddUserRoom', (Data) => {
        Data.ArrayMembers.forEach((Users) => {
          console.log(Data);
          const UserSocket = ArraySockets[Users.IdUser._id];
          if (UserSocket !== undefined) {
            UserSocket.join(Data._id);
          }
        });
      });

      clientSocket.on('onMessageChat', (Data) => {
        io.to(Data.IdRoom).emit('onMessage', Data);
      });

      clientSocket.on('onMessageWriting', (Data) => {
        io.to(Data.IdRoom).emit('onMessageWritingChat', Data);
      });

      clientSocket.on('disconnect', () => {
        console.log('se fue', clientSocket.id);
      });

      clientSocket.on('MessageApi', (Data) => {
        console.log(Data);
      });
    });
  }
};
