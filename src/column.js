import React from "react";
import "./Column.css";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./task";

export default function Column(props) {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="column-container"
        >
          <h3 className="title" {...provided.dragHandleProps}>
            {props.column.title}
          </h3>
          <Droppable droppableId={props.column.id} type="task">
            {(provided, snapshot) => (
              <div
                className={`taskList ${
                  snapshot.isDraggingOver && "isDraggingOver"
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
