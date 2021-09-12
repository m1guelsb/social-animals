import React from 'react';
import styles from './PhotoCommentsForm.module.css';
import { ReactComponent as Enviar } from '../../Assets/enviar.svg';

import useFetch from '../../Hooks/useFetch';
import { COMMENT_POST } from '../../api';

import Error from '../Helper/Error';

const PhotoCommentsForm = ({ id, setComments }) => {
  //pega id la de fotocoments pq ta conectado
  //pra posta comentario precisa saber o id da foto q ta comentano
  const [comment, setComment] = React.useState(''); //estado do comentario comesado por vazio
  const { request, error } = useFetch(); //pra comentar precisa fazer um fetch de valores
  //do usefetch pega o request e error

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment }); //pega o url options com id e comment desestruturado direto do body
    const { response, json } = await request(url, options);
    if (response.ok) {
      setComment('');
      //se tiver resposta sem erro
      setComments((comments) => [...comments, json]); //estado de comments muda pra comentarios antigos desestruturados + comentario novo com author em json
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        id="comment"
        name="comment"
        placeholder="Faça um comentário..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        //muda o estado de comment inserindo valor no textarea(target) ao ter mudança (inserir alguma coisa)
      />
      <button className={styles.button}>
        <Enviar />
      </button>
      <Error error={error} />
    </form>
  );
};

export default PhotoCommentsForm;
