import { useEffect } from 'react';
import { useFirestore, useUser } from 'reactfire';

function useUpdateFirebase(taskList, isChangedTask) {
  const db = useFirestore();
  const user = useUser();
  
  useEffect(() => {
    if (!isChangedTask) return;
    (async () => {
      const docRef = db.collection('tasklist').doc(user.uid);
      await docRef.update({ tasks: taskList });
    })();
  }, [db, isChangedTask, taskList, user]);
}

export default useUpdateFirebase;
