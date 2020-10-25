import React from 'react';
import Header from './Header';
import {Container, Content} from '../styles/style';

const Layout = ({ isSignedIn, user, children }) => {
  return (
    <>
    <Container>
      <Header isSignedIn={isSignedIn} user={user} />
      <Content>
        {children}
      </Content>
    </Container>
    </>
  );
};

export default Layout;
