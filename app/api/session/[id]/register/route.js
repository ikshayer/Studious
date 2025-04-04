import User from "@models/userSchema"
import { connectToDB } from "@utils/database"
import sessionModels from "@models/sessionSchema"
export const PATCH = async (request, {params}) =>{

    const  {userID} = await request.json()

    try{
        await connectToDB()
        const sessionToEdit = await sessionModels.findById(params.id)
        const user = await User.findById(userID)
        if(!sessionToEdit) return new Response("Could not find the post", {status: 404})
        if(!user) return new Response("Could not find User", {status: 404})  
        if(sessionToEdit.registeredUsers.includes(userID) && user.registeredEvents.includes(params.id)) return new Response("User already registered", {status: 403})

        user.registeredEvents.push(params.id)
        await user.save()

        sessionToEdit.registeredUsers.push(userID)
        await sessionToEdit.save()

        return new Response('Successfully registered for the event', {status: 200})
    }
    catch(err){
        return new Response(`Error in registering for the event. ${err}`, {status: 500})
    }
}