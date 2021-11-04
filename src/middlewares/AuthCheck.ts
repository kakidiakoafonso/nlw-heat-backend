import {Request,Response,NextFunction} from "express"
import { verify } from "jsonwebtoken"

interface Ipayload {
    sub:string
}
export async function AuthCheck (request:Request,response:Response,next:NextFunction)
{
    const token = request.headers.authorization
    
    if(!token)
    {
        return response.status(401).json(
        {error:"Token vazio"}
        )
    }
    try 
    {
        verify(token, process.env.JWT_SECRET,(erro,dados)=>{
            if(erro) 
            {
                return response.status(401).
                json({error:"Erro na verificacao do token"})
            }
            console.log(dados.user)
            request.body.user = dados.user
            next()
            
        })
        
        
    } 
    catch (error) {
        return response.status(401).json(
            {errorCode:"Token expirado"}
            )
    }
}