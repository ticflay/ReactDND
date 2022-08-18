import React from "react";
import "./Task.css";
import { Draggable } from "react-beautiful-dnd";

export default function Task(props) {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-container ${snapshot.isDragging && "draggingOver"}`}
          ref={provided.innerRef}
        >
          {/* <div className="handle" {...provided.dragHandleProps} /> */}
          {props.task.content}
        </div>
      )}
    </Draggable>
  );
}
