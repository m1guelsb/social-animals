import React from 'react';

import styles from './Footer.module.css';

import { ReactComponent as Logo } from '../Assets/dogs-footer.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Logo />
      <p>Alguns direitos reservados.</p>
    </footer>
  );
};

export default Footer;
