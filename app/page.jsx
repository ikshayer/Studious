'use client'

import SessionCard from "@components/SessionCard";
import Feed from "@components/Feed";
import ReactGrid from "@components/ReactGrid";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useToast } from "@hooks/use-toast";
export default function Home() {

  const {data: session} = useSession()
  const [post, setPost] = useState([])
  const [selectedPost, setSelectedPost] = useState({})
  const [isSubmitting, setSubmitting] = useState(false)
  const [registeredEvents, setRegisteredEvents] = useState([])
  const [hasFetchedUser, setHasFetchedUser] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [currentItems, setCurrentItems] = useState([])
  const [hasFetchedPost, setFetchedPost] = useState(false)
  const {toast} = useToast()
  const [search, setSearch] = useState({
    description: '',
    tags: ''
  })

  useEffect(() => {
      const fetchPost = async () =>{
          const response = await fetch('/api/session')
          const data = await response.json()
          setSelectedPost(data[0])
          setCurrentItems(data.slice(indexOfFirstItem, indexOfLastItem))
          setFetchedPost(true)
          setPost(data)
      }
      fetchPost()
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      if(session && !hasFetchedUser){
      const response = await fetch(`/api/users/${session?.user.id}`)
      const data = await response.json()
      console.log(data)
      setRegisteredEvents(data.registeredEvents)
      setHasFetchedUser(true)
      }
    }
    
    fetchUser()

  }, [session, hasFetchedUser])

  const handleRegister = (sessionID) => {
    
    const fetchRegister = async() => {

      setSubmitting(true)

      try{      
        const response = await fetch(`/api/session/${sessionID}/register`, {
          method: 'PATCH',
          body: JSON.stringify({
              userID: session?.user.id
          })
        })
        if(response.ok){
          toast({
              variant: 'success',
              title: 'Successfully Registered!',
              description: 'We hope to see you at the event!'
          })
          
          setRegisteredEvents([...registeredEvents, selectedPost])
        }
      }
      catch(err){
          toast({
              variant: 'destructive',
              title: 'Failed to Register!',
              description: 'Please try again later.'
          })
          console.log(err)
      }
      finally{
        setSubmitting(false)
      }
  }
  fetchRegister()
    
  }

  const handleUnregister = (sessionID) => {
    
    const fetchUnregister = async() => {

      setSubmitting(true)

      try{      
        const response = await fetch(`/api/session/${sessionID}/unregister`, {
          method: 'PATCH',
          body: JSON.stringify({
              userID: session?.user.id
          })
        })
        if(response.ok){
          toast({
              variant: 'success',
              title: 'Successfully Unregistered!',
              description: 'You have been removed from the event.'
          })
          const filteredEvents = registeredEvents.filter((event) => event._id !== selectedPost._id)
          setRegisteredEvents(filteredEvents)
        }
      }
      catch(err){
          toast({
              variant: 'destructive',
              title: 'Failed to Unregister!',
              description: 'Please try again later.'
          })
          console.log(err)
      }
      finally{
        setSubmitting(false)
      }
  }
  fetchUnregister()
    
  }

  const checkRegistered = (id) => {
    const value = registeredEvents.some(event => event._id === id)
    return value
  }


  return (
    <>
    <section className="w-2/3 flex-center flex-col mb-16 ">
    <h1 className="head_text text-center black_gradient py-2 ">
      Collaborate and Unite Together
    </h1>
    <br/>
    <p className="desc text-center">Studious is a website created to foster collaborative learning amongst the
      students of George Mason University by listing Group-Study sessions and sharing notes!
    </p>
    <div className="flex-center gap-4 mt-8">
      <button className="black_btn">
        Jump to Group Feed
      </button>
      <button className="outline_btn">
        Learn More
      </button>
    </div>
    </section>
    
    <Feed
    handleRegister={handleRegister}
    handleUnregister={handleUnregister}
    hasFetchedUser={hasFetchedUser}
    post={post}
    selectedPost={selectedPost}
    setSelectedPost={setSelectedPost}
    isSubmitting={isSubmitting}
    registeredEvents={registeredEvents}
    currentPage={currentPage}
    setCurrentPage= {setCurrentPage}
    currentItems = {currentItems}
    setCurrentItems={setCurrentItems}
    itemsPerPage={itemsPerPage}
    indexOfFirstItem={indexOfFirstItem}
    indexOfLastItem={indexOfLastItem}
    search={search}
    setSearch={setSearch}
    hasFetchedPost={hasFetchedPost}
    checkRegistered={checkRegistered}
    />
    </>

  );
}
