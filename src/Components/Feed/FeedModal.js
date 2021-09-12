import React from 'react';

import styles from './FeedModal.module.css';

import useFetch from '../../Hooks/useFetch';
import { PHOTO_GET } from '../../api';

import Error from '../Helper/Error';
import Loading from '../Helper/Loading';

import PhotoContent from '../Photo/PhotoContent';

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, error, loading, request } = useFetch(); //fetch das foto

  React.useEffect(() => {
    //sempre q o modal for aberto
    const { url, options } = PHOTO_GET(photo.id); //pega url e corpo de uma foto
    request(url, options);
  }, [photo, request]);

  function handleOutsideClick(event) {
    //funsao de click fora usando event target e event currenttarget (quando forem os mesmo seta modal null)
    if (event.target === event.currentTarget) setModalPhoto(null);
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;
