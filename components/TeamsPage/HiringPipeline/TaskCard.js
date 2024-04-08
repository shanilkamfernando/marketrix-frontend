import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Avatar, Button, Badge } from "@creativehub/marketrix-ui";

function TaskCard({ task }) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  // if (editMode) {
  //   return (
  //     <div
  //       ref={setNodeRef}
  //       style={style}
  //       {...attributes}
  //       {...listeners}
  //       className="bg-white rounded-lg p-3"
  //     >
  //       <textarea
  //         className=" text-[14px]"
  //         value={task.content}
  //         autoFocus
  //         placeholder="Task content here"
  //         onBlur={toggleEditMode}
  //         onKeyDown={(e) => {
  //           if (e.key === "Enter" && e.shiftKey) {
  //             toggleEditMode();
  //           }
  //         }}
  //         onChange={(e) => updateTask(task.id, e.target.value)}
  //       />
  //     </div>
  //   );
  // }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      // onClick={toggleEditMode}
      className="bg-white rounded-lg p-3"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <div className=" mtx-subtitle2 flex justify-between items-center pb-2">
        <div className="flex items-center gap-2">
          <div>
            <Avatar
              alt="Profile Pic"
              border="none"
              borderRadius="100%"
              width={"24px"}
              height={"24px"}
              image={task.avatarImage}
            />
          </div>
          <div>{task.personName}</div>
        </div>
        <div className="flex gap-1 items-center">
          <div>
            <img src="/images/team/redHeart.svg" width={24} height={24} />
          </div>
          <div>
            {" "}
            <img src="/images/team/dots-vertical.svg" width={24} height={24} />
          </div>
        </div>
      </div>

      <div className="pb-2  flex items-center justify-between mtx-body2 ">
        <div className="flex gap-2 items-center">
          <div>
            <img src="/images/team/rateStar.svg" width={24} height={24} />
          </div>
          <div>{task.ratings}</div>
        </div>
        <div className="mtx-body2 !font-medium">{task.amountRate}</div>
      </div>

      <div className="2xl:mtx-body2 mtx-label text-[#667085] pb-3">
        {task.content}
      </div>
      {task.columnId === "todo" && (
        <div className="">
          <div className="text-[#667085] mtx-subtitle2">Sessions</div>
          <div className="text-[#000000] !font-semibold 2xl:mtx-body1 mtx-body2">
            {task.sessions}
          </div>
        </div>
      )}
      {task.columnId === "doing" && (
        <>
          <div className="flex justify-between items-center pb-3">
            <div>
              <div className="text-[#667085] mtx-subtitle2">Sessions</div>
              <div className="text-[#000000] !font-semibold 2xl:mtx-body1 mtx-body2">
              {task.sessions}
              </div>
            </div>
            <div>
              <Badge
                backgroundColor={task.badgeBgColor}
                borderRadius={16}
                color={task.badgeTextColor}
                text={task.badgeText}
                width={80}
                height={20}
                fontSize="12px"
              />
            </div>
          </div>
          <div className="pb-3">
            <div className="text-[#667085] mtx-subtitle2">Upcoming </div>
            <div className="2xl:mtx-body1 mtx-body2 !font-semibold">
              {task.upcomingTime}
            </div>
          </div>

          <div className="flex justify-between items-center gap-2">
            <div className="w-[50%]">
              {" "}
              <Button
                alignItems="center"
                background="transparent"
                border="1px solid"
                borderColor="#D0D5DD"
                borderRadius="8px"
                width="100%"
                color="#344054"
                fontWeight="500"
                direction="row"
                hoverColor="#f9fafb"
                display="flex"
                flexDirection="row"
                fontSize="12px"
                gap="3px"
                icon="Video camera"
                iconSize="20px"
                iconPosition="leading"
                justifyContent="center"
                label="Start"
                size="sm"
                // onClick={setIsUpdateUrlOpen}
              />
            </div>
            <div className=" w-[50%]">
              {" "}
              <Button
                alignItems="center"
                background="transparent"
                border="1px solid"
                borderColor="#D0D5DD"
                borderRadius="8px"
                color="#344054"
                fontWeight="500"
                width="100%"
                direction="row"
                hoverColor="#f9fafb"
                display="flex"
                flexDirection="row"
                fontSize="12px"
                gap="3px"
                icon="Settings"
                iconSize="20px"
                iconPosition="leading"
                justifyContent="center"
                label="Manage"
                size="sm"
                // onClick={setIsUpdateUrlOpen}
              />
            </div>
          </div>
        </>
      )}
      {task.columnId === "done" && (
        <>
          <div className="pb-3">
            <div className="text-[#667085] mtx-subtitle2">Sessions</div>
            <div className="text-[#000000] !font-semibold 2xl:mtx-body1 mtx-body2">
            {task.sessions}
            </div>
          </div>
          <div className="w-full ">
            <Button
              alignItems="center"
              background="transparent"
              border="1px solid"
              borderColor="#D0D5DD"
              borderRadius="8px"
              color="#344054"
              fontWeight="500"
              hoverColor="#f9fafb"
              width="100%"
              direction="row"
              display="flex"
              flexDirection="row"
              fontSize="12px"
              gap="3px"
              icon="plus"
              iconSize="20px"
              iconPosition="leading"
              justifyContent="center"
              label="Add to team"
              size="sm"
              // onClick={setIsUpdateUrlOpen}
            />
          </div>
        </>
      )}
      {task.columnId === "Rejected" && (
        <div className="flex justify-between items-end pb-3">
          <div>
            <div className="text-[#667085] mtx-subtitle2">Sessions</div>
            <div className="text-[#000000] !font-semibold 2xl:mtx-body1 mtx-body2">
            {task.sessions} 
            </div>
          </div>
          <div>
            <Badge
              backgroundColor="#FEF3F2"
              borderRadius={16}
              color="#B42318"
              text="Rejected"
              width={80}
              height={20}
              fontSize="12px"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCard;
