import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Card } from "@creativehub/marketrix-ui";

function CalenderComponent() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    if (date instanceof Date) {
      setSelectedDate(date);
    }
  };
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      return `text-gray-700 rounded-full bg-gray-500 ${
        date.toDateString() === selectedDate.toDateString()
          ? "selected-date"
          : ""
      } ${
        date.toDateString() === new Date().toDateString() ? "selected-date" : ""
      } ${date.getDay() === 0 || date.getDay() === 6 ? "weekend" : ""}
          
          `;
    }
    return "";
  };

  return (
    <div>
      <Card
        alignItems="center"
        background="#F9FAFB"
        border=""
        borderRadius="8px"
        display="flex"
        flexDirection=""
        gap="24px"
        height=""
        hoverColor="#F3F4F6"
        justifyContent="center"
        left=""
        top=""
        width="100%"
      >
        <div className="border-gray-100 w-[100%]">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="rounded-lg !font-medium shadow-lg  text-gray-700 mtx-body2 max-h-[50%] w-[100%]  calendar-container"
            tileClassName={tileClassName}
          />
        </div>
      </Card>

      <div className="pt-2">
        <div className="mtx-h6 p-2">Notifications</div>
        <Card
          alignItems="center"
          background="#F9FAFB"
          border="1px solid #E4E7EC"
          borderRadius="8px"
          display="flex"
          flexDirection=""
          gap="24px"
          height="240px"
          hoverColor="#F3F4F6"
          justifyContent="center"
          left=""
          paddingBottom={15}
          paddingLeft={15}
          paddingRight={15}
          paddingTop={20}
          top=""
          width="100%"
        >
          <div className="mtx-body2 text-gray-400 !font-semibold">
            You have no new notifications
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CalenderComponent;
