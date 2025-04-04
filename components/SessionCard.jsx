'use client'
import Autoplay from 'embla-carousel-autoplay'
import Image from "@node_modules/next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,

} from "@/components/ui/carousel"
import { useRouter } from 'next/navigation'

function SessionCard({event, handleCardClick, isSubmitting}){
    
    const carousel = event.tags.map((element, index) => (
        <CarouselItem key={index} className="basis-1/3">
                <div 
                className="flex items-center justify-center px-1 py-1 border-[2px] border-black text-black font-medium rounded-lg"
                >
                    <span className="text-sm font-md truncate">#{element}</span>
                </div>

        </CarouselItem>
        
    ))

    const router = useRouter()

    return(
        <div
        className="w-full rounded-md px-4 py-2"
        
        >
            <div
            className="flex-between"
            >
            <Image 
                src={event.creator?.image}
                width='30'
                height='30'
                alt='Profile Pic'
                className="rounded-full flex-start cursor-pointer cancelSelector"
                onClick={() => router.push(`/profile/${event.creator._id}`)}
            />
            <button
            className="outline_btn cancelSelector"
            type="button"
            disabled={isSubmitting}
            onClick={() => handleCardClick(event)}
            >
                See More
            </button>
            </div>
            <div className="">
            <h1
            className="font-semibold inter mt-1 text-black"
            >
                {event.creator?.username}
            </h1>
            <h1
            className="text-zinc-600 text-sm"
            >
                {event.creator?.email}
            </h1>
            </div>
            <div
            className="mt-2"
            >
                <p
                className="text-zinc-800 text-sm line-clamp-2 "
                >
                    {event.description}
                </p>
                <div className="w-full max-w-full overflow-hidden cursor-grab mt-2 cancelSelector">
                    <Carousel className=' mt-2'
                    opts={{
                        align: 'start',
                        dragFree: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 2000,
                        }),
                    ]}
                    >
                        
                        <CarouselContent>
                            {carousel}
                        </CarouselContent>
                        
                        
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default SessionCard