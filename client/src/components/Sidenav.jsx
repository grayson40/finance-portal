import styles from '../styles/sidenav.module.css'
import { NavLink } from 'react-router-dom'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import { navData } from '../lib/navData'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';

export default function Sidenav () {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const renderNavItems = () => {
    return navData.map(item => {
      return (
        <NavLink key={item.id} className={styles.sideitem} to={item.link}>
          {item.icon}
          <span className={styles.linkText}>{item.text}</span>
        </NavLink>
      );
    });
  };

  return (
    <div>
      <button className={styles.menuBtn} onClick={toggleOpen}>
        <MenuIcon />
      </button>
      <div className={open ? styles.sidenav : styles.sidenavClosed}>
        <button className={styles.menuBtn} onClick={toggleOpen}>
          {open ? (
            <KeyboardDoubleArrowLeftIcon />
          ) : (
            <KeyboardDoubleArrowRightIcon />
          )}
        </button>
        {renderNavItems()}
      </div>
    </div>
  );
}
