const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    console.log('🟢 Cliente conectado');

    socket.emit('updateList', materials);

    socket.on('addItem', text => {
        materials.push({ text, done: false });
        io.emit('updateList', materials);
    });

    socket.on('removeItem', index => {
        materials.splice(index, 1);
        io.emit('updateList', materials);
    });

    socket.on('toggleItem', index => {
        if (materials[index]) {
            materials[index].done = !materials[index].done;
            io.emit('updateList', materials);
        }
    });

    socket.on('disconnect', () => {
        console.log('🔴 Cliente desconectado');
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});