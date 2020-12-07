import { useEffect } from 'react';
import { useFirestore, useUser } from 'reactfire';

function useUpdateFirebase(taskList) {
  const db = useFirestore();
  const user = useUser();
  
  useEffect(() => {
    (async () => {
      const docRef = db.collection('tasklist').doc(user.uid);
      if (!docRef.exists) return;
      await docRef.update({ tasks: taskList });
    })();
  }, [db, taskList, user]);
}

export default useUpdateFirebase;
