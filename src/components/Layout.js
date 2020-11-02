import React from 'react';
import Header from './Header';
import {Container, Content} from '../styles/style';

const Layout = ({ isSignedIn, user, children, logOutUser }) => {
  return (
    <>
    <Container>
      <Header isSignedIn={isSignedIn} user={user} logOutUser={logOutUser} />
      <Content>
        {children}
      </Content>
    </Container>
    </>
  );
};

export default Layout;
