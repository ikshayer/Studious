import { connectToDB } from "@utils/database";
import sessionModels from '@models/sessionSchema'

export const GET = async (request) =>{
    try{
        await connectToDB()
        const event = await sessionModels.find({}).populate(['creator', 'registeredUsers'])

        return new Response(JSON.stringify(event), {status: 200})
    }
    catch(error){
        return new Response("Failed to fetch all events", {status: 500})
    }

}