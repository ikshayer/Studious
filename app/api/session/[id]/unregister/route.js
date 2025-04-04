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

        const isRegisteredEvent = sessionToEdit.registeredUsers.includes(userID)
        if(!isRegisteredEvent) return new Response("User is not registered for the event", {status: 404})
        
        const isRegisteredUser = user.registeredEvents.includes(params.id)
        if(!isRegisteredUser) return new Response("User is not registered for the event", {status: 404})


        await User.findByIdAndUpdate(userID, {
            $pull: {registeredEvents: params.id}
        })
        
        await sessionModels.findByIdAndUpdate(params.id, {
            $pull: {registeredUsers: userID}
        })
        
        return new Response('Successfully unregistered from the event', {status: 200})
    }
    catch(err){
        return new Response(`Error in unregistering from the event. ${err}`, {status: 500})
    }
}