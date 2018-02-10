import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = props => (
  <div>
    <h3>Page not found.</h3>
    <Link to="/">Home</Link>
  </div>
)

export default NotFoundPage
