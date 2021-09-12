import React from 'react';
import Image from '../Helper/Image';

import styles from './FeedPhotosItem.module.css';

const FeedPhotosItem = ({ photo, setModalPhoto }) => {
  function handleClick() {
    //ao clicar na foto pega photo com id dela
    setModalPhoto(photo);
  }

  return (
    <li className={styles.photo} onClick={handleClick}>
      <Image src={photo.src} alt={photo.title} />
      {/* coleta o src e titulo da foto la da api */}
      <span className={styles.views}>{photo.acessos}</span>
      {/* <span>{photo.author}</span> */}
      {/* pega o numero de acessos e autor da foto */}
    </li>
  );
};

export default FeedPhotosItem;
