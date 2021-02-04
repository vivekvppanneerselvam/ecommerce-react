import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import jumpTo from '../../../modules/Navigation'
import '../stylesheets/dropList.css'

export default function DropList({ department, categories, clickCategory }) {
  return (
    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
      {categories && categories.split(',').map(c =>
        <a key={c} className="dropdown-item" onClick={() => { clickCategory(c); jumpTo('/dashboard') }}>{c}</a>
      )}
    </div>

  )
}


