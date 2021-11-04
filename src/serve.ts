import "dotenv/config"
import express from 'express'
import { route } from "./routes"
import http from 'http'
import {Server} from 'socket.io'

const app = express()
app.use(express.json())
app.use(route)
export const server = http.createServer(app)
export const io = new Server(server,{
    cors:{
        origin:"*"
    }
})

io.on('connection', function (socket) 
{
    socket.emit('news', { hello: 'Hello world' });
    console.log('Conectado');
    
   
  });