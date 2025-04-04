import { connectToDB } from '@utils/database'
import sessionModels from '@models/sessionSchema'

export const POST = async (req, res) =>{
    const  {userId, location, zoomLink, date, time, description, tags } = await req.json()
    try{
        await connectToDB()

        if(location){
        const sessionCreate = await sessionModels.create({
            creator: userId,
            location: location,
            date: date,
            time: time,
            description: description,
            tags: tags
        })
        await sessionCreate.save()
        return new Response(
            JSON.stringify(sessionCreate), 
            {status: 201}
        )
        }
        if(zoomLink){
            const sessionCreate = await sessionModels.create({
                creator: userId,
                zoomLink: zoomLink,
                date: date,
                time: time,
                description: description,
                tags: tags
            })
            await sessionCreate.save()
            return new Response(
                JSON.stringify(sessionCreate), 
                {status: 201}
            )
            }
    }
    catch(error){
        return new Response('Failed to create a new study session', {status: 500})
    }
}