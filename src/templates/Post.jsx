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

    // format date to F Y
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const formattedDate = `${dateString.substring(0, 4)}-${dateString.substring(4, 6)}-${dateString.substring(6, 8)}`;
        const date = new Date(formattedDate);
        const options = { year: 'numeric', month: 'long' };
        return date.toLocaleDateString('en-US', options);
    };
        
    return (
        <>
        { isLoaded ?
            <>
                <article id={`post-${restData.id}`}>
                    <h1>{restData.title.rendered}</h1>
                    {/* work types */}
                    <div className='work-type'>
                        <ul>
                            {restData.acf.works_type.map((type, index) => (
                                <li key={index}>{type}</li>
                            ))}
                        </ul>
                    </div>
                    {/* date complete */}
                    <div>
                    {restData.acf.date_complete && 
                        <p>{formatDate(restData.acf.date_complete)}</p>
                    }
                    </div>
                    <div>
                    {restData.acf.project_description && 
                        <p>{restData.acf.project_description}</p>
                    }
                    </div>
                    <div>
                    {restData.acf.reflection && 
                        <p>{restData.acf.reflection}</p>
                    }
                    </div>
                    {restData.acf.live_site && (
                        <a href={restData.acf.live_site} target="_blank" rel="noopener noreferrer">{restData.acf.live_site}</a>
                    )}
                    {restData.acf.github_repo && (
                        <a href={restData.acf.github_repo} target="_blank" rel="noopener noreferrer">{restData.acf.github_repo}</a>
                    )}
                </article>
                <nav className="posts-navigation">
                    {restData.previous_post && restData.previous_post.id && (
                        <Link to={`/works/${restData.previous_post.slug}`} className="prev-post">
                            {restData.previous_post.title}
                        </Link>
                    )}
                    {restData.next_post && restData.next_post.id && (
                        <Link to={`/works/${restData.next_post.slug}`} className="next-post">
                            {restData.next_post.title}
                        </Link>
                    )}
                </nav>
            </>
        : 
            <Loading />
        }
        </>   
    )
}

export default Post
