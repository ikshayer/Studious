import { connectToDB } from '@utils/database';
import User from '@models/userSchema';

export default async function handler(request) {
    if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        await connectToDB();

        console.time('Fetch Users');
        const users = await User.find().sort({ endorsement: -1 }).exec();
        console.timeEnd('Fetch Users');

        console.time('Update Ranks');
        const bulkOps = users.map((user, index) => ({
            updateOne: {
                filter: { _id: user._id },
                update: { rank: index + 1 }
            }
        }));

        await User.bulkWrite(bulkOps);
        console.timeEnd('Update Ranks');

        return new Response('Ranks updated successfully', { status: 200 });
    } catch (error) {
        console.error('Error updating ranks:', error);
        return new Response('Failed to update ranks', { status: 500 });
    }
}