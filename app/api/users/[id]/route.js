import User from "@models/userSchema"
import sessionModels from "@models/sessionSchema"
import {connectToDB} from "@utils/database"

export const GET = async(request, {params}) => {

    try{
        await connectToDB()
        const user = await User.findById(params.id).populate({
            path: 'registeredEvents',
            populate: {
                path: 'creator'
            }
        })

        if(!user) return new Response("Could not find the user", {status: 404})

        return new Response(JSON.stringify(user), {status: 200})
    }
    catch(error){
        return new Response("Failed to fetch prompt", {status: 500})
    }

}

export const PATCH = async(request, {params}) => {

    const {description} = await request.json()

    try {
        await connectToDB()
        const user = await User.findById(params.id)
        if(!user) return new Response("Could not find the user", {status: 404})

        user.biography = description
        
        await user.save()

        return new Response("Successfully updated the User.", {status:200})

    }
    catch(err){
        return new Response(`Failed to update User. ${err}`, {status: 500})
    }
}

export const DELETE = async (request, {params}) => {
    try {
        await connectToDB()
        
        await sessionModels.deleteMany({
            creator: params.id
        })
        await sessionModels.updateMany(
            {
                registeredUsers: params.id
            }, 
            {
                $pull: {registeredUsers: params.id}
            }
            )
        await User.findByIdAndDelete(params.id)
        
        return new Response('Successfully deleted the User', {status: 200})
    }
    catch(err){
        return new Response('Could not delete the User', {status: 500})
    }
}