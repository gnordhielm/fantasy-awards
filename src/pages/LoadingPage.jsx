import React from 'react'
import ReactLoading from 'react-loading'

const LoadingPage = props => (
  <div className="loading-page">
    <ReactLoading
      color="#000"
      type="bubbles"
      className="loader"
    />
  </div>
)

export default LoadingPage
