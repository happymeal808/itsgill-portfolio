import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../utilities/Loading'
import { restBase, featuredImage } from '../utilities/Utilities'

const Posts = () => {
    const restPath = restBase + 'posts?_embed=true'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
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
                <h1>Works</h1>
                    {restData.map(post => (
                        <article key={post.id} id={`post-${post.id}`}>
                            {post.featured_media !== 0 && post._embedded && (
                                <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(post._embedded['wp:featuredmedia'][0])}></figure>
                            )}
                            <Link to={`/works/${post.slug}`}>
                                <h2>{post.title.rendered}</h2>
                            </Link>
                        </article>
                    ))}
            </>
        : 
            <Loading />
        }
        </>
    )
}

export default Posts
