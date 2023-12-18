import styles from "../styles/sidenav.module.css";
import { NavLink } from "react-router-dom";
import { navData } from "../lib/navData";

export default function Sidenav({ open }) {
  const topNavItems = navData.slice(0, -2); // All items except the last two
  const bottomNavItems = navData.slice(-2); // Only the last two items

  const renderNavItems = (items) => {
    return items.map((item) => {
      return (
        <NavLink key={item.id} className={styles.sideitem} to={item.link}>
          {item.icon}
          <span className={styles.linkText}>{item.text}</span>
        </NavLink>
      );
    });
  };

  return (
    <div className={open ? styles.sidenav : styles.sidenavClosed}>
      <div className={styles.topItems}>
        {renderNavItems(topNavItems)}
      </div>
      <div className={styles.bottomItems}>
        {renderNavItems(bottomNavItems)}
      </div>
    </div>
  );
}