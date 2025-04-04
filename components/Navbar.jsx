'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"

import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

import { useRouter } from "next/navigation"


function Navbar(){

    const {data : session} = useSession()
    const [providers, setProviders] = useState(null);
    
    const router = useRouter()

    useEffect(() => {
        (async () => {
          const res = await getProviders();
          setProviders(res)
          
          
        })();
      }, []);

    return(
        <>
        <nav className="flex w-full pt-3 mb-16 justify-between items-center border-b-2 py-[12px]">
            
            <div className="flex items-center">

            <Link href={'/'} className="flex gap-2 flex-center mr-10">
            <Image 
            src='/icons/king-card2.svg'
            width='40'
            height='40'
            alt=''
            className="rounded-full"
            />
            <p className="max-sm:hidden font-inter font-semibold text-2xl text-black tracking-wide">Studious</p>
            </Link>

            <div className='flex gap-3 md:gap-5'>

                <Link href={'/notes'} className="flex gap-2 flex-center">
                <p className="max-sm:hidden font-satoshi font-normal text-sm text-gray-800 tracking-wide transition-all hover:text-gray-500">Notes</p>
                </Link>

                <Link href={'/leaderboard'} className="flex gap-2 flex-center">
                <p className="max-sm:hidden font-satoshi font-normal text-sm text-gray-800 tracking-wide transition-all hover:text-gray-500">Leaderboard</p>
                </Link>
                


            </div>
            </div>
            <div className="sm:flex hidden">
            {
                session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link 
                        href='/create-session'
                        className="black_btn"
                        >
                            Post
                        </Link>
                        <button type="button" onClick={() =>{
                            signOut()
                            router.push('/')
                        }} 
                            className="outline_btn">
                            Sign out
                        </button>
                        <Link href='/profile'>
                        <Image
                        src={session?.user.image}
                        alt="Image of Profile"
                        width={37}
                        height={37}
                        className="rounded-full"

                        />
                        </Link>

                    </div>
                ): (
                    <>
                    {
                        providers && Object.values(providers).map(provider =>(
                            <button
                             type="button"
                             key={provider.name}
                             onClick={() => signIn(provider.id)}
                             className="black_btn"
                            >
                                Sign In
                            </button>
                        ))
                    }
                    </>
                    )
                
            }
            </div>
            
        </nav>
        </>
    )
}

export default Navbar

