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
  const initialTasks = [
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
  ];

  const [taskList, setTaskList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(user.uid)) ?? initialTasks;
    } catch {
      console.error("The tasks are having issues parsing into JSON.");
      return initialState;
    }
  });

  useUpdateLocalState(db, user, taskList, handleSetTaskList);
  useUpdateFirebase(taskList);

  function handleSetTaskList (_taskList) {
    setTaskList(_taskList);
  };

  const updateTaskList = (taskList) => {
    const docRef = db.collection('tasklist').doc(user.uid);
    (async () => {
      await docRef.update({ tasks: taskList });
    })();
    setTaskList([...taskList]);
  };

  const updateTask = (e, id) => {
    let tempTasks = taskList;
    let taskIndex = findIndex(taskList, { id });
    tempTasks[taskIndex]['title'] = e.currentTarget.innerText;
    setTaskList(tempTasks);
    const docRef = db.collection('tasklist').doc(user.uid);
    docRef.update({ tasks: taskList });
  };

  const deleteTask = async (index) => {
    const docRef = db.collection('tasklist').doc(user.uid);
    setTaskList(await taskList.filter((task, i) => i !== index));
    await docRef.update({ tasks: taskList.filter((task, i) => i !== index) });
  };

  console.log(user?.email + ": " + user?.displayName + ": " + user?.uid);

  return (
    <Layout logOutUser={logOutUser} user={user}>
      <TaskList
        taskList={taskList}
        deleteTask={deleteTask}
        updateTaskList={updateTaskList}
        updateTask={updateTask}
        handleSetTaskList={handleSetTaskList}
      />
    </Layout>
  );
}

export default AuthApp;
