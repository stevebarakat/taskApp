import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion, useMotionValue, useAnimation, AnimatePresence } from "framer-motion";
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

const TaskList = ({ taskList, deleteTask, updateTaskList, updateTask, handleSetTaskList }) => {
  const controls = useAnimation();
  
  async function handleDragEnd(event, info, index) {
    console.log(info.velocity.y)
    console.log(info.offset.x)
    if (info.offset.x < -100 || info.velocity.x < -500) {
      await controls.start({ x: 0, opacity: 1, transition: {duration: 1}, color: "red"});
      deleteTask(index)
    } else {
      controls.start({ x: 0, opacity: 1, transition: "duration: 2.5" , color: "inherit"});
    }
  }

  return (
    <>
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
                        <motion.div
                          key={task.id} 
                          drag="x"
                          dragDirectionLock
                          onDragEnd={(event, info) => handleDragEnd(event, info, index)}
                          animate={controls}
                          style={{background: 'hsla(216, 18%, 21%, 0.5)'}}
                        >
                          <Draggable draggableId={task.id} index={index}>
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
                                    <BtnLink task onClick={() => deleteTask(index)}><VscChromeClose /></BtnLink>                                  <ListItem>
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
                        </motion.div>
                      );
                    })}
                  </div>}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default TaskList;