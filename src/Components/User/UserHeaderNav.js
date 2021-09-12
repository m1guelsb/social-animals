import React from 'react';
import { NavLink } from 'react-router-dom';

import { UserContext } from '../../UserContext';

import { ReactComponent as MinhasFotos } from '../../Assets/feed.svg';
import { ReactComponent as Estatisticas } from '../../Assets/estatisticas.svg';
import { ReactComponent as AdicionarFoto } from '../../Assets/adicionar.svg';
import { ReactComponent as Sair } from '../../Assets/sair.svg';

import styles from './UserHeaderNav.module.css';
import useMedia from '../../Hooks/useMedia';

import { useLocation } from 'react-router-dom';

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);
  //seleciona funsao de logout la do UserContext

  const mobile = useMedia('(max-width: 40rem)'); //'mobile' recebe a funcao com seu parametro de ativacao
  const [mobileMenu, setMobileMenu] = React.useState('false'); //estado pra saber se o mobileMenu ta aberto ou fechado(true or false)
  const { pathname } = useLocation();
  //seleciona pathname(nome da url) la do useLocation
  React.useEffect(() => {
    setMobileMenu(false);
    //efeito colateral pra quando pathname(nome da url) mudar, o menu mobile fecha
  }, [pathname]);

  return (
    <>
      {/* envolve em fragmento quando tiver 2 tag pra retornar */}
      {mobile && (
        // se mobile for true botao aparece
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
            //se mobileMenu true vai ter estilo de ativo
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
          //ao clicar o setmobile é setado pra o contario de mobilemenu criando um toggle
        ></button>
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        {/* IF mobile = true{ .navMobile ELSE .nav} // 
        IF mobileMenu=true ENTAO .navMobileActive */}
        <NavLink to="/conta" end>
          <MinhasFotos />
          {mobile && 'Minhas fotos'}
          {/* se mobile for true o texto eh exibido */}
        </NavLink>

        <NavLink to="/conta/postar">
          <AdicionarFoto />
          {mobile && 'Adicionar foto'}
        </NavLink>
        <button onClick={userLogout}>
          <Sair />
          {mobile && 'Sair'}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
