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

            let filteredPosts    

            if(postType === 'created') {
                filteredPosts = post ? (post.filter(event => 
                    event.description.toLowerCase().includes(search.description.toLowerCase()) &&
                    event.tags.some(tag => tag.toLowerCase().includes(search.tags.toLowerCase()))
                )) : [];
            }
            else{
                filteredPosts = registeredEvents ? (registeredEvents.filter(event => 
                    event.description.toLowerCase().includes(search.description.toLowerCase()) &&
                    event.tags.some(tag => tag.toLowerCase().includes(search.tags.toLowerCase()))
                )) : [];
            }
    
            const filteredCurrentEvent = filteredPosts.filter((event) => event._id !== selectedPost._id)

            if(currentItems.length === 1 && currentPage !== 1){                             
                setCurrentPage(currentPage-1)
                setSelectedPost(filteredCurrentEvent[indexOfFirstItem-1])                
            }
            else if(currentItems.length === 1 && currentPage === 1){                             
                setSelectedPost({})                
            }
            else{
                setCurrentItems(filteredCurrentEvent.slice(indexOfFirstItem, indexOfLastItem))
                setSelectedPost(filteredCurrentEvent[indexOfFirstItem])
            }
           
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

    const handlePostTypeClick = (type) => {
        setPostType(type)
        setCurrentPage(1)
    }

    const checkRegistered = (id) => {
        const value = registeredEvents.some(event => event._id === id)
        return value
      }
    

    const handleDelete = async () => {
        const fetchDelete = async () => {

            setSubmitting(true)

            try{
            const response = await fetch(`/api/session/${selectedPost._id}`, {
                method: 'DELETE',
                
            })
            if(response.ok){
                toast({
                    variant: 'success',
                    title: 'Successfully Deleted!',
                    description: 'You have successfully deleted the event!'
                })
                const filteredEvents = post.filter((event) => event._id !== selectedPost._id)
                setPost(filteredEvents)
    
                let filteredPosts    
    
                if(postType === 'created') {
                    filteredPosts = post ? (post.filter(event => 
                        event.description.toLowerCase().includes(search.description.toLowerCase()) &&
                        event.tags.some(tag => tag.toLowerCase().includes(search.tags.toLowerCase()))
                    )) : [];
                }
                else{
                    filteredPosts = registeredEvents ? (registeredEvents.filter(event => 
                        event.description.toLowerCase().includes(search.description.toLowerCase()) &&
                        event.tags.some(tag => tag.toLowerCase().includes(search.tags.toLowerCase()))
                    )) : [];
                }
        
                const filteredCurrentEvent = filteredPosts.filter((event) => event._id !== selectedPost._id)
    
                if(currentItems.length === 1 && currentPage !== 1){                             
                    setCurrentPage(currentPage-1)
                    setSelectedPost(filteredCurrentEvent[indexOfFirstItem-1])                
                }
                else if(currentItems.length === 1 && currentPage === 1){                             
                    setSelectedPost({})                
                }
                else{
                    setCurrentItems(filteredCurrentEvent.slice(indexOfFirstItem, indexOfLastItem))
                    setSelectedPost(filteredCurrentEvent[indexOfFirstItem])
                }
            }
            }
            catch(err){
                toast({
                    variant: 'destructive',
                    title: 'Failed to Delete the event!',
                    description: 'Please try again later.'
                })
                console.log(err)
            }
            finally{
                setSubmitting(false)
            }
        }

        if(session?.user.id === selectedPost.creator._id) fetchDelete()
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
        handleRegister={''}
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
        handleDelete={handleDelete}
        checkRegistered={checkRegistered}
        />
        
        </>
    )
}