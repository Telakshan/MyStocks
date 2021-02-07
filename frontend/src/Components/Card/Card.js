import React from 'react'
import './Card.css'

const Card = ({headlines, name}) => {

    const news = headlines.map((h) => <li key={Math.random()}><a href={h.url}>{h.title}</a> </li>)
    return (
        <div className='container'>
            <h3>Trending Articles from the web about {name}</h3>
            {news}        
        </div>
    )
}

export default Card
