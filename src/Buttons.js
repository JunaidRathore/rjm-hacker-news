import React from 'react'
import { useGlobalContext } from './context'

const Buttons = () => {
  const {handleIncrease,handleDecrease,page,totalPages} = useGlobalContext()
  return <div className="btn-container">
    <button onClick={handleDecrease}>prev</button>
    <p>{page + 1} of {totalPages}</p>
    <button onClick={handleIncrease}>next</button>
  </div>
}

export default Buttons
