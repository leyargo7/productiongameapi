import React from 'react'
import style from './css/Card.module.css'

const Card = ({ name, image, genres}) => {
  return (
    <div className={style.cardContainer}>
        <h1>{name}</h1>
        <img src={image} alt={name}/>
        <h3>{genres.map(c => c).join(', ')}</h3>
    </div>
  )
}

export default Card