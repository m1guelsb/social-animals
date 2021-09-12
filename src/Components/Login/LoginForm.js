import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginForm.module.css';
import stylesBtn from '../Forms/Button.module.css';

import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';

import Error from '../Helper/Error';

import { UserContext } from '../../UserContext';
import Head from '../Helper/Head';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validade() && password.validade()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animationLeft">
      <Head title="Login" description="Feed de usuário" />

      <h1 className="title">Login</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Entrando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}

        <Error error={error} />
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">
        Esqueci minha senha
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta?</p>
        <Link className={stylesBtn.button} to="/login/criar">
          Cadastre-se
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
