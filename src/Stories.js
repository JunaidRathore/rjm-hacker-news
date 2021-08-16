import React from 'react'

import { useGlobalContext } from './context'

const Stories = () => {
  const {loading,stories,removeHandle} = useGlobalContext()
  if(loading){
    return <div className="loading"></div>
  }
  return <section className="stories">
    {
      stories.map(story=>{
        const {objectID,title,points,author,num_comments,url} = story
        return <article className="story" key={objectID}>
          <h4 className="title">{title}</h4>
          <p className="info">
            {points} points by <span>{author} | </span> {num_comments} comments
          </p>
          <div>
            <a className="read-link" target="_blank" href={url} rel="noopener noreferrer">read more</a>
            <button className="remove-btn" onClick={()=>removeHandle(objectID)}>remove</button>
          </div>
        </article>
      })
    }
  </section>
}

export default Stories
