import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { auth, firestore } from "./firebase";
import { findIndex } from 'lodash';
import './styles/reset.css';
import './styles/global.scss';
import Login from './auth/Login';
import TaskList from './components/TaskList/TaskList';
import Layout from './components/Layout';
import Spinner from './components/Spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  const [user, setUser] = useState(null);
  const prevTodoList = useRef([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChangedTodo, setIsChangedTodo] = useState(false);
  const db = firestore;

  auth.onAuthStateChanged((user) => {
    console.log(user?.email + ": " + user?.displayName + ": " + user?.uid);
    if (user) {
      setIsSignedIn(true);
      setUser(user);
      createFirstList(user.uid);
    } else {
      setIsSignedIn(false);
    }
    setIsLoading(false);
  });

  console.log(user?.email + ": " + user?.displayName + ": " + user?.uid);

  // Update collection data in state based on user status
  useEffect(() => {
    if (auth.currentUser === null) return;
    const unsubscribe = async () => {
      if (auth.currentUser) {
        const unsub = db.collection('todolist').doc(auth.currentUser.uid).onSnapshot(doc => {
          if (doc.exists) {
            if (doc.data().todo.tasks)
              setTodoList(doc.data().todo.tasks);
            console.log("Updating local state from firebase!");
            setIsLoading(false);
          }
          setIsLoading(false);
          return () => unsub();
        });
      }

    };
    return () => unsubscribe();
  }, [db]);

  // Update task
  useEffect(() => {
    (async (user) => {
      if (user) {
        if (areEqual(prevTodoList.current, todoList)) return;
        prevTodoList.current = todoList;
        if (isChangedTodo) {
          (async () => {
            // setIsLoading(true);
            const docRef = db.collection('todolist').doc(user.uid);
            await docRef.update({ todo: { tasks: todoList } });
            console.log("Updating tasks in firebase!");
            setIsLoading(false);
          })();
        }
      }
    })();
  }, [db, isChangedTodo, todoList, user]);


  const registerUser = userName => {
    const FBUser = auth.currentUser;
    if (FBUser === null) return;
    FBUser.updateProfile({
      displayName: userName
    })
    .then(() => {
      setUser({
        ...FBUser,
        // displayName: FBUser.displayName,
      });
    });
  };

  const createFirstList = (user) => {
    if (!!user) {
      // create collection if one doesn't exist
      const collection = firestore.collection('todolist').doc(user);
      if (!collection.exists) {
        firestore.collection('todolist').doc(user).set({
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
    }
  };

  const handleSetTodoList = (_todoList) => {
    setIsChangedTodo(true);
    setTodoList(_todoList);
  };

  const deleteTodo = (index) => {
    setIsChangedTodo(true);
    setTodoList(todoList.filter((todo, i) => i !== index));
  };

  const updateTodo = (todoList) => {
    setIsChangedTodo(true);
    setTodoList([...todoList]);
  };

  const logOutUser = e => {
    e.preventDefault();
    setUser(null);
    auth.signOut();
  };

  const updateTask = (e, id) => {
    e.persist();
    setIsChangedTodo(true);

    let tempTasks = todoList;
    let taskIndex = findIndex(todoList, { id });
    tempTasks[taskIndex]['title'] = e.currentTarget.innerText;

    setTodoList(tempTasks);
    const docRef = db.collection('todolist').doc(user.uid);
    docRef.update({ todo: { tasks: todoList } });
  };

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  console.log(auth.currentUser?.email + ": " + auth.currentUser?.displayName + ": " + auth.currentUser?.uid);

  return (
    <Layout isSignedIn={isSignedIn} logOutUser={logOutUser} user={user}>
      <nav>
        <Router>
          {isSignedIn && <Redirect to="/tasks" />}
          {!isSignedIn && <Redirect to="/signin" />}
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <>
            <Route path="/" />
            <Route path="/tasks" component={() =>
              <TaskList
                user={user}
                isSignedIn={isSignedIn}
                todoList={todoList}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
                updateTask={updateTask}
                handleSetTodoList={handleSetTodoList}
              />} />
            <Route path="/signin" component={() => <Login user={user} registerUser={registerUser} />} />
          </>
        </Router>
      </nav>
    </Layout>
  );
}

export default App;


function areEqual(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index])
  );
}