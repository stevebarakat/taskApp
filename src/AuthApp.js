import React, { useState, useEffect } from 'react';
import { auth, firestore } from "./firebase";
import { findIndex } from 'lodash';
import './styles/reset.css';
import './styles/global.scss';
import Layout from './components/Layout';
import TaskList from './components/TaskList/TaskList';

function AuthApp({ user, handleSetUser }) {
  const [todoList, setTodoList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("todoList")) ?? [];
    } catch {
      console.error("The tasks are having issues parsing into JSON.");
      return [];
    }
  });
  const [isChangedTodo, setIsChangedTodo] = useState(false);
  const db = firestore;

  // Update tasks in Firebase 
  useEffect(() => {
    if (!isChangedTodo) return;
    (async () => {
      const docRef = db.collection('todolist').doc(user.uid);
      localStorage.setItem("todoList", JSON.stringify(todoList));
      await docRef.update({ todo: { tasks: todoList } });
    })();
  }, [db, isChangedTodo, todoList, user]);

  // Update local state from Firebase 
  useEffect(() => {
    (async () => {
      const response = await db.collection('todolist').doc(user.uid).get();
      if (response.data().todo.tasks) setTodoList(response.data().todo.tasks);
    })();
  }, [user, db]);

  const logOutUser = () => {
    setTodoList([]);
    handleSetUser();
    auth.signOut();
  };

  const handleSetTodoList = (_todoList) => {
    setIsChangedTodo(true);
    setTodoList(_todoList);
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
    const docRef = db.collection('todolist').doc(user.uid);
    docRef.update({ todo: { tasks: todoList } });
  };

  const deleteTodo = (index) => {
    setIsChangedTodo(true);
    setTodoList(todoList.filter((todo, i) => i !== index));
  };

  console.log(user?.email + ": " + user?.displayName + ": " + user?.uid);
  // console.log(todoList);

  return (
    <Layout logOutUser={logOutUser} user={user}>
      <TaskList
        todoList={todoList}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        updateTask={updateTask}
        handleSetTodoList={handleSetTodoList}
      />
    </Layout>
  );
}

export default AuthApp;
