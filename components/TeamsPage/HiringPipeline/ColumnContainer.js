import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import { Button } from "@creativehub/marketrix-ui";

function ColumnContainer({ column, tasks }) {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-40 border-2 border-pink-500 rounded-md"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-lg bg-[#F5F5F5]  min-h-[85vh] h-auto"
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className=" "
      >
        <div className="p-[1rem] flex  items-center justify-between  border-b-[1px] border-[#E4E7EC]">
          <div className="flex gap-2">
            <img
              src={`../../../images/team/${column.titleImage}`}
              width={24}
              height={24}
            />
            <div>{column.title}</div>
          </div>

          <div className=" flex items-center">
            <Button icon={column.icon} iconColor="#344054" />
          </div>
        </div>
      </div>

      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-4 p-2">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}{" "}
        </SortableContext>
      </div>
    </div>
  );
}

export default ColumnContainer;
