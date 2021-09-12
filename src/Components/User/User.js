import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Feed from '../Feed/Feed';
import Head from '../Helper/Head';
import NotFound from '../NotFound';
import UserHeader from './UserHeader';
import UserPhotoPost from './UserPhotoPost';

const User = () => {
  const { data } = React.useContext(UserContext);

  return (
    <section className="container">
      <Head title="Minha conta" description="Conta do usuário" />

      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />}></Route>
        <Route path="postar" element={<UserPhotoPost />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
