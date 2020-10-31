import React from 'react';
import Header from './Header';
import {Container, Content} from '../styles/style';

const Layout = ({ isSignedIn, user, children, handleClearUser }) => {
  return (
    <>
    <Container>
      <Header isSignedIn={isSignedIn} user={user} handleClearUser={handleClearUser} />
      <Content>
        {children}
      </Content>
    </Container>
    </>
  );
};

export default Layout;
