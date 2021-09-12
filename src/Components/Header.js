import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';

import { ReactComponent as DogsLogo } from '../Assets/dogs.svg';

import { UserContext } from '../UserContext';

const Header = () => {
  const { data } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Dogs - Home">
          <DogsLogo />
        </Link>

        <p>Bem-vinde {data && data.username}</p>

        {data ? (
          <Link className={styles.login} to="/conta">
            Minha Conta
          </Link>
        ) : (
          <Link className={styles.login} to="/login">
            Login / Cadastrar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
