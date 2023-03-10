import { getCurrentDay, getCurrentMonthName } from "../helpers/calendarHelper";

export const INITIAL_STATE = {
  currentMonthName: getCurrentMonthName(),
  currentDay: getCurrentDay(),
  isReminderModalOpen: false,
  reminders: [],
  selectedDay: getCurrentDay(),
  selectedReminder: {}
};

export const calendarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_YEAR":
      const year = action.payload;
      return {
        ...state,
        currentDay: new Date(
          year,
          getCurrentDay().getMonth() + 1,
          getCurrentDay().getDay()
        )
      };
    case "ADD_MONTH":
      const value = action.payload;
      return {
        ...state,
        currentDay: new Date(
          state.currentDay.setMonth(state.currentDay.getMonth() + value)
        )
      };
    case "OPEN_REMINDER_CREATION":
      return {
        ...state,
        selectedReminder: {},
        selectedDay: action.payload,
        isReminderModalOpen: true
      };
    case "OPEN_REMINDER":
      return {
        ...state,
        selectedReminder: action.payload,
        isReminderModalOpen: true
      };
    case "CLOSE_REMINDER_MODAL":
      return {
        ...state,
        isReminderModalOpen: false
      };
    case "SET_REMINDER":
      const reminder = action.payload;
      return {
        ...state,
        reminders: [...state.reminders, reminder]
      };
    case "UPDATE_REMINDER":
      const reminderToUpdate = action.payload;
      return {
        ...state,
        reminders: state.reminders.map((reminder) =>
          reminder.id === reminderToUpdate.id
            ? { ...reminder, ...reminderToUpdate }
            : reminder
        )
      };
    case "REMOVE_REMINDER":
      const id = action.payload;
      return {
        ...state,
        reminders: state.reminders.filter((reminder) => reminder.id !== id)
      };
    case "RESET_SELECTED_REMINDER":
      return {
        ...state,
        reminderToUpdate: {}
      };
    default:
      return state;
  }
};
