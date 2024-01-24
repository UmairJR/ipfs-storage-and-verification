import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

function Index() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>⁂<span>IPFS Hash Storage System</span>⁂</h1>
      </header>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}><Link href="/upload"><p className={styles.navLink}>Upload</p></Link></li>
          <li className={styles.navItem}><Link href="/verify"><p className={styles.navLink}>Verify</p></Link></li>
        </ul>
      </nav>
      <p className={styles.content}>Welcome to the IPFS Hash Storage System. Choose an option from the navigation above.</p>
    </div>
  );
}

export default Index;