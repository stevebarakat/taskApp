import { useEffect } from 'react';

const useUpdateLocalState = (db, user, taskList, handleSetTaskList) => {

  useEffect(() => {
    const docRef = db.collection('tasklist').doc(user.uid);
    return docRef.onSnapshot(snapshot => {
      if (!snapshot.data()) return;
      handleSetTaskList(snapshot.data().tasks);
      localStorage.setItem(user.uid, JSON.stringify(snapshot.data().tasks));
    });
    // eslint-disable-next-line
  }, [ db, user ]);

};
export default useUpdateLocalState;
