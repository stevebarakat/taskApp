import {useEffect} from 'react'

function useUpdateFirebase(db, isChangedTodo, todoList, user) {
  // Update tasks in Firebase 
  useEffect(() => {
    if (!isChangedTodo) return;
    (async () => {
      const docRef = db.collection('todolist').doc(user.uid);
      localStorage.setItem(await user.uid, JSON.stringify(await todoList));
      await docRef.update({ tasks: todoList });
    })();
  }, [db, isChangedTodo, todoList, user]);
}

export default useUpdateFirebase
