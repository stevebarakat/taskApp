import React from 'react'
import { Button } from '../../styles/style';

const DeleteTodoBtn = ( {deleteTodo, index}) => {
  return (
    <>
      <Button onClick={() => deleteTodo(index)}>x</Button>
    </>
  )
}

export default DeleteTodoBtn
