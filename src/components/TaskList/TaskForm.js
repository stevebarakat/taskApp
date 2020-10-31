import React from 'react';
import { Button, TextInput, InputIcon, StyledTaskForm, Flex, Label } from '../../styles/style';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { RiAddLine } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';

const TaskForm = ({ handleSetTodoList, handleSetIsChangedTodo, handleSetInput, todoList }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    if (!!data) {
      handleSetIsChangedTodo(true);
      handleSetTodoList([...todoList, {
        title: data.task,
        id: uuidv4(),
      }]);
      reset();
    }
  };

  return (
    <StyledTaskForm onSubmit={handleSubmit(onSubmit)}>
      <Flex>
        <InputIcon task><BsPencil /></InputIcon>
        <TextInput
          inputType="task"
          type="text"
          name="task"
          placeholder=" "
          ref={register}
          autoComplete="off"
          required />
        <Label htmlFor="task">Add Task</Label>

        <Button

          btnType="task"
          secondary
          type="submit"
        ><RiAddLine />
        </Button>
      </Flex>
    </StyledTaskForm>
  );
};

export default TaskForm;
