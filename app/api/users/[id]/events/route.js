import sessionModels from "@models/sessionSchema"
import { connectToDB } from "@utils/database"

export const GET = async (request, {params}) =>{
    try{
        await connectToDB()
        const event = await sessionModels.find({
            creator: params.id
        }).populate('creator')

        return new Response(JSON.stringify(event), {status: 200})
    }
    catch(error){
        return new Response("Failed to fetch all prompts", {status: 500})
    }

}