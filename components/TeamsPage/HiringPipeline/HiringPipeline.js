import { useMemo, useState } from "react";

import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";

const defaultCols = [
  {
    id: "todo",
    title: "Favorite sellers ",
    titleImage: "heartIcon.svg",
    icon: "plus",
  },
  {
    id: "doing",
    title: "Interviewing ",
    titleImage: "Interviewing.svg",
  },
  {
    id: "done",
    title: "Selected ",
    titleImage: "selectedIcon.svg",
  },
  {
    id: "Rejected",
    title: "Rejected",
    titleImage: "rejectedIcon.svg",
  },
];

const defaultTasks = [
  {
    id: "1",
    columnId: "todo",
    content:
      "Over the course of 2 years in Product Sales, I've generated approximately $5 million in revenue.",
    personName: "Jane Cooper",
    avatarImage: "/images/team/avatar1.png",
    ratings: "4.3(78)",
    amountRate: "$750/month",
    sessions: " 123",
  },
  {
    id: "2",
    columnId: "todo",
    content:
      "n my two-year tenure as a Product Sales Specialist, I've achieved nearly $5 million in sales conversions.",
    avatarImage: "/images/team/avatar2.png",
    personName: "Jane Cooper",
    ratings: "4.3(16)",
    amountRate: "$750/month",
    sessions: "46",
  },
  {
    id: "3",
    columnId: "doing",
    content:
      "My experience spanning over 2 years in Product Sales led to conversions nearing the $5 million mark.",
    avatarImage: "/images/team/avatar3.png",
    personName: "Brooklyn Simmons",
    ratings: "4.4(136)",
    amountRate: "$750/month",
    sessions: "162",
    badgeBgColor: "#ECFDF3",
    badgeTextColor: "#027A48",
    badgeText: "Accepted",
    upcomingTime: "Today 2:30 PM to 3:30 PM (IST)",
  },
  {
    id: "4",
    columnId: "doing",
    content:
      "My experience spanning over 2 years in Product Sales led to conversions nearing the $5 million mark.",
    avatarImage: "/images/team/avatar3.png",
    personName: "Brooklyn Simmons",
    ratings: "4.4(136)",
    amountRate: "$750/month",
    sessions: "162",
    badgeBgColor: "#F9F5FF",
    badgeTextColor: "#6941C6 ",
    badgeText: "Requested",
    upcomingTime: "Today 2:30 PM to 3:30 PM (IST)",
  },
  {
    id: "5",
    columnId: "done",
    content:
      "As a Product Sales Professional for over two years, I've been responsible for close to $5 million in sales.",
    personName: "Guy Hawkins",
    avatarImage: "/images/team/avatar4.png",
    ratings: "4.8(200)",
    amountRate: "$750/month",
    sessions: " 256",
  },
  {
    id: "6",
    columnId: "Rejected",
    content:
      "With my 2-year background in Product Sales, I've contributed to nearly $5 million in revenue conversions.",
    personName: "Robert Fox",
    avatarImage: "/images/team/avatar5.png",
    ratings: "4.0(6)",
    amountRate: "$750/month",
    sessions: "12 ",
  },
  {
    id: "7",
    columnId: "Rejected",
    content:
      "In just over two years as a Product Sales Expert, I've seen conversions amounting to around $5 million.",
    personName: "Jacob Jones",
    avatarImage: "/images/team/avatar6.png",
    ratings: "4.1(22)",
    amountRate: "$750/month",
    sessions: " 34",
  },
];

function HiringPipeline() {
  const [columns, setColumns] = useState(defaultCols);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState(defaultTasks);

  const [activeColumn, setActiveColumn] = useState(null);

  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <div className=" overflow-x-auto overflow-y-hidden ">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="">
          <div className="grid grid-cols-4 gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
        </div>
      </DndContext>
    </div>
  );

  function createTask(columnId) {
    const newTask = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id, content) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  }

  // function createNewColumn() {
  //   const columnToAdd = {
  //     id: generateId(),
  //     title: `Column ${columns.length + 1}`,
  //   };

  //   setColumns([...columns, columnToAdd]);
  // }

  function deleteColumn() {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  }

  function updateColumn(id, title) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }

  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
}

function generateId() {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001);
}

export default HiringPipeline;
