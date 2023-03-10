import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MONTHS, WEEK, formatDate } from "../../helpers/calendarHelper";
import leftArrow from "../../assets/left-arrow.png";
import rightArrow from "../../assets/right-arrow.png";
import useWindowSize from "../../hooks/useWindowSize";
import "./CalendarComponent.scss";

const CalendarComponent = () => {
  const { currentDay, reminders } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();
  const size = useWindowSize();

  const [days, setDays] = useState([]);
  const [previousMonthDays, setPreviousMonthDays] = useState([]);
  const [nextMonthDays, setNextMonthDays] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (size.width <= 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [size]);

  const openAddReminderModal = useCallback(
    (day) => dispatch({ type: "OPEN_REMINDER_CREATION", payload: day }),
    [dispatch]
  );

  const setYear = useCallback(
    (year) => dispatch({ type: "SET_YEAR", payload: year }),
    [dispatch]
  );

  const updateMonth = useCallback(
    (value) => dispatch({ type: "ADD_MONTH", payload: value }),
    [dispatch]
  );

  const openReminder = useCallback((reminder) =>
    dispatch({ type: "OPEN_REMINDER", payload: reminder })
  );

  const backMonth = () => {
    updateMonth(-1);
  };

  const nextMonth = () => {
    updateMonth(+1);
  };

  const handlePreviousMonthDays = () => {
    const indexFirstDay = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth(),
      1
    ).getDay();

    var previousLastDay = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth(),
      0
    ).getDate();

    const previousDays = [];
    for (let index = indexFirstDay; index > 0; index--) {
      previousDays.push(
        new Date(
          currentDay.getFullYear(),
          currentDay.getMonth() - 1,
          previousLastDay - index + 1
        )
      );
    }
    setPreviousMonthDays(previousDays);
  };

  const handleCurrentMonthDays = () => {
    const lastDay = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth() + 1,
      0
    ).getDate();

    const days = [];
    for (let index = 1; index <= lastDay; index++) {
      days.push(
        new Date(currentDay.getFullYear(), currentDay.getMonth(), index)
      );
    }
    setDays(days);
  };

  const handleNextMonthDays = () => {
    const indexLastDay = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth() + 1,
      0
    ).getDay();

    const nextMonthDays = 7 - indexLastDay - 1;

    const nextDays = [];
    for (var j = 1; j <= nextMonthDays; j++) {
      nextDays.push(
        new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, j)
      );
    }
    setNextMonthDays(nextDays);
  };

  const updateCalendar = () => {
    handlePreviousMonthDays();
    handleCurrentMonthDays();
    handleNextMonthDays();
  };

  const Reminders = (day) => {
    const remindersFromDay = reminders.filter(
      (reminder) => formatDate(reminder.selectedDay) === formatDate(day)
    );
    return (
      <div className="reminders">
        {remindersFromDay.map((reminder, index) => (
          <button
            className="reminders__reminder"
            onClick={() => openReminder(reminder)}
            key={index}
          >
            {reminder.description}
          </button>
        ))}
      </div>
    );
  };

  const handleYearSelector = () => {
    const tenYearsBack = [];
    const tenYearsForward = [];
    for (
      let year = currentDay.getFullYear() - 10;
      year <= currentDay.getFullYear();
      year++
    ) {
      tenYearsBack.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
      tenYearsForward.push(
        <option key={year} value={year + 10}>
          {year + 10}
        </option>
      );
    }

    return (
      <select
        value={currentDay.getFullYear()}
        onChange={(e) => setYear(e.target.value)}
        className="year-selector"
      >
        {tenYearsBack.map((backYears) => backYears)}
        {tenYearsForward.map((forwardYears) => forwardYears)}
      </select>
    );
  };

  const handleCurrentDayClass = (day) => {
    const today = new Date();

    if (formatDate(day) === formatDate(today)) {
      return "today";
    }
    return "";
  };

  useEffect(() => {
    updateCalendar();
  }, [currentDay, setNextMonthDays, setDays, setPreviousMonthDays]);

  return (
    <div className="calendar-container">
      <div className="month">
        <div className="month__actions">
          <button onClick={backMonth}>
            <img src={leftArrow} />
          </button>
          <button onClick={nextMonth}>
            <img src={rightArrow} />
          </button>
        </div>
        <span>{MONTHS[currentDay.getMonth()]}</span>
        {handleYearSelector()}
      </div>
      <div className="week">
        {WEEK.map((day, index) => (
          <div key={index} className="week__day">
            <span>{day}</span>
          </div>
        ))}
      </div>
      <div className="days">
        {!isMobile &&
          previousMonthDays.map((day, index) => (
            <div key={index} className="days__day previousMonthDays">
              <span>{day.getDate()}</span>
              {Reminders(day)}
              <button
                title="Add reminder"
                onClick={() => openAddReminderModal(day)}
              >
                +
              </button>
            </div>
          ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`days__day ${handleCurrentDayClass(day)}`}
          >
            <div className="days__day__date">
              {isMobile && <span>{WEEK[day.getDay()]}</span>}
              <span>{day.getDate()}</span>
            </div>
            {Reminders(day)}
            <button
              title="Add reminder"
              onClick={() => openAddReminderModal(day)}
            >
              +
            </button>
          </div>
        ))}
        {!isMobile &&
          nextMonthDays.map((day, index) => (
            <div key={index} className="days__day nextMonthDays">
              <span>{day.getDate()}</span>
              {Reminders(day)}
              <button
                title="Add reminder"
                onClick={() => openAddReminderModal(day)}
              >
                +
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CalendarComponent;
