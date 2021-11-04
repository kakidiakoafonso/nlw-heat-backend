import axios from "axios"
import {prismaClient} from '../prisma/prismaClient'
import {sign} from 'jsonwebtoken'

interface Iresponse 
{
    access_token:string
}
interface IUserResponse
{
    avatar_url:string,
    login:string,
    id:number,
    name:string,

}
class AutenticateUserService
{
    async execute(code:string) 
    {
        const url = 'https://github.com/login/oauth/access_token'

       try 
       {
            const {data} = await axios.post<Iresponse>(url,null,{
                params:{
                    client_id: process.env.ClientID,
                    client_secret: process.env.ClientSecrets,
                    code:code
                },
                headers:{
                    accept: "application/json"
                }
            })
            console.log(data);
            
            const response = await axios.get<IUserResponse>('https://api.github.com/user',{
                headers:{
                    authorization: `Bearer ${data.access_token}`,
                }
            })
            const {id,avatar_url,login,name} = response.data
            let user = await prismaClient.user.findFirst({
                where:{
                     github_id: id
                }
            })
            if(!user)
                {
                    user = await prismaClient.user.create({
                        data:{
                            name: name !== null ? name:'',
                            avatar_url:avatar_url,
                            login:login,
                            github_id:id
                        }
                    })
                }
            const token = sign(
            {
                user:{
                    name:user.name,
                    avatar_url:user.avatar_url,
                    id:user.id
                }
            },
            process.env.JWT_SECRET,
            {
                subject:user.id,
                expiresIn: '10d'
            })
        
        return {token,user}
       } catch (error) 
       {
        //    console.log('error tryr');
        return 0
           
       }
    }
}

export {AutenticateUserService}