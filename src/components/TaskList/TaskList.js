import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ListItem, ListItemContainer, EndCap, TaskText, BtnLink } from '../../styles/style';
import { MdDragHandle } from 'react-icons/md';
import { VscChromeClose } from 'react-icons/vsc';
import TaskForm from './TaskForm';

const onDragEnd = (result, todoList, updateTodo) => {
  if (!result.destination) return;
  const { source, destination } = result;
  const _taskList = [...todoList];
  const [removed] = _taskList.splice(source.index, 1);
  _taskList.splice(destination.index, 0, removed);
  updateTodo(_taskList);
};

const TaskList = ({ handleSetTodoList, todoList, deleteTodo, updateTodo, updateTask }) => {
  return (
    <div style={{ paddingBottom: "1.5rem" }}>
      <TaskForm
        todoList={todoList}
        handleSetTodoList={handleSetTodoList}
      />
      <DragDropContext onDragEnd={result => onDragEnd(result, todoList, updateTodo)}>
        <Droppable droppableId={'list'}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  opacity: snapshot.isDraggingOver ? '0.5' : '1'
                }}
              >
                {todoList.length === 0 ?
                  <p>You don't have any tasks.</p> :
                  <div>
                    {todoList?.map((todo, index) => {
                      return (
                        <Draggable key={todo.id} draggableId={todo.id} index={index}>
                          {(provided, snapshot) => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                // {...provided.dragHandleProps}
                                style={{
                                  userSelect: 'none',
                                  cursor: "grabbing",
                                  opacity: snapshot.isDragging ? '0.5' : 1,
                                  ...provided.draggableProps.style
                                }}
                              >
                                <ListItemContainer>
                                  <BtnLink task onClick={() => deleteTodo(index)}><VscChromeClose /></BtnLink>                                  <ListItem>
                                    <TaskText
                                      contentEditable
                                      suppressContentEditableWarning
                                      onBlur={e => {
                                        updateTask(e, todo.id);
                                      }}
                                    >
                                      {todo.title}
                                    </TaskText>
                                  </ListItem>
                                  <EndCap {...provided.dragHandleProps}>
                                    <MdDragHandle style={{ margin: "auto" }} />
                                  </EndCap>
                                </ListItemContainer>
                              </div>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                  </div>}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;