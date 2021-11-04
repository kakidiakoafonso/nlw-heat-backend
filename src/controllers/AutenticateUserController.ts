import {Request,Response} from "express"
import { AutenticateUserService } from "../services/AutenticateUserService"

class AutenticateUserController{

    async handle (request:Request,response:Response)
    {
        const service = new AutenticateUserService()
        const {code}= request.body
        const result = await service.execute(code)
        if(result!==0)
            return response.json(result)
        else
            return response.status(403).send("Github token expirado")
    }
}
export {AutenticateUserController}