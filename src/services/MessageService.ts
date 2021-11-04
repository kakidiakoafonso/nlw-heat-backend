import { prismaClient } from "../prisma/prismaClient"
import { io } from "../serve"

class MessageService
{
    async execute(text:string,user_id:string)
    {
        const message = await prismaClient.message.create({
            data:{
                text: text,
                user_id:user_id
            },
            include:{
                user:true
            }
        })
        io.emit('msg',message)
        return message
    }
    async get3last()
    {
        const message = await prismaClient.message.findMany({
            take:3,
            orderBy:{created_at:'desc'},
            include:{
                user:true
            }
        })
        
        return message
    }
}
export {MessageService}