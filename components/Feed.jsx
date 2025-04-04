'use client'
import Autoplay from "embla-carousel-autoplay"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import SessionCard from "./SessionCard"
import { useState, useEffect, useRef, useCallback } from "react"
import {Responsive, WidthProvider } from "react-grid-layout"
import  {Search}  from "lucide-react"
import Image from 'next/image'
import Link from "next/link"
import {ChevronLast, ChevronFirst, Hand} from 'lucide-react'
import { Skeleton } from "./ui/skeleton"
import { usePathname, useRouter } from "next/navigation"
import {
    Carousel,
    CarouselContent,
    CarouselItem,

} from "@/components/ui/carousel"
import { useSession } from "@node_modules/next-auth/react"

const ResponsiveGridLayout = WidthProvider(Responsive)

function Feed({
    handleRegister,
    handleUnregister,
    hasFetchedUser,
    post,
    selectedPost,
    setSelectedPost,
    isSubmitting,
    registeredEvents,
    currentPage,
    setCurrentPage,
    currentItems,
    setCurrentItems,
    itemsPerPage,
    indexOfFirstItem,
    indexOfLastItem,
    postType,
    search,
    setSearch,
    hasFetchedPost,
    handleDelete,
    checkRegistered
    
}){
    const router = useRouter()
    const pathname = usePathname()
    const detailsRef = useRef(null)
    const {data: session} = useSession()
    const preventFirstRender = useRef(true)
    const predefinedLayout = [
            { i: "searchName", x: 0, y: 0, w: 1, h: 1, static: true},
            { i: "searchTags", x: 0, y: 1, w: 1, h: 1, static: true},
            { i: "pagination", x: 2, y: 0, w: 1, h: 1},
            { i: "tip", x: 1, y: 0, w: 1, h: 1},
            { i: "details", x: 1, y: 1, w: 2, h: 5},
            { i: "0", x: 0, y: 2, w: 1, h: 4},
            { i: "1", x: 0, y: 7, w: 1, h: 4},
            { i: "2", x: 1, y: 6, w: 1, h: 4},
            { i: "3", x: 2, y: 6, w: 1, h: 4},
            { i: "4", x: 0, y: 11, w: 1, h: 4},
            { i: "5", x: 1, y: 10, w: 1, h: 4},
            { i: "6", x: 2, y: 10, w: 1, h: 4},
            { i: "7", x: 0, y: 15, w: 1, h: 4},
            { i: "8", x: 1, y: 14, w: 1, h: 4},
            { i: "9", x: 2, y: 14, w: 1, h: 4},
            { i: "10", x: 0, y: 19, w: 1, h: 4},
            { i: "11", x: 1, y: 18, w: 1, h: 4},
            
          ];

    const breakpoints = { lg: 1150, sm: 768, xs: 480};
    const cols = { lg: 3, sm: 2, xs: 1};
    
    const [isDragging, setDragging] = useState(null);
    
    const onDragStart = (layout, oldItem, newItem, placeholder, e, element) => {
        setDragging(newItem.i);

    }
    const onDragStop = (layout, oldItem, newItem, placeholder, e, element) => {
        setDragging(null);
    }

    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }

    
    const [layout, setLayout] = useState(predefinedLayout)
    const [currentLayout, setCurrentLayout] = useState(predefinedLayout)
    //const [width, setWidth] = useState(0)

    const carousel = selectedPost?.tags?.map((element, index) => (
        <CarouselItem key={index} className="basis-1/3">
                <div 
                className="flex items-center justify-center px-1 py-1 border-[2px] border-white text-white font-medium rounded-lg"
                >
                    <span className="text-sm font-md truncate">#{element}</span>
                </div>

        </CarouselItem>
        
    ))

    /*
    useEffect(() => {
    const handleMouseMove = () => {
        setWidth(window.innerWidth);
        
    };

    window.addEventListener("resize", handleMouseMove);
    
    return () => {
        window.removeEventListener("resize", handleMouseMove);
        
    };
    }, []);
    */

    const handleSearchChange = (query) => {
        setSearch(query);
        setCurrentPage(1)
        
    };


    const filteredPosts = post ? (post.filter(event => 
        event.description.toLowerCase().includes(search.description.toLowerCase()) &&
        event.tags.some(tag => tag.toLowerCase().includes(search.tags.toLowerCase()))
    )) : [];



    

    useEffect(() => {
        const index = filteredPosts.length
        if(currentItems.length < 10){
            if(detailsRef.current){
                const detailsHeight = detailsRef.current.innerText.length;
                const updatedLayout = predefinedLayout.map(item => {
                    if (item.i === "details") {
                        return { ...item, h: 5 + Math.floor(detailsHeight / 250) }; // Assuming rowHeight is 45
                    }
                    return item;
                });
                setLayout(updatedLayout.slice(0, index+5))
            }
            else setLayout(predefinedLayout.slice(0, index+5))
        }
        else{
            const index = filteredPosts.length
            if(detailsRef.current){
                const detailsHeight = detailsRef.current.innerText.length;
                const updatedLayout = predefinedLayout.map(item => {
                    if (item.i === "details") {
                        return { ...item, h: 5 + Math.floor(detailsHeight / 250) }; // Assuming rowHeight is 45
                    }
                    return item;
                });
                setLayout(updatedLayout.slice(0, index+5))
            }
            else setLayout(predefinedLayout.slice(0, index+5))

        }

    }, [search])

    useEffect(() => {
        setCurrentItems(filteredPosts.slice(indexOfFirstItem, indexOfLastItem));
        
    }, [search, currentPage])

        useEffect(() => {

        if(currentItems.length < 10){
            if(detailsRef.current) {
                const detailsHeight = detailsRef.current.innerText.length;
                const updatedLayout = predefinedLayout.map(item => {
                    if (item.i === "details") {
                        return { ...item, h: 5 + Math.floor(detailsHeight / 250) }; // Assuming rowHeight is 45
                    }
                    return item;
                });
                setLayout(updatedLayout)
            }
            else setLayout(predefinedLayout)
        }
    }, [currentPage])

    useEffect(() => {

        if(postType && post){
            setCurrentItems(filteredPosts.slice(indexOfFirstItem, indexOfLastItem))
            setCurrentPage(1)
            const index = filteredPosts.length
            
            if(detailsRef.current){
                const detailsHeight = detailsRef.current.innerText.length;
                const updatedLayout = predefinedLayout.map(item => {
                    if (item.i === "details") {
                        return { ...item, h: 5 + Math.floor(detailsHeight / 250) }; // Assuming rowHeight is 45
                    }
                    return item;
                });
                setLayout(updatedLayout.slice(0, index+5))
            }
            else setLayout(predefinedLayout.slice(0, index+5))
            
        }
        
    }, [postType])

    useEffect(() => {
        // Dynamically adjust the height of the details div based on its content

        if (detailsRef.current) {
            const detailsHeight = detailsRef.current.innerText.length;
            const updatedLayout = layout.map(item => {
                if (item.i === "details") {
                    return { ...item, h: 5 + Math.floor(detailsHeight / 250) }; // Assuming rowHeight is 45
                }
                return item;
            });
            setLayout(updatedLayout);
        }
    }, [selectedPost]);

    const handleCardClick = (event) => {
        setSelectedPost(event)
        setLayout(currentLayout)
    }

    const onBreakpointChange = (newBreakpoint) => {
        // Reset layout to predefined layout when breakpoint changes
        const detailsHeight = detailsRef.current.innerText.length;
        const updatedLayout = predefinedLayout.map(item => {
            if (item.i === "details") {
                return { ...item, h: 5 + Math.floor(detailsHeight / 250) }; // Assuming rowHeight is 250
            }
            return item;
        });
        setLayout(updatedLayout);
        
    }

    useEffect(() => {
        if(preventFirstRender.current){
            preventFirstRender.current = false
        }
        else{
            if (detailsRef.current) {
            const detailsHeight = detailsRef.current.innerText.length;
            const updatedLayout = predefinedLayout.map(item => {
                if (item.i === "details") {
                    return { ...item, h: 5 + Math.floor(detailsHeight / 250) }; // Assuming rowHeight is 250
                }
                return item;
            });
            setLayout(updatedLayout.slice(0, filteredPosts.length +5));
            }
        }

    }, [post])

    const onLayoutChange = (newLayout) => {

        setCurrentLayout(newLayout)
    }

    const handlePageClick = (index) => {
        setCurrentPage(index)
        setLayout(currentLayout)
    }

    const formatTime = (time) => {
        if(Number(time.slice(0, 2)) > 12){
            return `${Number(time.slice(0, 2)) - 12}:${time.slice(3, 5)} PM`
        }
        if(Number(time.slice(0, 2)) === 12){
            return `${Number(time.slice(0, 2))}:${time.slice(3, 5)} PM`
        }
        if(time.slice(0, 2) === '00'){
            return `12:${time.slice(3, 5)} AM`
        }
        else{
            return `${time.slice(0, 2)}:${time.slice(3, 5)} AM`
        }

    }

    return(

        <>{hasFetchedPost ? (
        <>
        {post.length > 0 ? (
        <div className="grid-container w-full min-h-[500px]">
          <ResponsiveGridLayout
            className="layout w-full h-full"
            cols={cols}
            layouts={{lg: layout}}
            autoSize={true}
            breakpoints={breakpoints}
            rowHeight={45}
            width={1150}
            isDraggable={true}
            useCSSTransforms={true}
            onDragStart={onDragStart}
            onDragStop={onDragStop}
            onLayoutChange={onLayoutChange}
            containerPadding={[0, 0]}
            onBreakpointChange={onBreakpointChange}
            draggableCancel=".cancelSelector"
            
          >
            <div key="searchName" 
            className={`border border-zinc-500 font-normal text-black text-4xl bg-zinc-100 flex-center`}
            >
                <form
                className="w-full block rounded-md flex-start gap-2 px-2" 
                >   
                    <label>
                    <Search className="w-[28px] h-[28px] text-black mt-[2px]"/>
                    </label>
                    <input
                    value={search.description}
                    placeholder='Search by description'
                    onChange={(e) => handleSearchChange({...search, description: e.target.value})}
                    className="text-lg font-semibold outline-none w-full bg-transparent placeholder-zinc-500"
                    />
                </form>
            </div>
            <div key="searchTags" 
            className={`font-normal text-black text-xl flex-center bg-zinc-100 border border-zinc-500`}
            >
                <form
                className="w-full block rounded-md px-2 gap-2 flex-center"
                >   
                    <label>
                    <Search className="w-[28px] h-[28px] text-black mt-[2px]"/>
                    </label>
                    <input
                    value={search.tags}
                    placeholder='Search by tags'
                    onChange={(e) => handleSearchChange({...search, tags: e.target.value})}
                    className="font-semibold text-lg outline-none w-full bg-transparent placeholder-zinc-500"
                    />
                </form>
            </div>
            <div key="pagination" 
            className={`bg-zinc-100/[0.8] border border-zinc-500 overflow-hidden text-black flex-center  px-2 ${isDragging === 'pagination' ? 'dragging z-10' : ''}`}>
                <div className="flex-center gap-x-1">
                <button 
                className="flex gap-2 text-black font-semibold rounded-xl px-4 py-1 hover:bg-black hover:bg-black hover:text-white hover:shadow-lg transition-all cancelSelector"
                onClick={() => handlePageClick(1)}
                >
                    <ChevronFirst /> First
                </button>
                <div className="gap-x-1 flex-center">
                    {currentPage === 1 ? null : (
                    <button
                    key={currentPage-1}
                    className=" cancelSelector text-black font-semibold rounded-lg px-4 py-1 hover:bg-black hover:text-white hover:shadow-lg transition-all"
                    onClick={() => handlePageClick(currentPage-1)}
                    >
                        {currentPage-1}

                    </button>
                    )
                    }
                    <button
                    key={currentPage}
                    className="cancelSelector text-black border border-zinc-500 font-semibold rounded-lg px-4 py-1 hover:bg-black hover:text-white hover:shadow-lg transition-all"
                    
                    >
                        {currentPage}
                    </button>
                    {Math.ceil(filteredPosts.length / itemsPerPage) >= currentPage+1 ? (
                    <button
                    key={currentPage+1}
                    className="cancelSelector text-black font-semibold rounded-lg px-4 py-1 hover:bg-black hover:text-white hover:shadow-lg transition-all"
                    onClick={() => handlePageClick(currentPage+1)}
                    >
                        {currentPage+1}
                    </button>
                    ) : null
                    }
                </div>
                <button 
                className="cancelSelector flex gap-2 text-black font-semibold rounded-xl px-4 py-1 hover:bg-black hover:text-white hover:shadow-lg transition-all"
                onClick={() => handlePageClick(Math.ceil(filteredPosts.length / itemsPerPage))}
                >
                    Last <ChevronLast />
                </button>
                </div>
            </div>
            <div key="tip" 
            className={`bg-[#141414cc] overflow-hidden text-white ${isDragging === 'tip' ? 'dragging' : ''}`}>
                <h1
                className="px-4 py-1 font-bold text-2xl text-gray-300 font-cyber whitespace-nowrap animate-marquee"
                >Hold and drag to move the cards. Click to display details of the card. Try it out!
                </h1>
            </div>
            <div key="details" className={`bg-[#141414cc] react-grid-item text-white ${isDragging === 'details' ? 'dragging z-10' : ''}`}>
                <div className="px-4 py-2 flex-between">
                    <h1 className="font-inter font-bold text-2xl text-white">
                        Details
                    </h1>
                    {(session?.user && hasFetchedUser && Object.keys(selectedPost).length !== 0) ? (
                        
                        selectedPost?.creator?._id !== session?.user.id ? (
                            checkRegistered(selectedPost._id) ? (                            
                                <button 
                                className="black_btn cancelSelector"
                                disabled={isSubmitting}
                                onClick={() => handleUnregister(selectedPost._id)}
                                >
                                    {isSubmitting ? 'Unregistering...' : 'Unregister'}
                                </button> 
                                ) : (
                                <button 
                                className="black_btn cancelSelector"
                                disabled={isSubmitting}
                                onClick={() => handleRegister(selectedPost._id)}
                                >
                                    {isSubmitting ? 'Registering...' : 'Register'}
                                </button>
                                )
                        ) : (
                            pathname === '/profile' && (
                            <Dialog>
                                <DialogTrigger>
                                <div
                                className="rounded-full border-[2px] border-black bg-red-800 py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
                                >
                                    Delete
                                </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone.
                                        </DialogDescription>
                                    </DialogHeader>
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
                            )
                            
                        )) : null
                 }
                </div>
                {Object.keys(selectedPost).length !== 0 ? (
                <div>
                <div
                className="px-4 py-4 w-full flex-between gap-4"
                >
                    <div
                    className="flex-start gap-2"
                    >
                        <Image
                        onClick={() => router.push(`/profile/${selectedPost.creator._id}`)}
                        src={selectedPost.creator?.image}
                        height={40}
                        width={40}
                        alt='Profile pic'
                        className="rounded-full cursor-pointer cancelSelector"
                        />
                        <div>
                        <h1
                        className="font-inter font-semibold text-base "
                        >
                            {selectedPost.creator?.username}
                        </h1>
                        <h1 className='text-sm text-white'>
                            {selectedPost.creator?.email}
                        </h1>
                        </div>
                    
                    </div>
                
                    <div
                    className="grid justify-items-end"
                    >
                        <h1
                        className="text-sm text-gray-300 font-inter"
                        >
                            {selectedPost.date ? new Date(selectedPost.date).toLocaleDateString(undefined, options): null}, {selectedPost.time ? formatTime(selectedPost.time) : null}
                        </h1>
                        {selectedPost.location ? (
                        <h1
                        className="text-sm text-white font-inter"
                        >
                            {selectedPost.location}
                        </h1>
                        ) : 
                        (
                            
                            <Link
                            href={selectedPost.zoomLink}
                            rel="noopener noreferrer"
                            target="_blank"
                            
                            className="rounded-xl border-[2px] border-black bg-blue-700 py-1.5 px-5 text-white transition-all hover:bg-white hover:font-semibold hover:text-blue-700 hover:border-white text-center text-sm font-inter flex items-center justify-center select-all cancelSelector mt-1"
                            >
                                Zoom
                            </Link>
                            
                        )
                        }
                    </div>
                
                </div>
                
                <div className="px-4 py-4">
                    <p className="text-sm text-pretty" ref={detailsRef}>
                        {selectedPost.description}
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
                ) : (
                    null
                )}       
            </div>
            {
                currentItems.map((event, index) => (
                    <div
                    key={index}
                    className={`glass_gradient border-[1px] border-zinc-400 ${isDragging === index.toString() ? 'dragging z-10' : ''} w-full`}
                    
                    >
                    <SessionCard
                
                    event={event}
                    handleCardClick={handleCardClick}
                    isSubmitting={isSubmitting}
                    />
                    </div>
                    ))
                
            }
          </ResponsiveGridLayout>
          </div>
        ) : 
        null
        }
        </>
        ) :  (
            <div className="grid-container w-full min-h-[1024px]">
            <ResponsiveGridLayout
              className="layout w-full h-full"
              cols={{lg:3, sm: 3, xs: 3}}
              layouts={{lg: predefinedLayout}}
              autoSize={false}
              breakpoints={breakpoints}
              rowHeight={45}
              width={1150}
              isDraggable={false}
              useCSSTransforms={true}    
              containerPadding={[0, 0]}
            >
              
              <div
              key={'searchName'}
              className="animate-pulse rounded-md bg-zinc-200"
              />
  
              <div
              key={'searchTags'}
              className="animate-pulse rounded-md bg-zinc-200"
              />
  
              <div
              key={'pagination'}
              className="animate-pulse rounded-md bg-zinc-200"
              />
  
              <div
              key={'details'}
              className="animate-pulse rounded-md bg-zinc-200"
              />
  
              <div
              key={'tip'}
              className="animate-pulse rounded-md bg-zinc-200"
              />
  
              {Array.from({length: 10}).map((_, index) => (
                  <div
                  key={index}
                  className="animate-pulse rounded-md bg-zinc-200"
                  />
              ))}
  
          </ResponsiveGridLayout>
          </div>
            )}


        
        {/*
        <form
        className="w-full"
        >
            
            <input
            value={search}
            placeholder='Search'
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full border-[2px] border-gray-300 rounded-xl px-4 py-2 text-xl font-semibold "
            />
        </form>
        */
        }
        {/*
        <section
        className="flex-start items-center w-full mt-20 border border-gray-300 rounded-lg mb-12 bg-white"
        >
        <div className="w-3/12">

        </div>
        <div
        className="w-3/12 min-w-96"
        >
            <div
            className="border-l border-r border-gray-300 px-4 py-2 "
            >
                <h1
                className='font-inter font-bold text-xl text-black'
                >
                    Events
                </h1>
            </div>
            <div
            className="border border-gray-300 pt-4"
            >
                <div className="px-4">
                <form
                className="w-full block w-full border border-gray-300 rounded-md mb-4 px-2 py-1 flex-start gap-2 focus-within:border-gray-900 "
                >   
                    <label>
                    <Search className="w-[16px] h-[16px] text-gray-500 mt-[2px]"/>
                    </label>
                    <input
                    value={search}
                    placeholder='Search'
                    onChange={(e) => setSearch(e.target.value)}
                    className="font-md text-sm outline-none w-full"
                    />
                </form>
                </div>
                <ScrollArea className='h-[530px]'>
                    <div className="px-4">
                        <CardList
                        data={post}
                        handleCardClick={handleCardClick}
                        />
                    </div>
                </ScrollArea>
            </div>
        </div>
        <div className="w-6/12">
            <div className="border-b border-gray-300 px-4 py-2 flex-between">
                <h1 className="inter font-bold text-xl text-black">
                    Details
                </h1>
                <button className="black_btn">
                    Register
                </button>
            </div>
            <div
            className="px-4 py-4 flex-start gap-2 border-b border-gray-300 w-full"
            >
                <Image
                src={selectedPost.creator?.image}
                height={40}
                width={40}
                alt='Profile pic'
                className="rounded-full"
                />
                <div>
                <h1
                className="inter font-semibold text-base "
                >
                    {selectedPost.creator?.username}
                </h1>
                <h1 className='text-sm text-gray-500'>
                    {selectedPost.creator?.email}
                </h1>
                </div>
            </div>
            <div className="px-4 py-4">
                <p className="text-sm text-pretty">
                    {selectedPost.description}
                </p>
            </div>
            
        </div>
        </section>
            */}
        </>
    )
}

export default Feed