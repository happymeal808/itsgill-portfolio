import { useState, useEffect } from 'react'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'

const Services = () => {
    const restPathPage = restBase + ''
    const restPathPosts = restBase + ''
    const [restDataPage, setDataPage] = useState([])
    const [restDataPosts, setDataPosts] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response_page = await fetch(restPathPage)
            const response_posts = await fetch(restPathPosts)
            if ( response_page.ok && response_posts.ok ) {
                const restDataPage = await response_page.json()
                const restDataPosts = await response_posts.json()
                setDataPage(restDataPage)
                setDataPosts(restDataPosts)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPathPage, restPathPosts])
    
    return (
        <>
        { isLoaded ?
            <article id={`post-${restDataPage.id}`}>
                <h1>{restDataPage.title.rendered}</h1>
                <div className="entry-content" dangerouslySetInnerHTML={{__html:restDataPage.content.rendered}}>
                </div>
                {/* Map through restDataPosts here, similar to Posts.js */}
            </article>
        : 
            <Loading />
        }
        </>
    )
}

export default Services
