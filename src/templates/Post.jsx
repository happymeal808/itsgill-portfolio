import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'

const Post = () => {
    const { slug } = useParams();
    const restPath = restBase + `posts?slug=${slug}&_embed=true`
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data[0])
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])
        
    return (
        <>
        { isLoaded ?
            <>
                <article id={`post-${restData.id}`}>
                    <h1>{restData.title.rendered}</h1>
                    <div className="entry-content" dangerouslySetInnerHTML={{__html:restData.content.rendered}}></div>
                </article>
                <nav className="posts-navigation">
                    {restData.previous_post['id'] &&
                        <Link to={`/works/${restData.previous_post['slug']}`} className="prev-post">Previous: {restData.previous_post['title']}</Link>
                    }
                </nav>
            </>
        : 
            <Loading />
        }
        </>   
    )
}

export default Post
