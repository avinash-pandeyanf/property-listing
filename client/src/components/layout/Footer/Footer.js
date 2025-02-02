import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Property Listing. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
