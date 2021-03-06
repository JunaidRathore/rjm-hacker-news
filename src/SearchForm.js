import React from 'react'
import { useGlobalContext } from './context'

const SearchForm = () => {
  const {query,handleChange} = useGlobalContext()
  return <form className="search-form">
    <h2>search hacker news</h2>
    <input type='text' className="form-input" value={query} style={{'outline':'0'}} onChange={handleChange}/>
  </form>
}

export default SearchForm
