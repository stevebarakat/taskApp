import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { findIndex } from 'lodash';
import { firestore } from '../../firebase';
import Spinner from '../Spinner';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

/**
 * Task page
 */
const TaskListContainer = ({ user }) => {
  const [input, setInput] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChangedTodo, setIsChangedTodo] = useState(false);
  const db = firestore;

  // Update collection data in state based on user status
  useEffect(() => {
    console.log("Updating local state from firebase!");
    if (user == null) return;
    (async () => {
      db.collection('todolist').doc(user.uid).onSnapshot(doc => {
        if (doc.exists) {
          setTodoList(doc.data().todo.tasks);
        }
        setIsLoading(false);
      });

    })();
  }, [db, user]);

  // Update task
  useEffect(() => {
    console.log("Updating tasks in firebase!");
    if (user == null) return;
    if (isChangedTodo) {
      (() => {
        setIsLoading(true);
        const docRef = db.collection('todolist').doc(user.uid);
        docRef.update({ todo: { tasks: todoList } });
        setIsLoading(false);
      })();
    }
  }, [todoList, isChangedTodo, db, user]);


  const addTodo = async (e) => {
    e.preventDefault();
    // create collection if one doesn't exist
    const collection = await firestore.collection('todolist').doc(user.uid).get();
    if (!collection.exists) {
      firestore.collection('todolist').doc(user.uid).set({
        todo: {
          tasks: [
            {
              title: input,
              id: uuidv4(),
            }
          ]
        }
      });
    }
    else if (!!input) {
      setIsChangedTodo(true);
      setTodoList([...todoList, {
        title: input,
        id: uuidv4(),
      }]);
      setInput('');
    }
  };

  const deleteTodo = (index) => {
    setIsChangedTodo(true);
    setTodoList(todoList.filter((todo, i) => i !== index));
  };

  const updateTodo = (todoList) => {
    setIsChangedTodo(true);
    setTodoList([...todoList]);
  };

  const updateTask = (e, id) => {
    e.persist();
    setIsChangedTodo(true);

    let tempTasks = todoList;
    let taskIndex = findIndex(todoList, { id });
    tempTasks[taskIndex]['title'] = e.currentTarget.innerText;

    setTodoList(tempTasks);
    const docRef = db.collection('todolist').doc(user.uid);
    docRef.update({ todo: { tasks: todoList } });
  };

  const changeInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      {!user
        ? <div>loading</div>
        : (
          <>
            <TaskForm addTodo={addTodo} changeInput={changeInput} input={input} />
            {isLoading ? (
              <span>
                <Spinner />
              </span>
            ) : (
                <TaskList
                  todoList={todoList}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
                  updateTask={updateTask}
                />
              )}
          </>
        )}
    </>
  );
};

export default TaskListContainer;