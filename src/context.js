import React, { useContext, useEffect, useReducer,useState } from 'react'

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'
import reducer from './reducer'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'

const initialState = {}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [page,setPage] = useState(0)
  const [query,setQuery] = useState('web development')
  const [stories,setStories] = useState([])
  const [loading,setLoading] = useState(false)
  const [totalPages,setTotalPages] = useState('0')
    const fetchData= async()=>{
      setLoading(true)
    const pageUrl = `&page=${page}`
    const queryUrl = `&query=${query}`
    let url = `${API_ENDPOINT}${queryUrl}${pageUrl}`
    try{
      const res = await fetch(url)
      const stories = await res.json()
      setStories(stories.hits)
      setTotalPages(stories.nbPages)
    }
    catch (err){
      console.log(err)
      setLoading(true)
    }
    setLoading(false)
  }
  useEffect(()=>{
    fetchData()
  },[page,query])
  const handleChange=(e)=>{
    setQuery(e.target.value)
    setPage(0)
  }
  const handleIncrease =()=>{
    if(page >=totalPages-1){
      setPage(0)
    }else{
    setPage(page +1)
    }
  }
  const handleDecrease =()=>{
    if(page <= 0){
      setPage(totalPages-1)
    }
    else{
      setPage(page -1)
    }
  }
  const removeHandle=(id)=>{
    console.log(id)
    const newStories = stories.filter(story=>story.objectID !== id)
    setStories(newStories)
  }
  return <AppContext.Provider 
  value={{
    query,
    loading,
    stories,page,totalPages,
    handleChange,handleDecrease,handleIncrease,removeHandle

  }}
  >{children}
  </AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
