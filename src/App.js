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
  const prevTodoList = useRef([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChangedTodo, setIsChangedTodo] = useState(false);
  const db = firestore;

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        setIsSignedIn(true);
        setUser(user);
      } else {
        setIsSignedIn(false);
      }
      // setIsLoading(false);
    });
  }, []);

  // Update collection data in state based on user status
  useEffect(() => {
    if (user == null) return;
    (async () => {
      db.collection('todolist').doc(auth.currentUser.uid).onSnapshot(doc => {
        if (doc.exists) {
          if (doc.data().todo.tasks)
            setTodoList(doc.data().todo.tasks);
          console.log("Updating local state from firebase!");
          // setIsLoading(false);
        }
        // setIsLoading(false);
      });

    })();
  }, [db, user]);

  // Update task
  useEffect(() => {
    if (user == null) return;
    if (areEqual(prevTodoList.current, todoList)) return;
    prevTodoList.current = todoList;
    if (isChangedTodo) {
      (async () => {
        // setIsLoading(true);
        const docRef = db.collection('todolist').doc(auth.currentUser.uid);
        await docRef.update({ todo: { tasks: todoList } });
        console.log("Updating tasks in firebase!");
        setIsLoading(false);
      })();
    }
  }, [db, isChangedTodo, todoList, user]);

  const registerUser = (errMsg, userName) => {
    if (errMsg) return;
    auth.onAuthStateChanged(user => {
      user.updateProfile({
        displayName: userName
      }).then(() => {
        setUser({
          user: user,
          displayName: user.displayName,
          userId: user.uid
        });
      });
    });
  };

  const handleSetIsChangedTodo = (value) => {
    setIsChangedTodo(value);
  };

  const handleSetTodoList = (_todoList) => {
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

  const updateTask = (e, id) => {
    e.persist();
    setIsChangedTodo(true);

    let tempTasks = todoList;
    let taskIndex = findIndex(todoList, { id });
    tempTasks[taskIndex]['title'] = e.currentTarget.innerText;

    setTodoList(tempTasks);
    const docRef = db.collection('todolist').doc(auth.currentUser.uid);
    docRef.update({ todo: { tasks: todoList } });
  };

  // if (isLoading) {
  //   return (
  //     <div>
  //       <Spinner />
  //     </div>
  //   );
  // }

  return (
    <Layout isSignedIn={isSignedIn} user={user}>
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
                handleSetIsChangedTodo={handleSetIsChangedTodo}
                handleSetTodoList={handleSetTodoList}
              />} />
            <Route path="/signin" component={() => <Login registerUser={registerUser} />} />
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