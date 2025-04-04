import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import MyProfile from './MyProfile'
import { authOptions } from '@app/api/auth/[...nextauth]/route';

export default async function ProfilePage({params}) {
    const session = await getServerSession(authOptions);

    if (session?.user.id === params.id) {
        redirect('/profile');
        return null;
    }

    let userData = []
    let postsData = []
    const plainSession = JSON.parse(JSON.stringify(session));

    try{
        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${params.id}`);
        if (!userResponse.ok) {
            throw new Error('Failed to fetch user data');
        }
        userData = await userResponse.json();

        const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${params.id}/events`);
        if (!postsResponse.ok) {
            throw new Error('Failed to fetch posts data');
        }
        postsData = await postsResponse.json();
        
    }
    catch(err){
        console.log(err)
        redirect('/')
    }

    return (
        <MyProfile initialProfile={userData} initialPosts={postsData} session={plainSession}/>
    );
}
