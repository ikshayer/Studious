import { connectToDB } from "@utils/database";
import User from "@models/userSchema";

export const GET = async () => {
    await connectToDB();

    try {
        const rankings = await User.aggregate([
            {
                $sort: { endorsement: -1 } // Sort by endorsements in descending order
            },
            {
                $project: {
                    _id: 1,
                    email: 1,
                    username: 1,
                    image: 1,
                    endorsement: 1,
                    
                }
            }
        ]);

        return new Response(JSON.stringify(rankings), { status: 200 });
    } catch (err) {
        console.error('Error fetching rankings:', err);
        return new Response('Failed to fetch rankings', { status: 500 });
    }
};