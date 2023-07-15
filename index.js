import  express  from "express";
import { Server as SocketServer } from "socket.io";
import morgan from "morgan";
import http from "http";
import cors from "cors";
import {PORT} from "./config.js";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
    cors: {
        origin: '*'
    }
});

app.use(cors());
app.use(morgan('dev'));

io.on('connection', (socket) => {
    console.log('New connection. ID:', socket.id);
    socket.on('alert', alert => {
        console.log(alert);
        socket.broadcast.emit('alert', alert)
    })
})

server.listen(PORT);
console.log(`Server on port ${PORT}`)