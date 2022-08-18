import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import initialData from "./initialData";
import reportWebVitals from "./reportWebVitals";
import Column from "./column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "./index.css";

const App = () => {
  const [initialState, setInitialState] = useState(initialData);

  const onDragStart = () => {
    document.body.style.color = "purple";
    document.body.style.transition = "background-color 1s ease";
  };

  const onDragUpdate = (update) => {
    const { destination } = update;

    const opacity = destination
      ? destination.index / Object.keys(initialState.tasks).length
      : 0;

    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  const onDragEnd = (result) => {
    document.body.style.color = "inherit";
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(initialState.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...initialState,
        columnOrder: newColumnOrder,
      };
      setInitialState(newState);
      return;
    }

    const start = initialState.columns[source.droppableId];
    const finish = initialState.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...initialState,
        columns: {
          ...initialState.columns,
          [newColumn.id]: newColumn,
        },
      };
      setInitialState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...initialState,
      columns: {
        ...initialState.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setInitialState(newState);
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
    >
      <Droppable
        droppableId="single-column"
        direction="horizontal"
        type="column"
      >
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="homeContainer"
          >
            {initialState.columnOrder.map((columId, index) => {
              const column = initialState.columns[columId];
              const tasks = column.taskIds.map(
                (taskId) => initialState.tasks[taskId]
              );

              return (
                <Column
                  key={column.id}
                  index={index}
                  column={column}
                  tasks={tasks}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
