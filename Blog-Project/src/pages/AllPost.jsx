import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components/index'
import appwriteService from "../appWrite/conf"

const AllPost = () => {

    const [posts, setPosts] = useState([])
    useEffect(() => { }, [])
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    }).catch()
    
    return (
        <div className='w-full py-8'>
            <Container>
                <div className="flex flex-wrap">
                    {posts.map(() => {
                        return (
                            <div key={posts.$id} className='p-2 w-1/4'>
                                <PostCard/>
                            </div>
                        )
                    })}
                </div>
            </Container>
        </div>
    )
}

export default AllPost
