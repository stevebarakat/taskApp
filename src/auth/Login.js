import React, { useState } from 'react';
import { Center, TextInput, Field, InputIcon, Flex, ErrorMessage } from '../styles/style';
import { auth, firestore, provider } from '../firebase';
import Modal from './Modal';
import { Button, BtnLink, Label } from '../styles/style';
import ForgotPassword from './ForgotPassword';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import Spinner from '../components/Spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useForm } from 'react-hook-form';

const Login = ({ registerUser }) => {
  const { register, handleSubmit } = useForm();
  const [isToggled, setToggle] = useState(false);
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (login) {
        auth.signInWithEmailAndPassword(data.email, data.password)
          .catch(error => {
            setErrMsg(error.message);
          });
      } else {
        auth.createUserWithEmailAndPassword(data.email, data.password)
          .then(() => {
            registerUser(errMsg, data.displayName);
          })
          .then(() => handleFirstLogin())
          .catch(function (error) {
            setErrMsg(error.message);
          })
      }
    } catch (error) {
      setErrMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFirstLogin = () => {
    return auth.onAuthStateChanged(async user => {
      if (!user) return;
      // create collection if one doesn't exist
      const collection = firestore.collection('todolist').doc(user.uid);
      if (!collection.exists) {
        await firestore.collection('todolist').doc(user.uid).set({
          todo: {
            tasks: [
              {
                id: 'lkj645lkj5464lk456jl456',
                title: 'Example task, click to edit'
              },
              {
                id: '097gdf08g7d90f8g7df098g7y',
                title: 'Use the button on the left to delete'
              },
              {
                id: 'kljngfifgnwrt6469fsd5ttsh',
                title: 'Use the handle on the right to drag'
              },
            ]
          }
        });
      }
    });
  };

  const googleSignIn = async () => {
    setIsLoading(true);
    await auth.signInWithPopup(provider);
  };

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <Center style={{ padding: "0.5rem" }}>
        <BtnLink onClick={() => setLogin(login => !login)}>{login ? "need to create an account?" : "already have an account?"}</BtnLink>
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!login && <Field>
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
          <Button type="submit">{login ? "login" : "create account"}</Button>
        </Flex>
      </form>
      <Flex>
        <Button google btnType="google" onClick={googleSignIn}>Sign in with Google</Button>
      </Flex>
      <BtnLink
        secondary
        style={{ marginTop: "1.5rem" }}
        onClick={() => setToggle(true)}
      >Forgot Password?</BtnLink>
      <Modal isToggled={isToggled} setToggle={setToggle}>
        <ForgotPassword />
      </Modal>
    </div>
  );
};

export default Login;
