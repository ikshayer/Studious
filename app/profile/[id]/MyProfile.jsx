'use client'

import ProfileCard from "@components/ProfileCard"
import Feed from "@components/Feed";
import { useSession, getSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@hooks/use-toast";

export default function MyProfile({initialPosts, initialProfile, session}){

    const [post, setPost] = useState(initialPosts)
    const [selectedPost, setSelectedPost] = useState(initialPosts[0])
    const [isSubmitting, setSubmitting] = useState(false)
    const [registeredEvents, setRegisteredEvents] = useState(initialProfile.registeredEvents)
    const [myRegisteredEvents, setMyRegisteredEvents] = useState(session?.user.registeredEvents)
    const [hasFetchedUser, setHasFetchedUser] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [currentItems, setCurrentItems] = useState(initialPosts.slice(indexOfFirstItem, indexOfLastItem))
    const {toast} = useToast()
    const [postType, setPostType] = useState('created')
    const [search, setSearch] = useState({
        description: '',
        tags: ''
    })
    const [hasFetchedPost, setFetchedPost] = useState(true)
    const [profile, setProfile] = useState(initialProfile)

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
              
              setMyRegisteredEvents([...registeredEvents, selectedPost._id])
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
    
      const handleUnregister = () => {
        
        const fetchUnregister = async() => {
    
          setSubmitting(true)
    
          try{      
            const response = await fetch(`/api/session/${selectedPost._id}/unregister`, {
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
              const filteredEvents = myRegisteredEvents.filter((event) => event !== selectedPost._id)
              setMyRegisteredEvents(filteredEvents)
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
        const value = myRegisteredEvents.some(event => event === id)
        return value
    }

    /*
    useEffect(() => {
        const fetchPost = async () =>{
            if(session && !hasFetchedPost){
                const response = await fetch(`/api/users/${session?.user.id}/events`)
                const data = await response.json()
                setSelectedPost(data[0])
                setCurrentItems(data.slice(indexOfFirstItem, indexOfLastItem))
                setFetchedPost(true)
                setPost(data)
            }
        }
        fetchPost()
    }, [])
    */

    /*
    useEffect(() => {
        const fetchUser = async () => {
        if(session && !hasFetchedUser){
            const response = await fetch(`/api/users/${session?.user.id}`)
            const data = await response.json()
            console.log(data)
            setProfile(data)
            setRegisteredEvents(data.registeredEvents)
            setHasFetchedUser(true)
        }
        }
        
        fetchUser()

    }, [])
    */

    const handlePostTypeClick = (type) => {
        setPostType(type)
        setCurrentPage(1)
    }

    

    return(
        <>
        <ProfileCard
        postType={postType}
        handlePostTypeClick={handlePostTypeClick}
        profile={profile}
        setProfile={setProfile}
        session={session}
        />
        
        <Feed
        
        handleRegister={handleRegister}
        handleUnregister={handleUnregister}
        hasFetchedUser={hasFetchedUser}
        post={postType === 'created' ? post : registeredEvents}
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
        postType={postType}
        search={search}
        setSearch={setSearch}
        hasFetchedPost={hasFetchedPost}
        checkRegistered={checkRegistered}
        
        />
        
        </>
    )
}