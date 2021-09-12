import React from 'react';

import styles from './PhotoDelete.module.css';

import useFetch from '../../Hooks/useFetch';
import { PHOTO_DELETE } from '../../api';

const PhotoDelete = ({ id }) => {
  //funcao para apagar foto existente no server com id igual ao inserido como parametro
  const { loading, request } = useFetch(); //pega loading e request do fetch

  async function handleClick() {
    const confirm = window.confirm('Tem certeza que quer apagar?'); //funcao nativa pra perguntar ao user se tem certeza
    if (confirm) {
      const { url, options } = PHOTO_DELETE(id); //pega url e options da requisicao
      const { response } = await request(url, options); //pega a resposta que vem do request
      if (response.ok) window.location.reload(); //se a resposta for ok, recarrega a pagina local
    }
  }

  return (
    <>
      {loading ? ( //se tiver carregando
        <button disabled onClick={handleClick} className={styles.delete}>
          Apagando...
        </button>
      ) : (
        //se nao tiver carregando
        <button onClick={handleClick} className={styles.delete}>
          Apagar
        </button>
      )}
    </>
  );
};

export default PhotoDelete;
