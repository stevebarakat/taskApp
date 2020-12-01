import React, { useState, useEffect } from 'react';
import { useFirestore, useUser } from "reactfire";
import { findIndex } from 'lodash';
import './styles/reset.css';
import './styles/global.scss';
import Layout from './components/Layout';
import TaskList from './components/TaskList/TaskList';
import useUpdateFirebase from './hooks/useUpdateFirebase';
import useUpdateLocalState from './hooks/useUpdateLocalState';

function AuthApp({ logOutUser }) {
  const user = useUser();
  const db = useFirestore();
  const initialState = [{
    id: 'lkj645lkj5464lk456jl456',
    title: 'loading...'
  }];
  const [isChangedTodo, setIsChangedTodo] = useState(false);

  const [todoList, setTodoList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(user.uid)) ?? initialState;
    } catch {
      console.error("The tasks are having issues parsing into JSON.");
      return initialState;
    }
  });

  const handleSetTodoList = (_todoList) => {
    setTodoList(_todoList);
  };

  useUpdateLocalState(db, user, handleSetTodoList);

  useUpdateFirebase(db, isChangedTodo, todoList, user);

  const updateTodo = (todoList) => {
    const docRef = db.collection('todolist').doc(user.uid);
    (async () => {
      await docRef.update({ tasks: todoList });
    })();
    setTodoList([...todoList]);
  };

  const updateTask = (e, id) => {
    let tempTasks = todoList;
    let taskIndex = findIndex(todoList, { id });
    tempTasks[taskIndex]['title'] = e.currentTarget.innerText;
    setTodoList(tempTasks);
    const docRef = db.collection('todolist').doc(user.uid);
    docRef.update({ tasks: todoList });
  };

  const deleteTodo = async (index) => {
    const docRef = db.collection('todolist').doc(user.uid);
    setTodoList(await todoList.filter((todo, i) => i !== index));
    await docRef.update({ tasks: todoList.filter((todo, i) => i !== index) });
  };

  console.log(user?.email + ": " + user?.displayName + ": " + user?.uid);

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
