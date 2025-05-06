import { io } from 'socket.io-client';

const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

let materials = [
    { text: 'Johnnie Walker Red Label 750ml', done: false },
    { text: 'Cepillo de dientes + Pasta Dental', done: false }
];

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
    console.log(`🚀 Servidor Socket.io escuchando en el puerto ${PORT}`);
});