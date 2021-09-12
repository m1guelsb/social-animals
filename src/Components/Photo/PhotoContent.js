import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Image from '../Helper/Image';
import PhotoComments from './PhotoComments';
import styles from './PhotoContent.module.css';
import PhotoDelete from './PhotoDelete';

const PhotoContent = ({ data }) => {
  //data refere ao objeto foto

  const user = React.useContext(UserContext);

  const { photo, comments } = data; //do objeto foto pega photo e comentarios

  return (
    <div className={styles.photo}>
      <div className={styles.img}>
        {/* mostra as imagens */}
        <Image src={photo.src} alt={photo.title} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {user.data && user.data.username === photo.author ? (
              <PhotoDelete id={photo.id} />
            ) : (
              <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
            )}
            {/* IF: dados do usuario existem && IF username do user = autor da foto >> photodelete(botao de apagar foto) é exibido || ELSE >> mostra o nome do autor da foto (que é um link para o perfil do mesmo)*/}

            <span className={styles.views}>{photo.acessos}</span>
            {/* exibe o 'acessos' de 'photo' */}
          </p>
          <h1 className="title">
            <Link to={`/photo/${photo.id}`}>{photo.title}</Link>
            {/* h1 com o 'title' de 'photo' que é link pra foto de tal id q ta sendo vista */}
          </h1>
          <ul className={styles.attributes}>
            {/* lista pra exibir mais info de 'photo' */}
            <li>{photo.peso} kg</li>
            <li>{photo.idade} anos</li>
          </ul>
        </div>
      </div>
      <PhotoComments id={photo.id} comments={comments} />
      {/* pega os comments por id da photo e exibe */}
    </div>
  );
};

export default PhotoContent;
