import React from 'react';
import ButtonAppBar from './Appbar';
import Sidenav from './Sidenav';
import styles from '../styles/layout.module.css';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <ButtonAppBar />
      <div className={styles.wrapper}>
        <Sidenav />
        <div className={styles.main}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
