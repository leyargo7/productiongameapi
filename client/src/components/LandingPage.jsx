import React from 'react'
import { Link } from 'react-router-dom'
import style from './css/Landing.module.css'

const LandingPage = () => {
  
  return (
    <div className={style.container}>
        <div className={style.title}>
          <h1>Welcome...!</h1>
        </div>
        <Link to='/home'>
          <button className={style.btnStart}>Start</button>
        </Link>
    </div>
  )
}

export default LandingPage