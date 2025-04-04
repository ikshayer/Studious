'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { useRouter } from "next/navigation"
import {useState} from 'react'
import { useSession } from "next-auth/react"

function Create(
    {
        type,
        post,
        setPost,
        submitting,
        handleSubmitting
    }
){

    const {data:session} = useSession()
    const router = useRouter()
    const [isChecked, setChecked] = useState(false)
    const [date, setDate] = useState()

    return(
        <section className="w-3/4 justify-content border border-gray-300 rounded-xl flex inline-flex mb-12">
            {
            /*<div className="h-80 w-full bg-gradient-to-r from-gray-500 to-slate-900 flex-center rounded-xl py-24 px-8">
            <h1 className='text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl font-inter flex-center my-0 py-5 px-2 rounded-3xl'>
                    Create your Study Group!
                </h1>
            */
            }
            <div className="border-r-2 text-left ml-8 my-12 w-1/2">
                <div className="border-b-2 pb-5">
                <h1 className="font-inter text-2xl text-black font-bold ">
                    Submit your plan
                </h1>
                <p className="font-satoshi font-normal text-sm text-gray-800 tracking-wide mt-1">
                    Plan the details for your study session
                </p>
            </div>
                <div className="mt-5 flex">

                    <p className="font-satoshi font-bold text-sm text-black tracking-wide mt-1 pr-8">
                        Location
                    </p>



                    <div className="flex items-center space-x-2">
                        <Checkbox id="remote" 
                        checked = {isChecked}
                        onCheckedChange= {(check) => {
                            setChecked(check)
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
                            id="meeting_link"
                            placeholder="Zoom Link"
                            className="mt-2 text-sm font-medium font-inter border border-gray-300 px-2 rounded py-2 w-2/3 outline-none focus:border-gray-900"
                            />
                        ):(
                            <input 
                            type='text'
                            id="location"
                            placeholder="Room, Floor, Location"
                            className="mt-2 text-sm font-medium font-inter border border-gray-300 px-2 rounded py-2 w-2/3 outline-none focus:border-gray-900"
                            />
                        )}
                    <div>
                        <p className="font-satoshi font-bold text-sm text-black tracking-wide mt-6 ">
                            Date
                        </p>
                        <Calendar
                        mode='single'
                        selected={post.date}
                        onSelect={(x) => {
                            setPost({...post, date:x})
                        }}
                        className="rounded-md border border-gray-300 mt-2 font-inter text-sm font-medium w-2/3 flex-center text-center"
                        />

                    </div>

            </div>
            <div className="mt-6 border-gray-300 w-1/2 mr-8">
                <div className="mx-8">

                <div className="my-6">
                    <p className="font-satoshi font-bold text-sm text-black tracking-wide mt-1 pr-8">
                        Time
                    </p>
                    <input 
                    type="time"
                    value={post.time}
                    required
                    className="mt-2 text-sm font-medium font-inter border border-gray-300 px-2 rounded py-2 w-2/3 outline-none focus:border-gray-900 w-full"
                    onChange={(e) =>{
                        setPost(e.target.value)
                    }}
                    />
                </div>


                <p className="font-satoshi font-bold text-sm text-black tracking-wide mt-6">
                    Description
                </p>
                <textarea
                placeholder="Please provide what you are going to do"
                value={post.description}
                onChange={(e) => setPost(e.target.value)}
                className="mt-2 text-sm font-medium font-inter border border-gray-300 px-2 rounded py-2 w-2/3 outline-none focus:border-gray-900 w-full h-60"
                />

                <div className="my-6">
                    <p className="font-satoshi font-bold text-sm text-black tracking-wide mt-1 pr-8">
                        Tags
                    </p>
                    <input 
                    type="text"
                    value
                    placeholder="#CS112 #Leetcode"
                    className="mt-2 text-sm font-medium font-inter border border-gray-300 px-2 rounded py-2 w-2/3 outline-none focus:border-gray-900 w-full"
                    />
                </div>

                <div className="flex-between gap-4 my-8">
                    <button className="rounded-lg bg-white py-1.5 px-5 text-black transition-all p-2 hover:bg-black hover:text-white text-center text-sm font-inter flex items-center justify-center font-medium">Cancel</button>
                    <button className="rounded-lg border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center font-medium">Submit</button>
                </div>

                </div>


            </div>
        
                
            
        </section>
    )
}

export default Create