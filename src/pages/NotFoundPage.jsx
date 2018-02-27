import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = props => (
  <div className="not-found-page">
    <i className="icon exclamation circle"></i>
    <p>Page not found.</p>
    <br/>
    <Link
      to="/"
      className="underline purple"
    >Home</Link>
  </div>
)

export default NotFoundPage
