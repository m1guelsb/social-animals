import React from 'react';

import styles from './Image.module.css';

const Image = ({ alt, ...props }) => {
  //alt e todas outras propriedades
  const [skeleton, setSkeleton] = React.useState(true);

  function handleLoad({ target }) {
    setSkeleton(false);
    target.style.opacity = 1; //ativa opacidade do target (img)
  }

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton}></div>}
      <img onLoad={handleLoad} className={styles.img} alt={alt} {...props} />
      {/* evento de onload: ativa sempre q a img for carregado */}
    </div>
  );
};

export default Image;
