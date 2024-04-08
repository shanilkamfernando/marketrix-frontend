import React, { useState } from "react";
import PropTypes from "prop-types";
import DateInputLogic from "./DateInputLogic";
import { BsCalendar4 } from "react-icons/bs";

const CustomDatePicker = ({ onSelectDate }) => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <BsCalendar4 className="absolute top-0 left-1 mt-3 ml-1 h-5 w-5 text-md  text-gray-500 z-20 font-semibold" />
        <DateInputLogic onSelectDate={onSelectDate} />
      </div>
    </div>
  );
};

CustomDatePicker.propTypes = {
  onSelectDate: PropTypes.func,
};

export default CustomDatePicker;
