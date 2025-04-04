'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { useRouter } from "next/navigation"
import {useState} from 'react'

import {
    Carousel,
    CarouselContent,
    CarouselItem,

} from "@/components/ui/carousel"
import { CircleX } from "lucide-react"
import { useToast } from "@hooks/use-toast"


function Create(
    {
        type,
        post,
        setPost,
        submitting,
        handleSubmitting,
        isChecked,
        setChecked
    }
){
    const { toast } = useToast()
    const [tag, setTag] = useState('')

    const currentDate = new Date();
    const threeDaysAhead = new Date(currentDate);
    const ninetyDaysAhead = new Date(currentDate);
    threeDaysAhead.setDate(currentDate.getDate() + 5);
    ninetyDaysAhead.setDate(currentDate.getDate() + 90);

    const router = useRouter()

    const handleTagAdd = () => {
        if(post.tags.length >=5 ){
            toast({
                title: "Too Many Tags!",
                description: "You cannot add more than 5 tags.",
            })
        }
        else if(post.tags.includes(tag)){
            toast({
                title: "The Tag already exists!",
                description: "Please provide a different tag...",
            })
        }
        else if(tag && !post.tags.includes(tag)){
            const regex = /[^a-zA-Z0-9]|\s|\b[a-zA-Z0-9]{16,}\b/
            if(regex.test(tag)){
                
                toast({
                    variant: "destructive",
                    title: "Uh oh! Wrong Tag Syntax",
                    description: "You cannot use spaces, special characters, or tags longer than 15 characters.",
                })
            }
            else{
                
            setPost({...post, tags: [...post.tags, tag]})
            setTag('')
            }
        }
    }
    const handleTagDelete = (index) => {
        const updatedTags = post.tags.filter((_, i) => i!==index)
        setPost({...post, tags: updatedTags})
    }

    const carousel = post.tags.map((element, index) => (
        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div 
                className="flex items-center justify-center px-6 py-2 border border-gray-300 text-black rounded-full"
                onClick={() => handleTagDelete(index)}
                >
                  <span className="text-sm font-md truncate">#{element}</span>
                </div>

        </CarouselItem>
        
    ))
    

    return(
        <form 
        className="w-full justify-content border border-gray-300 rounded-xl lg:inline-flex bg-white py-12"
        onSubmit={handleSubmitting}
        >
            {
            /*<div className="h-80 w-full bg-gradient-to-r from-gray-500 to-slate-900 flex-center rounded-xl py-24 px-8">
            <h1 className='text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl font-inter flex-center my-0 py-5 px-2 rounded-3xl'>
                    Create your Study Group!
                </h1>
            */
            }
            <div className="lg:border-r-2 text-left px-8 w-1/2 max-lg:w-full">
                <div className="border-b-2 pb-5">
                <h1 className="font-inter text-2xl text-black font-bold ">
                    {type} your plan
                </h1>
                <p className="font-satoshi font-normal text-sm text-gray-800 tracking-wide mt-1">
                    Plan the details for your study session
                </p>
                </div>
                <div className="">
                <div className="mt-5 flex mr-8">

                    <p className="font-satoshi font-bold text-sm text-black tracking-wide mt-1 pr-8">
                        Location
                    </p>



                    <div className="flex items-center space-x-2">
                        <Checkbox
                        checked = {isChecked}
                        onCheckedChange= {(check) => {
                            setChecked(check)
                            setPost({...post, zoomLink: '', location: ''})
                        }}
                        />
                        <label
                            htmlFor="remote"
                            className="text-sm font-medium font-inter leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Is the meeting remote?
                        </label>
                    </div>

                        

                </div>
                    {isChecked ? (
                            <input 
                            type='text'
                            value={post.zoomLink}
                            required
                            placeholder="Zoom Link"
                            className="mt-2 text-sm font-medium font-inter border border-gray-300 px-2 rounded py-2 w-full outline-none focus:border-gray-900"
                            onChange={(e) => setPost({...post, zoomLink: e.target.value})}
                            />
                        ):(
                            <input 
                            type='text'
                            value={post.location}
                            required
                            placeholder="Room, Floor, Location"
                            className="mt-2 text-sm font-medium font-inter border border-gray-300 px-2 rounded py-2 w-full outline-none focus:border-gray-900"
                            onChange={(e) => setPost({...post, location: e.target.value})}
                            />
                        )}
                    </div>
                    <div className="">
                        <p className="font-satoshi font-bold text-sm text-black tracking-wide mt-6 ">
                            Date
                        </p>
                        <Calendar
                        mode='single'
                        disabled={{ before: threeDaysAhead, after: ninetyDaysAhead}}
                        required
                        selected={post.date}
                        onSelect={(x) => {
                            setPost({...post, date: x})
                        }}
                        className="rounded-md border border-gray-300 mt-2 font-inter text-sm font-medium w-full flex-center text-center"
                        />

                    </div>

            </div>
            <div className="border-gray-300 px-8 w-1/2 max-lg:w-full overflow-hidden">
                

                <div className="my-6">
                    <p className="font-satoshi font-bold text-sm text-black tracking-wide mt-1 pr-8">
                        Time
                    </p>
                    <input 
                    type="time"
                    value={post.time}
                    required
                    className="mt-2 text-sm font-medium font-inter border border-gray-300 px-2 rounded py-2 outline-none focus:border-gray-900 w-full"
                    onChange={(e) =>{
                        setPost({...post, time: e.target.value})
                    }}
                    />
                </div>


                <p className="font-satoshi font-bold text-sm text-black tracking-wide mt-6">
                    Description
                </p>
                <textarea
                placeholder="Please provide what you are going to do"
                required
                value={post.description}
                onChange={(e) => setPost({...post, description: e.target.value})}
                className="mt-2 text-sm font-medium font-inter border border-gray-300 px-2 rounded py-2 outline-none focus:border-gray-900 w-full h-44"
                />

                <div className="my-6">
                    <p className="font-satoshi font-bold text-sm text-black tracking-wide mt-1 pr-8">
                        Tags
                    </p>
                    <div className="flex gap-4 mt-2">
                    <input 
                    type="text"
                    value={tag}
                    placeholder="#CS112 #Leetcode"
                    onChange={(e) => {
                        setTag(e.target.value)
                    }}
                    className=" text-sm font-medium font-inter border border-gray-300 px-2 rounded py-2 outline-none focus:border-gray-900 w-full"
                    />
                    <button 
                    className="rounded-lg border border-black bg-black px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center font-medium"
                    onClick={() => handleTagAdd()}
                    type="button"
                    >
                        Add
                    </button>
                    </div>
                    {post.tags.length > 0 ? (
                    <div className="w-full max-w-full overflow-hidden cursor-grab">
                    <Carousel className=' mt-2'
                    opts={{
                        align: 'start',
                        dragFree: true,
                    }}
                    >
                        
                        <CarouselContent>
                            {carousel}
                        </CarouselContent>
                        
                        
                    </Carousel>
                    </div>
                    ): null
                    }   
                </div>

                <div className="flex-between my-8">
                    <button 
                    type="button"
                    className="rounded-lg bg-white py-1.5 px-5 text-black transition-all p-2 hover:bg-black hover:text-white text-center text-sm font-inter flex items-center justify-center font-medium"
                    onClick={() => router.push('/')}
                    >
                        Cancel
                    </button>
                    <button 
                    className="rounded-lg border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center font-medium"
                    onClick={(e) => handleSubmitting(e)}
                    disabled={submitting}
                    type="submit"
                    >
                        {submitting ? 'Submitting...': 'Submit'}
                    </button>
                </div>

                


            </div>
        
                
            
        </form>
    )
}

export default Create