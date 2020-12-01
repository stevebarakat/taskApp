import { useEffect, useCallback } from 'react';

const useUpdateLocalState = (db, user, handleSetTodoList) => {

  // useCallback(
  //   () => {
  //     callback
  //   },
  //   [input],
  // )

  const memoizedHandleSetTodoList = useCallback(() => {
    const docRef = db.collection('todolist').doc(user.uid);
    return docRef.onSnapshot(snapshot => {
      const tempTasks = [];
      tempTasks.push(snapshot.data());
      handleSetTodoList(snapshot.data().tasks);
      localStorage.setItem(user.uid, JSON.stringify(snapshot.data().tasks));
    });
  }, [db, user, handleSetTodoList]);

  useEffect(() => {
    memoizedHandleSetTodoList();
  }, []);

};
export default useUpdateLocalState;
