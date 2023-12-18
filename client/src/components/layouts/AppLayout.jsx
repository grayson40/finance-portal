import React, { useState } from "react";
import ButtonAppBar from "../Appbar";
import Sidenav from "../Sidenav";
import styles from "../../styles/layout.module.css";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <ButtonAppBar setOpen={setOpen} open={open} />
      <div className={styles.wrapper}>
        <Sidenav open={open} />
        <div className={styles.main}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
