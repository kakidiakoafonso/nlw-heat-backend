import {Router} from 'express'
import { AutenticateUserController } from './controllers/AutenticateUserController'
import { MessageController } from './controllers/MessageController'
import { AuthCheck } from './middlewares/AuthCheck'
import express from "express";
import http from 'http'
import {Server} from 'socket.io'
import cors from 'cors'
const app = express();

const route = Router()
// AuthCheck 
route.post('/auth',new AutenticateUserController().handle)
route.get('/github',(req,res)=>
{
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.ClientID}`)
})
route.get('/signin/callback',(req,res)=>{
    const {code}= req.query
    res.send(code)
})

route.post('/message',AuthCheck,new MessageController().handle)
route.get('/message',new MessageController().get3Last)


export {route}
