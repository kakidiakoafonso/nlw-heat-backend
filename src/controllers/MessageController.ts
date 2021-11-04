import {Request,Response} from 'express'
import { MessageService } from '../services/MessageService'
class MessageController
{
    async handle(request:Request,response:Response)
    {
        const {message,user} = request.body
        const service = new MessageService()
        const execute = service.execute(message,user.id)
        if(!execute) return response.send('Dados nao gravados')
        return response.send(execute);


    }
    async get3Last(request:Request,response:Response)
    {
        const service = new MessageService()
        const msg = await service.get3last()
        return response.send(msg)

    }
}
export {MessageController}