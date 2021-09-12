import React from 'react';
import FeedPhotosItem from './FeedPhotosItem';

import useFetch from '../../Hooks/useFetch';
import { PHOTOS_GET } from '../../api';

import Error from '../Helper/Error';
import Loading from '../Helper/Loading';

import styles from './FeedPhotos.module.css';

const FeedPhotos = ({ page, user, setModalPhoto, setInfinite }) => {
  //passa modal foto no feed pra possibilitar abrir
  const { data, loading, error, request } = useFetch();
  //vai fazer o request logo quando entrar no feed
  React.useEffect(() => {
    async function fetchPhotos() {
      const total = 6; //total de fotos q sao pegadas
      //funsao pra puxar as foto
      const { url, options } = PHOTOS_GET({ page, total, user });
      //pagina refere ao total de numero de fotos q ta sendo mostrado / user se refere as fotos do usuario de id atual
      const { response, json } = await request(url, options); //faz request da url e options do photoget dentro dos parametro
      if (response && response.ok && json.length < total) {
        setInfinite(false);
      }
      //se tudo isso eh vdd setinfite fica false e nao deixa atualiza com scroll os itens da array de novas foto
    }
    fetchPhotos();
  }, [request, user, page, setInfinite]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    //verifica essas 3 condisao e se tem dados, se tiver mostra o feed
    return (
      <>
        {/* <h1 className="title">Feed</h1> */}
        <div className={`${styles.feed} animationLeft`}>
          {data.map((photo) => (
            <FeedPhotosItem
              key={photo.id}
              photo={photo}
              setModalPhoto={setModalPhoto}
            />
            // vai mostrar a foto e tb ativar o modal
          ))}
          {/* faz um map de photo de photoitem com um id pra cada photo e photo = photo */}
        </div>
      </>
    );
  else return null; //setudo for false retorna nulo
};

export default FeedPhotos;
