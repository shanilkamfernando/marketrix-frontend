import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInputLogic = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => {
        setSelectedDate(date);
        onSelectDate(date);
      }}
      dateFormat="MMMM d"
      className="h-11 w-50 pl-10 rounded text-md font-semibold text-gray-500 border-solid border-2 border-grey-200 outline-none"
    />
  );
};

export default DateInputLogic;
