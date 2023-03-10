import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import CalendarComponent from "../components/CalendarComponent/index";
import ReminderModal from "../components/ReminderModal/ReminderModal";

const Calendar = () => {
  const { isReminderModalOpen } = useSelector((state) => state.calendar);

  return (
    <div className="container">
      <CalendarComponent />
      <ReminderModal open={isReminderModalOpen} />
      <ToastContainer />
    </div>
  );
};

export default Calendar;
