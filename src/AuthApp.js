import React, { useState, useCallback } from 'react';
import { useFirestore, useUser } from "reactfire";
import { findIndex } from 'lodash';
import './styles/reset.css';
import './styles/global.scss';
import Layout from './components/Layout';
import TaskList from './components/TaskList/TaskList';
import useUpdateLocalState from './hooks/useUpdateLocalState';
import useUpdateFirebase from './hooks/useUpdateFirebase';
import initialStates from './initialStates';


function AuthApp({ logOutUser }) {
  const user = useUser();
  const db = useFirestore();
  const initialState = () => {
    try {
      return JSON.parse(localStorage.getItem(user.uid)) ?? initialStates.loadingState;
    } catch {
      console.error("The tasks are having issues parsing into JSON.");
      return initialStates.initialTasks;
    }
  }
  
  const [taskList, setTaskList] = useState(initialState);

  const handleSetTaskList = useCallback((_taskList) => {
    setTaskList(_taskList);
  }, [])
  useUpdateLocalState(db, user, taskList, handleSetTaskList);
  useUpdateFirebase(taskList);

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
