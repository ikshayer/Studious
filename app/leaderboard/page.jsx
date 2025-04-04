'use client'
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"
import {User} from "lucide-react"
import Image from "@node_modules/next/image"
import { Search } from "lucide-react"

const Leaderboard = () => {

    const [rankingData, setRankingData] = useState([])
    const [hasFetchedData, setHasFetchedData] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try{
                    const response = await fetch(`/api/rankings`, {
                        method: "GET",
                        
                    })
                    const data = await response.json()
                    console.log(data)
                    setRankingData(data)
                    setHasFetchedData(true)

                    
            }
            catch(err){
                console.log(err)
                    
            }
        }
        fetchData()
    }, [])
    
    return(
        <>

        <div
        className="w-full flex-center gap-0 opacity-[0.8] rounded-2xl mt-24 translate-x-4"
        >
            <div className="relative w-48 max-[720px]:w-24 h-32 bg-zinc-400 border border-zinc-400 rounded-lg shadow-lg transform  transition-all duration-300">
            <div className="absolute inset-0 -translate-y-[2rem] -translate-x-4 grid justify-items-center z-10">
                <Avatar
                className='-mb-10 h-12 w-12'
                >
                    <AvatarImage
                    src={rankingData[1]?.image}
                    
                    />

                    <AvatarFallback>
                        <User className="h-6 w-6"/>
                    </AvatarFallback>
                </Avatar>
            
            </div>
            <div className="absolute inset-0 bg-zinc-300 rounded-lg shadow-inner"></div>
            <div className="absolute inset-0 bg-zinc-300 rotate-45 translate-y-14 -translate-x-10 w-44 h-11 "></div>
            <div className="absolute inset-0 bg-zinc-300 rotate-45 translate-y-14 translate-x-6 w-44 h-11 "></div>
            <div className="absolute inset-0 -translate-x-8 translate-y-8 bg-zinc-400 rounded shadow-2xl flex-center text-6xl font-extrabold "> 2 </div>
            </div>

            <div className="relative w-48 h-48 max-[720px]:w-24 -translate-y-8 bg-amber-400 border border-amber-600 rounded-lg shadow-lg transform  transition-all duration-300">
            <div className="absolute inset-0 -translate-y-[3rem] -translate-x-4 grid justify-items-center z-10">
                <Avatar
                className='-mb-24 h-16 w-16'
                >
                    <AvatarImage
                    src={rankingData[0]?.image}
                    
                    />

                    <AvatarFallback>
                        <User className="h-6 w-6"/>
                    </AvatarFallback>
                </Avatar>
                
            </div>
            <div className="absolute inset-0 bg-amber-400 rounded-lg shadow-inner"></div>
            <div className="absolute inset-0 bg-amber-400 rotate-45 translate-y-14 -translate-x-10 w-44 h-11 "></div>
            <div className="absolute inset-0 bg-amber-400 rotate-45 translate-y-[7.5rem] translate-x-6 w-44 h-11 "></div>

            <div className="absolute inset-0 -translate-x-8 translate-y-8 bg-amber-500 rounded shadow-2xl flex-center text-7xl font-extrabold ">1</div>
            </div>

            <div className="relative w-48 h-24 translate-y-4  max-[720px]:w-24 bg-amber-600 border border-amber-800 rounded-lg shadow-2xl">
            <div className="absolute inset-0 -translate-y-[2rem] -translate-x-2 grid justify-items-center z-10">
                <Avatar
                className='-mb-10 h-12 w-12'
                >
                    <AvatarImage
                    src={rankingData[2]?.image}
                    
                    />

                    <AvatarFallback>
                        <User className="h-6 w-6"/>
                    </AvatarFallback>
                </Avatar>
                
            </div>
            <div className="absolute inset-0 bg-amber-600 rounded-lg shadow-inner"></div>
            <div className="absolute inset-0 bg-amber-600 rotate-45 translate-y-10 -translate-x-8 w-32 h-11 max-[720px]:w-24 max-[720px]:translate-y-7 max-[720px]:-translate-x-7 "></div>
            <div className="absolute inset-0 bg-amber-600 rotate-45 translate-y-[3.3rem] translate-x-[5.8rem] w-24 h-11 max-[720px]:w-24 max-[720px]:-translate-x-1 "></div>
            <div className="absolute inset-0 -translate-x-8 translate-y-8 bg-amber-800 rounded shadow-2xl flex-center text-6xl font-extrabold ">3</div>
            </div>

        
            
        </div>
        <div
        className="relative bg-gray-400 w-[35rem] max-[720px]:w-[17.5rem] h-64 shadow_gradient -translate-x-[4.5rem] -z-10 -skew-x-[24deg] mix-blend-none transform  transition-all duration-200"
        ></div>
        <div
        className="relative bg-gray-400 w-[35rem] max-[720px]:w-[17.5rem] h-64 shadow_gradient translate-x-[2.8rem] -z-10 skew-x-[24deg] -translate-y-[16rem] mix-blend-soft-light -mb-[28rem] transform  transition-all duration-200"
        ></div>

        <div key="searchName" 
        className={`mb-4 py-1 font-normal text-white text-2xl bg-[#141414cc] flex-center rounded-xl w-3/4 px-2`}
        >
            <form
            className="w-full block rounded-md flex items-center gap-2 px-2" 
            >   
                <label>
                <Search className="w-[28px] h-[28px] text-gray-300 mt-[2px]"/>
                </label>
                <input
                
                placeholder='Search the User'
                
                className="text-base font-semibold outline-none w-full bg-transparent placeholder-gray-300"
                />
            </form>
        </div>

        {
        rankingData.map((user, index) => (
            
            <div
            key={index}
            className="w-4/5 bg-zinc-200 flex-between mt-3 rounded-xl px-4 py-2 bg-opacity-[0.7] shadow-lg"
            >
                <div
                className="flex items-center gap-4 w-3/5"
                >
                    <Avatar
                    className=''
                    >
                        <AvatarImage
                        src={user.image}
                        
                        />
                        <AvatarFallback>
                            <User className="h-6 w-6"/>
                        </AvatarFallback>
                    </Avatar>
                    <span
                    className="text-sm font-zinc-700 font-semibold"
                    >
                        {user.username}
                    </span>
    
                </div>
    
                <div 
                className="w-1/5 grid justify-items-end"
                >
                    <span className="text-lg text-black font-semibold">
                        {user.endorsement}
                    </span>
                </div>
    
                <div
                className="w-1/5 grid justify-items-end"
                >
                    <span
                    className="text-lg text-gray-400 font-bold"
                    >
                        #{(index+1).toString().padStart(2, '0')}
                    </span>
                </div>
            </div>
        ))}

        {/*
        <div className="absolute -translate-x-[24rem]">
        <div className="relative w-[17.2rem] h-32 -skew-x-[25deg] bg-zinc-500 mt-8 mix-blend-none -z-10"></div>
        <div className="relative w-36 h-32 skew-x-[25deg] bg-zinc-400 mix-blend-none -z-10"> </div>
        <div className="relative w-36 h-32 skew-x-[8deg] bg-zinc-400 -translate-y-[8em] translate-x-[7rem] -z-10"> </div>

        </div>
        <div className="absolute translate-x-[24rem]">
        <div className="relative w-[17.2rem] h-32 skew-x-[25deg] bg-zinc-500 mt-8 mix-blend-none -z-10"></div>
        <div className="relative w-36 h-32 -skew-x-[8deg] bg-zinc-400 mix-blend-none -z-10 translate-x-5"> </div>
        <div className="relative w-36 h-32 -skew-x-[25deg] bg-zinc-400 -translate-y-[8em] translate-x-[8.2rem] -z-10"> </div>

        </div>

        <div className="absolute -translate-x-12">
        <div className="relative w-[17.2rem] h-32 -skew-x-[8deg] bg-zinc-500 mt-8 mix-blend-none -z-10"></div>
        <div className="relative w-36 h-32 skew-x-[8deg] bg-zinc-400 mix-blend-none -z-10"> </div>
        <div className="relative w-36 h-32 skew-x-[8deg] bg-zinc-400 -translate-y-[8em] translate-x-[7rem] -z-10"> </div>

        </div>
        <div className="absolute translate-x-12">
        <div className="relative w-[17.2rem] h-32 skew-x-[8deg] bg-zinc-500 mt-8 mix-blend-none -z-10"></div>
        <div className="relative w-36 h-32 -skew-x-[8deg] bg-zinc-400 mix-blend-none -z-10 translate-x-5"> </div>
        <div className="relative w-36 h-32 -skew-x-[8deg] bg-zinc-400 -translate-y-[8em] translate-x-[8.2rem] -z-10"> </div>

        </div>
        */}
        </>
    )
}
export default Leaderboard