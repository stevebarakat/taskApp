import React, { useState, Suspense } from 'react';
import { auth, firestore, provider } from "./firebase";
import './styles/reset.css';
import './styles/global.scss';
import Spinner from './components/Spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const AuthApp = React.lazy(() => import("./AuthApp"));
const Login = React.lazy(() => import("./auth/Login"));

export default function App() {
  const [errMsg, setErrMsg] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [user, setUser] = useState(null);

  const handleSetIsNewUser = value => {
    setIsNewUser(value);
  };

  const logOutUser = () => {
    setUser();
    auth.signOut();
  };

  // setUser after login
  auth.onAuthStateChanged(user => user && setUser(user));

  const handleLogin = async (data) => {
    if (isNewUser) {
      auth.createUserWithEmailAndPassword(data.email, data.password)
        .then(() => {
          registerUser(data.displayName);
        })
        .catch(function (error) {
          setErrMsg(error.message);
        });
    } else {
      auth.signInWithEmailAndPassword(data.email, data.password)
        .catch(error => {
          setErrMsg(error.message);
        });
    }
    setErrMsg(null)
  };

  const registerUser = userName => {
    const FBUser = auth.currentUser;
    if (FBUser === null) return;
    FBUser.updateProfile({
      displayName: userName
    })
      .then(() => {
        setUser(FBUser);
      })
      .then(() => {
        const collection = firestore.collection('todolist').doc(FBUser.uid);
        if (!collection.exists) {
          firestore.collection('todolist').doc(FBUser.uid).set({
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
          });
        }
      });
  };

  return user ?
    <Suspense fallback={<span><Spinner /></span>}>
      <AuthApp
        user={user}
        logOutUser={logOutUser}
      />
    </Suspense> :
    <Suspense fallback={<Spinner />}>
      <Login
        isNewUser={isNewUser}
        handleLogin={handleLogin}
        handleSetIsNewUser={handleSetIsNewUser}
        errMsg={errMsg}
      />
    </Suspense>;
}
