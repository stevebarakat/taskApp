import {useEffect} from 'react'

function useUpdateFirebase(db, isChangedTodo, todoList, user) {
  useEffect(() => {
    if (!isChangedTodo) return;
    (async () => {
      const docRef = db.collection('todolist').doc(user.uid);
      await docRef.update({ tasks: todoList });
    })();
  }, [db, isChangedTodo, todoList, user]);
}

export default useUpdateFirebase
