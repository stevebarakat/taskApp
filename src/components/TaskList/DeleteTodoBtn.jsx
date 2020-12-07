import React from 'react'
import { Button } from '../../styles/style';

const DeleteTodoBtn = ( {deleteTask, index}) => {
  return (
    <>
      <Button onClick={() => deleteTask(index)}>x</Button>
    </>
  )
}

export default DeleteTodoBtn
