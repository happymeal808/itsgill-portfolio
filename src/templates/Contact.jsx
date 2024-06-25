import { useState, useEffect } from 'react'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'

const Services = () => {
    const restPath = restBase + 'pages/20'
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
            <article id={`post-${restData.id}`}>
                <h1>{restData.title.rendered}</h1>
                <ul>
                {restData.acf.email && (
                    <li><a href={restData.acf.email} target="_blank" rel="noopener noreferrer">Email</a></li>
                )}
                {restData.acf.resume && (
                    <li><a href={restData.acf.resume} target="_blank" rel="noopener noreferrer">Resume</a></li>
                )}                 
                {restData.acf.linkedin && (
                    <li><a href={restData.acf.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                )}
                {restData.acf.github && (
                    <li><a href={restData.acf.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
                )}
                </ul>
            </article>
        : 
            <Loading />
        }
        </>
    )
}

export default Services
