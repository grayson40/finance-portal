import React from 'react'
import ButtonAppBar from './AppBar'
import Sidenav from './Sidenav'
import styles from '../styles/layout.module.css'

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <ButtonAppBar />
      <div className={styles.wrapper}>
        <Sidenav />
        <div className={styles.main}>{children}</div>
      </div>
    </div>
  )
}

export default Layout
