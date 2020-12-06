import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ListItem, ListItemContainer, EndCap, TaskText, BtnLink } from '../../styles/style';
import { MdDragHandle } from 'react-icons/md';
import { VscChromeClose } from 'react-icons/vsc';
import TaskForm from './TaskForm';

const onDragEnd = (result, taskList, updateTaskList) => {
  if (!result.destination) return;
  const { source, destination } = result;
  const _taskList = [...taskList];
  const [removed] = _taskList.splice(source.index, 1);
  _taskList.splice(destination.index, 0, removed);
  updateTaskList(_taskList);
};

const TaskList = ({ taskList, deleteTodo, updateTaskList, updateTask }) => {

  return (
    <div style={{ paddingBottom: "1.5rem" }}>
      <TaskForm
        taskList={taskList}
      />
      <DragDropContext onDragEnd={result => onDragEnd(result, taskList, updateTaskList)}>
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
                {taskList.length === 0 ?
                  <p>You don't have any tasks.</p> :
                  <div>
                    {taskList?.map((task, index) => {
                      return (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
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
                                        updateTask(e, task.id);
                                      }}
                                    >
                                      {task.title}
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