'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {User, Mail, UserPen, ThumbsDown} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { signOut } from "next-auth/react"
import { ThumbsUp } from "lucide-react"
import { useToast } from "@hooks/use-toast"
import { useRouter } from "@node_modules/next/navigation"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import { useState, useRef, useEffect } from "react"

function ProfileCard({
    postType,
    handlePostTypeClick,
    profile,
    setProfile,
    session
}) {
    const router = useRouter()
    const [isSubmitting, setSubmitting] = useState(false)
    const {toast} = useToast()
    const lengthBool = Object.keys(profile).length !== 0
    const [copied, setCopied] = useState(false)
    const handleCopy = () =>{
        setCopied(true)
        navigator.clipboard.writeText(profile.email)
        setTimeout(() =>(
            setCopied(false)
        ), 3000)
    }
    const emailArray = useRef([])

    const handleDescSubmit = () => {
        const description = document.getElementById('profile_description').value

        const updateProfile = async () => {

            setSubmitting(true)

            try{
                const response = await fetch(`/api/users/${session.user.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        description: description
                    })

                })

                if(response.ok){
                    setProfile({...profile, biography: description})
                    toast({
                        variant: 'success',
                        title: "Profile Updated",
                        description: "We have successfully updated the description!",
                    })
                }
            }
            catch(err){
                toast({
                    variant: 'destructive',
                    title: "Failed to Update Profile",
                    description: "We encountered an error while trying to update the profile!",
                })
                console.log(err)
            }
            finally{
                setSubmitting(false)
                document.getElementById('profile_description').value = ''
            }
        }

        updateProfile()

    }

    const handleDelete = () => {
        setSubmitting(true)
        const deleteUser = async() => {

            try{
                const response = await fetch(`/api/users/${session.user.id}`, {
                    method: 'DELETE'
                })
                if(response.ok){
                    signOut()
                    router.push('/')
                }
            }
            catch(err){
                console.log(err)
                toast({
                    variant: 'destructive',
                    title: 'Error in Deleting User',
                    description: "We ran into an error while deleting your account..."
                })
            }
            finally{
                setSubmitting(false)
            }
        }
        const confirmationEmail = document.getElementById('confirmation').value
        if(confirmationEmail === profile.email) deleteUser()
    }

    const handleEndorsement = () => {
        const increaseEndorsement =  async () => {
            setSubmitting(true)
            try{
                const response = await fetch(`/api/users/${profile._id}/endorse`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        endorsingUser: session.user.id
                    })

                })
                if(response.ok){

                    setProfile({
                        ...profile, 
                        endorsement: profile.endorsement+1,
                        endorsedBy:[...profile.endorsedBy, session.user.id]
                    })

                    toast({
                        variant: 'success',
                        title: "Successfully Endorsed!",
                        description: `You have successfully endorsed ${profile.username}`
                    })
                }

            }
            catch(err){
                console.log(err)
                toast({
                    variant: 'destructive',
                    title: 'Error in Endorsing User',
                    description: "We ran into an error while endorsing the user..."
                })
            }
            finally{
                setSubmitting(false)
            }
            
        }

        if(session?.user){
            increaseEndorsement()
        }
        else{
            toast({
                variant: 'destructive',
                title: 'Failed to Endorse',
                description: 'You are not logged in, please try again after logging in...'
            })
        }
        
    }

    const handleUnendorsement = () => {
        const decreaseEndorsement = async () => {
            setSubmitting(true)
            try{
                const response = await fetch(`/api/users/${profile._id}/deendorse`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        endorsingUser: session.user.id
                    })

                })
                if(response.ok){

                    const filteredList = profile.endorsedBy.filter((userID) => userID !== session.user.id)

                    setProfile({
                        ...profile,
                        endorsement: profile.endorsement-1, 
                        endorsedBy: filteredList
                    })

                    toast({
                        variant: 'success',
                        title: "Successfully Unendorsed!",
                        description: `You have successfully unendorsed ${profile.username}`
                    })
                }

            }
            catch(err){
                console.log(err)
                toast({
                    variant: 'destructive',
                    title: 'Error in Unendorsing User',
                    description: "We ran into an error while unendorsing the user..."
                })
            }
            finally{
                setSubmitting(false)
            }
        }

        decreaseEndorsement()
    }

    useEffect(() => {
        emailArray.current = profile?.email?.split(/[@, .]/)
    }, [profile])

    return (
        <section className="mb-3 w-full">
        <div className="max-[1108px]:block flex-start gap-3 w-full">
        {lengthBool ? (
            <>
        <div className=" min-h-[355px] border border-zinc-500 bg-zinc-100/[0.5] px-16 py-8 rounded-xl max-[865px]:block flex-start max-[1108px]:mb-3 max-[1108px]:w-full gap-8 w-full">
            <Avatar className='w-64 h-64'>
                <AvatarImage
                src={profile.image}
                />
                <AvatarFallback className='text-white text-4xl bg-zinc-600'><User className="w-40 h-40"/></AvatarFallback>
            </Avatar>
            <div className="w-full my-12">
                <h1
                className={'text-6xl font-bold font-arial black_gradient pb-3'}
                >
                    {profile.username}
                </h1>
                <p
                className="text-sm"
                >
                {profile.biography} 
                </p>
            </div>
        </div>
        <div
        className="max-[865px]:block max-[1108px]:flex max-[1108px]:gap-3"
        >
        <div className="max-[550px]:block max-[1108px]:flex gap-3 profileSm:max-[1108px]:w-2/3 max-[865px]:w-full"
        >
        
        <div className="min-w-[235px] border relative border-zinc-500 bg-zinc-100/50 h-52 rounded-xl flex-center max-[1108px]:w-1/2 max-[550px]:w-full cursor-pointer"
        onClick={() => handleCopy()}
        >
            {!copied ? (
            <Mail className="w-32 h-32 text-zinc-700 hover:w-36 hover:h-36 transition-all"/>
            ) : (
            <>
            <div className="w-full">
            <h1
            className="px-2 text-balance flex-center w-full text-xl font-semibold"
            >
                {emailArray.current[0]} {'[AT]'}
            </h1>
            <h1
            className="w-full flex-center px-2 text-balance text-xl font-semibold"
            >
                {emailArray.current[1]} {'[DOT]'} {emailArray.current[2]}
            </h1>
            </div>
            <p className="absolute bottom-0 w-full text-center text-sm text-zinc-700 mb-2">
            Copied to clipboard!
            </p>
            </>
            )}
        </div>
        {session?.user.id === profile._id ? (
        <Drawer>
            <DrawerTrigger className="max-[1108px]:w-1/2 max-[550px]:w-full mt-4 max-[550px]:mt-3 max-[1108px]:mt-0">
            <div
            className="flex-center border border-zinc-500 bg-zinc-100/50 rounded-xl h-[130px] min-w-[235px] text-4xl w-full max-[1108px]:h-52 "
            >
                <UserPen className="h-20 w-20 hover:h-24 hover:w-24 transition-all text-zinc-700"/>
            </div>
            </DrawerTrigger>
            <DrawerContent
            className='px-4'
            >
                <DrawerHeader>
                    <DrawerTitle className='text-xl flex-start'>Edit Profile</DrawerTitle>
                    <DrawerDescription className='text-zinc-600 -mt-1 flex-start'>Make Changes to your profile description here.</DrawerDescription>
                </DrawerHeader>
                <div
                className="mx-4 mb-10 mt-1"
                >
                <textarea
                id="profile_description"
                placeholder="Please enter your new description"
                className="text-sm font-medium font-inter border border-gray-300 px-2 rounded py-2 outline-none focus:border-gray-900 w-full h-44"
                />
                <div
                className="flex-between gap-3"
                >
                <button
                className="black_btn mt-6"
                disabled={isSubmitting}
                onClick={() => handleDescSubmit()}
                > {isSubmitting ? 'Submitting...': 'Submit' } 
                </button>
                <Dialog>
                    <DialogTrigger
                    disabled={isSubmitting}
                    >
                    <div
                    className="rounded-full border-[2px] border-black bg-red-800 py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center mt-6"
                    >
                        Delete Profile?
                    </div>
                    </DialogTrigger>
                    <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                        <input
                        type="text"
                        id='confirmation'
                        placeholder="Please confirm by entering your email"
                        className="mt-2 text-sm font-medium font-inter border border-gray-300 px-2 rounded py-2 w-full outline-none focus:border-gray-900"
                        />
                        <button
                        type="button"
                        disabled={isSubmitting}
                        className="black_btn mt-3"
                        onClick={() => handleDelete()}
                        >
                            I understand
                        </button>
                    </DialogContent>
                </Dialog>
                </div>
                </div>
            </DrawerContent>
        </Drawer>
        ) : (
            !profile.endorsedBy.includes(session?.user.id) ? (
            <button
            onClick={() => handleEndorsement()}
            disabled={isSubmitting}
            className="mt-3 flex-center border border-zinc-500 bg-zinc-100/50 rounded-xl h-[130px] min-w-[235px] text-4xl w-full max-[1108px]:h-52 "
            >
                <ThumbsUp className={`h-20 w-20 hover:h-24 hover:w-24 transition-all text-zinc-700 ${isSubmitting ? ('animate-bounce fill-blue-200') : ''}`}/>
            </button>
            ) : (
                <button
                disabled={isSubmitting}
                onClick={() => handleUnendorsement()}
                className="mt-3 flex-center border border-zinc-500 bg-zinc-100/50 rounded-xl h-[130px] min-w-[235px] text-4xl w-full max-[1108px]:h-52 "
                >
                    <ThumbsUp className={`h-20 w-20 hover:h-24 hover:w-24 transition-all text-zinc-700 fill-blue-500 ${isSubmitting ? ('animate-bounce fill-blue-200') : ''}`}/>
                </button>
            )
        )}
        </div>
        <div
            className="font-bold border border-zinc-500 bg-zinc-100/50 h-52 rounded-xl text-zinc-700 py-4 max-profileSm:mt-3 max-profileMd:w-full profileMd:hidden"
            >
                <span className="mx-4 my-2 text-2xl">
                Rank
                </span>
                <span className="flex-center text-5xl mt-7">
                    1
                </span>
            </div>
        
        </div>
        </>) : (
        <>
        <div className="animate-pulse bg-zinc-200 rounded-xl max-[1108px]:w-full h-[355px] max-profileSm:h-[800px] max-profileMd:mb-3 w-full"/>
        <div
        className="max-[865px]:block max-[1108px]:flex max-[1108px]:gap-3"
        >
        <div className="max-[550px]:block max-[1108px]:flex gap-3 profileSm:max-[1108px]:w-2/3 max-[865px]:w-full">
        
        <div className="min-w-[235px] h-52 rounded-xl max-[1108px]:w-1/2 max-[550px]:w-full animate-pulse bg-zinc-200 ">
        </div>
        <div
        className="mt-4 animate-pulse bg-zinc-200 rounded-xl h-[130px] min-w-[235px] text-4xl max-[1108px]:w-1/2 max-[550px]:w-full max-[550px]:mt-3 max-[1108px]:h-52 max-[1108px]:mt-0"
        >    
        </div>
        </div>
        <div
            className="bg-zinc-200 h-52 rounded-xl py-4 max-profileSm:mt-3 max-profileMd:w-full profileMd:hidden"
            >
            </div>
        
        </div>
        </>
        )}
        
        </div>
        <div className="mt-3 max-[865px]:block flex gap-3 w-full">
            {lengthBool ? (
            <>
            <div
            className=" w-1/5 font-bold border border-zinc-500 bg-zinc-100/50 h-52 rounded-xl text-zinc-700 py-4 max-[1108px]:hidden"
            >
                <span className="mx-4 my-2 text-2xl">
                Rank
                </span>
                <span className="flex-center text-5xl mt-7 px-8">
                    10099
                </span>
            </div>
            <div
            className="font-bold border border-zinc-500 bg-zinc-100/50 h-52 rounded-xl flex-center text-zinc-700 text-4xl max-[865px]:mt-3 max-[865px]:!w-full max-[1108px]:w-3/5 w-2/5"
            >
               Endorsements: {profile.endorsement}
            </div>
            <div className="w-2/5 max-profileSm:w-full max-[865px]:mt-3">
            <button 
            className={`${postType === 'created' ? 'bg-[#141414cc] w-full text-white text-[34px] font-semibold h-24 rounded-xl font-cyber transition:all' : 'font-cyber border border-zinc-500 bg-zinc-100/50 rounded-xl w-full h-24 text-3xl font-bold text-zinc-700 hover:text-[34px] transition-all'}`}
            onClick={() => handlePostTypeClick('created')}
            >
                Created Events
            </button>
            <button 
            className={`${postType === 'registered' ? 'leading-normal bg-[#141414cc] w-full text-white text-[34px] font-semibold h-24 rounded-xl font-cyber transition:all mt-4 ' : 'font-cyber border border-zinc-500 bg-zinc-100/50 w-full rounded-xl h-24 text-3xl font-semibold text-zinc-700 hover:text-[34px] transition-all mt-3 '}`}
            onClick={() => handlePostTypeClick('registered')}
            >
                Registered Events
            </button>
            </div>
            </>) : (
            <>
            <div
            className=" w-1/5 bg-zinc-200 h-52 rounded-xl py-4 max-[1108px]:hidden"
            >
            </div>
            <div
            className="bg-zinc-200 h-52 rounded-xl max-[865px]:mt-3 max-[865px]:!w-full max-[1108px]:w-3/5 w-2/5"
            >
            
            </div>
            <div className="w-2/5 max-profileSm:w-full max-[550px]:mt-3">
            <div
            className='bg-zinc-200 rounded-xl w-full h-24'
            >
            </div>
            <div
            className='bg-zinc-200 rounded-xl w-full h-24 mt-3'
            >
            </div>
            </div>
                </>
            )}
        </div>
        </section>
    )
}

export default ProfileCard