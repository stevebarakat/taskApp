import React, { useState } from 'react';
import { Center, TextInput, Field, InputIcon, Flex, ErrorMessage } from '../styles/style';
import Modal from './Modal';
import Layout from '../components/Layout';
import { Button, BtnLink, Label } from '../styles/style';
import PasswordReset from './PasswordReset';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import { useForm } from 'react-hook-form';

const Login = ({ isNewUser, handleLogin, handleSetIsNewUser, errMsg }) => {
  const { register, handleSubmit } = useForm();
  const [isToggled, setToggle] = useState(false);

  return (
    <Layout>
      <div style={{ padding: "1rem" }}>
        <Center style={{ padding: "0.5rem" }}>
          <BtnLink onClick={() => handleSetIsNewUser(isNewUser => !isNewUser)}>{!isNewUser ? "need to create an account?" : "already have an account?"}</BtnLink>
        </Center>
        <form onSubmit={handleSubmit(handleLogin)}>
          {isNewUser && <Field>
            <InputIcon><FaUser /></InputIcon>
            <TextInput
              signIn
              type="text"
              name="displayName"
              placeholder=" "
              autoComplete="off"
              ref={register}
              required />
            <Label htmlFor="displayName">Name</Label>

          </Field>}
          <Field>
            <InputIcon><MdEmail /></InputIcon>
            <TextInput
              signIn
              type="email"
              name="email"
              placeholder=" "
              ref={register}
              autoComplete="off"
              required />
            <Label htmlFor="email">Email</Label>
          </Field>
          <Field>
            <InputIcon><RiLockPasswordFill /></InputIcon>
            <TextInput
              signIn
              type="password"
              name="password"
              placeholder=" "
              autoComplete="off"
              ref={register}
              required />
            <Label htmlFor="password">Password</Label>
          </Field>
          {errMsg && <ErrorMessage>{errMsg}</ErrorMessage>}
          <Flex>
            <Button type="submit">{isNewUser ? "create account" : "sign in"}</Button>
          </Flex>
        </form>
        <BtnLink
          secondary
          style={{ marginTop: "1.5rem" }}
          onClick={() => setToggle(true)}
        >Forgot Password?</BtnLink>
        <Modal isToggled={isToggled} setToggle={setToggle}>
          <PasswordReset />
        </Modal>
      </div>
    </Layout>
  );
};

export default Login;
