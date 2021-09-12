import React from 'react';

import styles from './PhotoComments.module.css';

import { UserContext } from '../../UserContext';
import PhotoCommentsForm from './PhotoCommentsForm';

const PhotoComments = (props) => {
  //pega as prop de photo la de photocontent (pq ta conectado)
  const [comments, setComments] = React.useState(() => props.comments); //define o estado inicial com valor de comments
  //so mostra form caso tenha user logado
  const commentsSection = React.useRef(null); //use ref pra pegar como referencia a sessao de comentario
  const { login } = React.useContext(UserContext); //pega estado de login la do contexto

  React.useEffect(() => {
    //sempre 'comments' mudar (novo comentario adicionado)
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight; //o valor atual do scrol = valor pego na referencia do hook useRef
  }, [comments]);

  return (
    <>
      <ul ref={commentsSection} className={styles.comments}>
        {/* pegando referencia dessa caixa de comentario */}
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && <PhotoCommentsForm id={props.id} setComments={setComments} />}
    </>
  ); //se tiver login mostra form
};

export default PhotoComments;
