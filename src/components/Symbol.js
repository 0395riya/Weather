import React from 'react'
import './Symbol.css'

const Symbol = ({text}) => {
  return (
    <div className="symbol">
    <div className="arrow">{text}</div>
  </div>
  )
}

export default Symbol