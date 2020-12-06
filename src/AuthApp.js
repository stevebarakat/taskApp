import React, { useState } from 'react';
import { useFirestore, useUser } from "reactfire";
import { findIndex } from 'lodash';
import './styles/reset.css';
import './styles/global.scss';
import Layout from './components/Layout';
import TaskList from './components/TaskList/TaskList';
import useUpdateLocalState from './hooks/useUpdateLocalState';
import useUpdateFirebase from './hooks/useUpdateFirebase';

function AuthApp({ logOutUser }) {
  const user = useUser();
  const db = useFirestore();
  const initialState = [{
    id: 'lkj645lkj5464lk456jl456',
    title: 'loading...'
  }];

  const [isChangedTask, setIsChangedTask] = useState(false);
  const [taskList, setTaskList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(user.uid)) ?? initialState;
    } catch {
      console.error("The tasks are having issues parsing into JSON.");
      return initialState;
    }
  });

  useUpdateLocalState(db, user, taskList, handleSetTaskList);
  useUpdateFirebase(taskList, isChangedTask);

  function handleSetTaskList (_taskList) {
    setTaskList(_taskList);
  };

  const updateTaskList = (taskList) => {
    const docRef = db.collection('tasklist').doc(user.uid);
    (async () => {
      await docRef.update({ tasks: taskList });
    })();
    setIsChangedTask(true);
    setTaskList([...taskList]);
  };

  const updateTask = (e, id) => {
    let tempTasks = taskList;
    let taskIndex = findIndex(taskList, { id });
    tempTasks[taskIndex]['title'] = e.currentTarget.innerText;
    setTaskList(tempTasks);
    const docRef = db.collection('tasklist').doc(user.uid);
    docRef.update({ tasks: taskList });
    setIsChangedTask(true);
  };

  const deleteTodo = async (index) => {
    const docRef = db.collection('tasklist').doc(user.uid);
    setTaskList(await taskList.filter((task, i) => i !== index));
    await docRef.update({ tasks: taskList.filter((task, i) => i !== index) });
    setIsChangedTask(true);
  };

  console.log(user?.email + ": " + user?.displayName + ": " + user?.uid);

  return (
    <Layout logOutUser={logOutUser} user={user}>
      <TaskList
        taskList={taskList}
        deleteTodo={deleteTodo}
        updateTaskList={updateTaskList}
        updateTask={updateTask}
        handleSetTaskList={handleSetTaskList}
      />
    </Layout>
  );
}

export default AuthApp;
