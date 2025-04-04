import User from "@models/userSchema"
import { connectToDB } from "@utils/database"

export const PATCH = async (request, {params}) => {

    const {endorsingUser} = await request.json()

    try {

        await connectToDB()

        if(!endorsingUser) return new Response('The user is unauthenticated.', {status: 401})
        if(endorsingUser === params.id) return new Response('User cannot increment their own endorsement', {status: 403})

        const user = await User.findById(params.id)

        if(!user) return new Response('User does not exist', {status: 404})
        if(user.endorsedBy.includes(endorsingUser)) return new Response('Endorsing User already endorsed the User before', {status: 400})

        await User.findByIdAndUpdate(params.id, {
            $inc: {endorsement: 1},
            $push: {endorsedBy: endorsingUser}
        })

        return new Response('Successfully added the endorsement', {status: 200})
    }
    catch(err){
        return new Response('There was an error adding the endorsement.', {status: 500})
    }
}