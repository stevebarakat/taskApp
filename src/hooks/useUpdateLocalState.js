import React, { useEffect } from 'react';

const useUpdateLocalState = (db, user, handleSetTodoList) => {
  useEffect(() => {
    const docRef = db.collection('todolist').doc(user.uid);
    return docRef.onSnapshot(snapshot => {
      const tempTasks = [];
      tempTasks.push(snapshot.data());
      handleSetTodoList(snapshot.data().tasks);
      localStorage.setItem(user.uid, JSON.stringify(snapshot.data().tasks));
    });
  }, [db, user]);
};

export default useUpdateLocalState;
