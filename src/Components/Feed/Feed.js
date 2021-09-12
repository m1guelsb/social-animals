import React from 'react';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';
import PropTypes from 'prop-types';

const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null); //estado pra so mostrar o modal de foto com id da foto quando modal for true (pra n da erro de undefined no id)

  const [pages, setPages] = React.useState([1]); //pra setar o numero de pages que aparecem adicionando em um array
  const [infinite, setInfinite] = React.useState(true); //pra definir se continua ou nao add valores

  //scroll infinit
  React.useEffect(() => {
    let wait = false;
    function infiniteScroll() {
      if (infinite) {
        const scroll = window.scrollY; //pegar o total de scroll da page
        const height = document.body.offsetHeight - window.innerHeight; //calcula a altura do body subtraindo o tamanho da janela pra saber a altura total atual
        if (scroll > height * 0.75 && !wait) {
          //o scroll estiver em 75% da janela atual e se wait for false
          setPages((pages) => [...pages, pages.length + 1]); //adiciona + 1 (page) na array pages
          wait = true; //quando ativa uma vez wait fica verdadeiro e nao ativa mais
          setTimeout(() => {
            wait = false;
          }, 500); //dps de 500ms o wait fica falso e ativa o if dnv
        }
      }
    }
    window.addEventListener('wheel', infiniteScroll);
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      //adiciona e limpa eventos/ se n limpar no return o evento continua ativo e eh ruim
      window.removeEventListener('wheel', infiniteScroll);
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [infinite]);

  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {/* se modalphoto for true mostra o modal com valor de modalphoto q eh a foto
      e set modal pra funsao de click fora */}
      {pages.map((page) => (
        <FeedPhotos
          key={page}
          user={user}
          page={page}
          setModalPhoto={setModalPhoto}
          setInfinite={setInfinite}
        />
      ))}
      {/* pra ativar modal atraves do feed passa setmodalphoto */}

      {!infinite && !user && (
        <p
          style={{
            textAlign: 'center',
            padding: '2rem 0 4rem 0',
            color: '#888',
          }}
        >
          Não existem mais postagens.
        </p>
      )}
    </div>
  );
};

Feed.defaultProps = {
  user: 0,
};

Feed.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};

export default Feed;
