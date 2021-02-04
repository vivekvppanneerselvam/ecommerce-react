import React from 'react'
import styles from '../stylesheets/menu.module.sass'
import DropList from './DropList'
import jumpTo from '../../../modules/Navigation'
export default function Menu({
  departments,
  getProductsByCategory,
  getAllProducts
}) {
  return (
    <ul className="navbar-nav">
      <li className="nav-item active"> <a className="nav-link" onClick={() => { getAllProducts(); jumpTo('/dashboard') }}>Home </a> </li>
      {departments && departments.map(d =>
        <li class="nav-item dropdown" key={d.departmentName}>
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{d.departmentName}</a>
          <DropList clickCategory={(c) => getProductsByCategory(c)} department={d.departmentName} categories={d.categories} />
        </li>
      )}
    </ul>
  )
}
