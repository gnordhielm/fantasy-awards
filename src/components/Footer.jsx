import React from 'react'
import { Link } from 'react-router-dom'
import pkg from '../../package'

export const Footer = ({ logout }) => (
  <footer className="footer dark">
    <p>
      Words and code by <a
        href="https://www.gnportfolio.com"
        target="_blank"
        className="underline"
      >Gus</a>.
    </p>
    <p>v{pkg.version}</p>
  </footer>
)

export default Footer
