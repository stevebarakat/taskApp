import { useEffect } from 'react';
import initialStates from '../initialStates';

const useUpdateLocalState = (db, user, taskList, handleSetTaskList) => {

  useEffect(() => {
    const docRef = db.collection('tasklist').doc(user.uid);
    return docRef.onSnapshot(snapshot => {
      if (!snapshot.data()) return;
      handleSetTaskList(snapshot.data().tasks);
      localStorage.setItem(user.uid, JSON.stringify(snapshot.data().tasks));
    });
  }, [ db, user, handleSetTaskList ]);

};
export default useUpdateLocalState;
