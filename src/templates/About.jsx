import { useState, useEffect } from 'react'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'

const About = () => {
    const restPath = restBase + 'pages/18'
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
                <div>
                {restData.acf.about_paragraph && 
                    <p>{restData.acf.about_paragraph}</p>
                }
                </div>
                {restData.acf.portrait && 
                    <p>{restData.acf.portrait}</p>
                }
                {restData.acf.passion_project && 
                    <p>{restData.acf.passion_project}</p>
                }
            </article>
        : 
            <Loading />
        }
        </>
    )
}

export default About
