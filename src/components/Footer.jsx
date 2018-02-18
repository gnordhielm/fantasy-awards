import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = ({ logout }) => (
  <footer className="footer dark">
    <Link to="/">Log In</Link>
    <Link to="/">About</Link>
    <p>
      Words and code by <a
        href="https://www.gnportfolio.com"
        target="_blank"
        className="inline"
      >Gus</a>.
    </p>
    {/* <p>&copy; {new Date().getFullYear()}</p> */}
  </footer>
)

export default Footer
