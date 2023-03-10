import { getCurrentDay, getCurrentMonthName } from "../helpers/calendarHelper";
import { calendarReducer } from "./calendarReducer";

export const INITIAL_STATE = {
  currentMonthName: getCurrentMonthName(),
  currentDay: getCurrentDay(),
  isReminderModalOpen: false,
  reminders: [],
  selectedDay: getCurrentDay(),
  selectedReminder: {}
};

const payload = {
  description: "Description of the reminder",
  city: "Salvador",
  selectedDay: "2022-01-31T03:00:00.000Z",
  time: "23:34",
  weather: {
    resolvedAddress: "El Salvador",
    address: "Salvador",
    timezone: "America/El_Salvador",
    description: "Similar temperatures continuing with no rain expected.",
    days: [
      {
        datetime: "2022-01-31",
        tempmax: 31.5,
        tempmin: 17.2,
        temp: 23
      }
    ]
  },
  id: "kz2zk1kz0.qc8se5d3iio"
};

describe("Insurance request reducer", () => {
  it("should handle SET_YEAR", () => {
    const action = {
      type: "SET_YEAR",
      payload: 2025
    };
    const result = calendarReducer(INITIAL_STATE, action);

    expect(result.currentDay.getFullYear()).toBe(2025);
  });

  it("should handle ADD_MONTH", () => {
    const action = {
      type: "ADD_MONTH",
      payload: 1
    };
    const result = calendarReducer(INITIAL_STATE, action);

    expect(result.currentDay.getMonth()).toBe(
      INITIAL_STATE.currentDay.getMonth()
    );
  });

  it("should handle SET_REMINDER", () => {
    const action = {
      type: "SET_REMINDER",
      payload
    };
    const result = calendarReducer(INITIAL_STATE, action);

    expect(result.reminders).toStrictEqual([payload]);
  });

  it("should handle UPDATE_REMINDER", () => {
    const changedReminder = {
      description: "Updated reminder",
      id: "kz2zk1kz0.qc8se5d3iio"
    };
    const action = {
      type: "UPDATE_REMINDER",
      payload: changedReminder
    };

    const state = {
      reminders: [payload]
    };

    const result = calendarReducer(state, action);

    expect(result.reminders[0].description).toBe("Updated reminder");
  });

  it("should handle OPEN_REMINDER_CREATION", () => {
    const action = {
      type: "OPEN_REMINDER_CREATION",
      payload: INITIAL_STATE.selectedDay
    };

    const result = calendarReducer(INITIAL_STATE, action);

    expect(result.isReminderModalOpen).toBe(true);
    expect(result.selectedReminder).toStrictEqual({});
  });

  it("should handle CLOSE_REMINDER_MODAL", () => {
    const action = {
      type: "CLOSE_REMINDER_MODAL"
    };

    const result = calendarReducer(INITIAL_STATE, action);

    expect(result.isReminderModalOpen).toBe(false);
  });

  it("should handle OPEN_REMINDER", () => {
    const selectedReminder = new Date();

    const action = {
      type: "OPEN_REMINDER",
      payload: selectedReminder
    };

    const result = calendarReducer(INITIAL_STATE, action);

    expect(result.selectedReminder).toBe(selectedReminder);
  });

  it("should handle REMOVE_REMINDER", () => {
    const reminderToBeRemoved = {
      id: "kz2zk1kz0.qc8se5d3iio"
    };

    const action = {
      type: "REMOVE_REMINDER",
      payload: reminderToBeRemoved.id
    };

    const state = {
      reminders: [payload]
    };

    const result = calendarReducer(state, action);

    expect(result.reminders).toStrictEqual([]);
  });

  it("should handle RESET_SELECTED_REMINDER", () => {
    const action = {
      type: "RESET_SELECTED_REMINDER"
    };

    const state = {
      reminderToUpdate: payload
    };

    const result = calendarReducer(state, action);

    expect(result.reminderToUpdate).toStrictEqual({});
  });
  it("should handle default case", () => {
    const action = {
      type: ""
    };

    const result = calendarReducer(INITIAL_STATE, action);

    expect(result).toStrictEqual(INITIAL_STATE);
  });
});
