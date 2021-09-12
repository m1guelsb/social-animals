import React from 'react';
import styles from './UserPhotoPost.module.css';

import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';

import { PHOTO_POST } from '../../api';

import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import { useNavigate } from 'react-router';
import Head from '../Helper/Head';

const UserPhotoPost = () => {
  const nome = useForm(); //pega useform pra ter estado
  const peso = useForm('number'); //e validar o valor nos input do form
  const idade = useForm('number');
  const [img, setImg] = React.useState({
    //estado e mudador de estado pra img
  });
  const { data, error, loading, request } = useFetch(); //desestrutura e pega funsoes do useFetch

  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate('/conta');
  }, [data, navigate]);

  function handleSubmit(event) {
    //funsao pra lidar com acao do form pra enviar inputs
    event.preventDefault(); //previnir o comportamento padrao
    const formData = new FormData(); //nao da pra enviar como json pois tem uma image, entao tem q enviar como formdata
    //FormData transforma os input em objeto e usa como chave a propriedade 'name' dos elemento e os valor como valor, e codifica conteudo de entrada de arquivo (como img)
    formData.append('img', img.raw); //append atribui a chave, valor (nesse caso o valor da imagem eh )
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);

    const token = window.localStorage.getItem('token'); //seleciona o token guardado no localstore dps de logar
    const { url, options } = PHOTO_POST(formData, token); //ativa o post da foto passando seus parametros: form data como corpo e token pra validar
    request(url, options); //pede conexao com o url enviando options pra validar token e enviar dados
  }

  function handleImgChange({ target }) {
    //assao do input img, pega o target (proprio elemento onde sera usado)
    setImg({
      //muda o estado do elemento img
      preview: URL.createObjectURL(target.files[0]), //transforma files em url pra mostrar como preview
      raw: target.files[0], //raw é o conteudo // no [0] passa sempre a primeira posição pois target retorna um array de files
    });
  }

  return (
    <section className={`${styles.photoPost} animationLeft`}>
      <Head title="Poste sua foto" description="Post de fotos" />

      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        {/* necessario desestruturar o effect do use form aqui para que os valores sejam enchidos */}
        <Input label="Peso" type="number" name="peso" {...peso} />
        <Input label="Idade" type="number" name="idade" {...idade} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        ></input>
        {loading ? (
          <Button disabled>Postando...</Button>
        ) : (
          <Button>Postar</Button>
        )}
        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          //se o preview existe mostra preview
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
