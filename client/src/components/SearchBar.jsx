import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getNameVideogame } from '../actions'
import style from './css/Search.module.css'

const SearchBar = () => {

    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handleInputChange = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getNameVideogame(name))
        setName('')
    }


  return (
    <div className={style.search}>
        <input type="text" 
        placeholder="Search..."
        value={name}
        onChange={e=>handleInputChange(e)}
        />

        <button type='submit' onClick={e=>handleSubmit(e)}>Search</button>
    </div>
  )
}

export default SearchBar