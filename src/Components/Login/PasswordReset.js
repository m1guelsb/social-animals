import React from 'react';

import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';

import Input from '../Forms/Input';
import Button from '../Forms/Button';
import { PASSWORD_RESET } from '../../api';
import Error from '../Helper/Error';
import { useNavigate } from 'react-router-dom';
import Head from '../Helper/Head';

const PasswordReset = () => {
  const [login, setLogin] = React.useState('');
  const [key, setKey] = React.useState('');
  const password = useForm();
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search); //pega o parametro da url
    const key = params.get('key'); //pega a key dentro do parametro
    const login = params.get('login'); //pega login dentro do parametro

    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (password.validade()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });
      const { response } = await request(url, options);
      if (response.ok) navigate('/login');
      window.alert('Entre com a sua nova senha');
    }
  }

  return (
    <div>
      <Head title="Redefinir senha" description="Redefinir senha" />

      <h1 className="title">Redefinir Senha</h1>

      <form onSubmit={handleSubmit}>
        <Input
          label="Insira sua nova senha"
          type="password"
          name="password"
          {...password}
        />
        {loading ? (
          <Button disabled>Redefinindo Senha...</Button>
        ) : (
          <Button>Redefinir Senha</Button>
        )}
      </form>
      <Error error={error} />
    </div>
  );
};

export default PasswordReset;
