import React, { useState, useEffect } from 'react';
import { useFirestore, useUser } from "reactfire";
import { findIndex } from 'lodash';
import './styles/reset.css';
import './styles/global.scss';
import Layout from './components/Layout';
import TaskList from './components/TaskList/TaskList';

function AuthApp({ logOutUser }) {
  const user = useUser();
  const [todoList, setTodoList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(user.uid)) ?? [{
        id: 'lkj645lkj5464lk456jl456',
        title: 'loading...'
      }];
    } catch {
      console.error("The tasks are having issues parsing into JSON.");
      return [{
        id: 'lkj645lkj5464lk456jl456',
        title: 'loading...'
      }];
    }
  });

  const [isChangedTodo, setIsChangedTodo] = useState(false);
  const db = useFirestore();

  // Update tasks in Firebase 
  useEffect(() => {
    if (!isChangedTodo) return;
    const docRef = db.collection('todolist').doc(user.uid);
    (async () => {
      localStorage.setItem(user.uid, JSON.stringify(todoList));
      await docRef.update({ tasks: todoList });
    })();
  }, [db, isChangedTodo, todoList, user]);

  // Update local state from Firebase 
  useEffect(() => {
    if (user === null) return;
    (async () => {
      const response = await db.collection('todolist').doc(user.uid).get();
      const tasks = await response.data()?.tasks;
      tasks && setTodoList(tasks);
    })();
  }, [user, db]);

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
    docRef.update({ tasks: todoList });
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
