import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../utilities/Loading'
import { restBase, featuredImage } from '../utilities/Utilities'

const Posts = () => {
    const restPath = restBase + 'posts?_embed=true'
    const metadataPath = restBase + 'pages?slug=works'
    const [restData, setData] = useState([])
    const [pageTitle, setPageTitle] = useState('')
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postsResponse, metadataResponse] = await Promise.all([
                    fetch(restPath),
                    fetch(metadataPath)
                ])

                if (postsResponse.ok && metadataResponse.ok) {
                    const postsData = await postsResponse.json()
                    const metadataData = await metadataResponse.json()
                    
                    setData(postsData)
                    if (metadataData.length > 0) {
                        setPageTitle(metadataData[0].title.rendered)
                    }
                    setLoadStatus(true)
                } else {
                    setLoadStatus(false)
                }
            } catch (error) {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath, metadataPath])
    
    return (
        <>
        { isLoaded ? (
            <>
                <h1>{pageTitle}</h1>
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
        ) : (
            <Loading />
        )}
        </>
    )
}

export default Posts
