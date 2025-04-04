'use client'

import Create from "@components/Create"
import { useState } from "react"

function CreateSession(){

    const [post, setPost] = useState({})
    const [isSubmitting, setSubmitting] = useState(false)

    const handleSubmitting = () => {

    }



    return(
        <Create
        type='Create'
        post={post}
        setPost={setPost}
        submitting = {isSubmitting}
        handleSubmitting={handleSubmitting}
        />
    )
}

export default CreateSession