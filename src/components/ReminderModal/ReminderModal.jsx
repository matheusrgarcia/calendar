import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Box, Modal } from "@mui/material";
import { toast } from "react-toastify";

import "./ReminderModal.scss";
import { api } from "../../services/api";
import API_KEY from "../../constants/constants";
import { formatDate } from "../../helpers/calendarHelper";

const ReminderModal = ({ open }) => {
  const { selectedDay, selectedReminder } = useSelector(
    (state) => state.calendar
  );
  const dispatch = useDispatch();
  const successToast = (message) =>
    toast.success(message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

  const errorToast = (message) =>
    toast.error(message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

  const warningToast = (message) =>
    toast.warning(message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

  const [maxCharacters, setMaxCharacters] = useState(0);
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [time, setTime] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getWeather = async () => {
    return await api.get(
      `${city}/${formatDate(selectedDay)}/${formatDate(
        selectedDay
      )}?unitGroup=metric&key=${API_KEY}&contentType=json`
    );
  };

  const handleDescription = ({ target }) => {
    setMaxCharacters(target.value.length);
    setDescription(target.value);
  };

  const handleReminderUpdate = (reminder) => {
    const updatedReminder = { ...selectedReminder, ...reminder };
    updateReminder(updatedReminder);
  };

  const isEdit = () => Object.keys(selectedReminder).length > 0;

  const hasWeather = () => Object.keys(selectedReminder).length > 0;

  const hasData = (value) => value.length > 0;

  const handleReminderSaving = async () => {
    if (hasData(description) && hasData(city) && hasData(time)) {
      setIsLoading(true);
      getWeather()
        .then((response) => {
          reminder.weather = response.data;
          if (isEdit()) {
            handleReminderUpdate(reminder);
          } else {
            reminder.id = Date.now().toString(36) + Math.random().toString(36);
            setReminder(reminder);
          }
          successToast("Success while saving the reminder");
        })
        .catch(() => {
          errorToast("Error while saving the reminder");
        })
        .finally(() => {
          setIsLoading(false);
          resetSelectedReminder();
          closeModal();
        });
    } else {
      warningToast("Please, complete all fields");
    }
    let reminder = {
      description,
      city,
      selectedDay,
      time
    };
  };

  const handleReminderExclusion = () => {
    removeReminder(selectedReminder.id);
    successToast("Success while removing the reminder");
    closeModal();
  };

  const removeReminder = useCallback(
    (id) => dispatch({ type: "REMOVE_REMINDER", payload: id }),
    [dispatch]
  );

  const setReminder = useCallback(
    (reminder) => dispatch({ type: "SET_REMINDER", payload: reminder }),
    [dispatch]
  );

  const updateReminder = useCallback(
    (updatedReminder) =>
      dispatch({ type: "UPDATE_REMINDER", payload: updatedReminder }),
    [dispatch]
  );

  const resetSelectedReminder = useCallback(
    () => dispatch({ type: "RESET_SELECTED_REMINDER" }),
    [dispatch]
  );

  const closeModal = useCallback(
    () => dispatch({ type: "CLOSE_REMINDER_MODAL" }),
    [dispatch]
  );

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="reminder-modal">
        <form onSubmit={handleReminderExclusion}>
          <span className="reminder-modal__title">Add Reminder</span>
          <div className="reminder-modal__input">
            <span className="reminder-modal__input__title">Description:</span>
            <textarea
              placeholder="Description of the reminder"
              maxLength={30}
              required
              disabled={isLoading}
              defaultValue={selectedReminder.description}
              onChange={(e) => handleDescription(e)}
            ></textarea>
            <span className="maximum-count">
              Max characters {maxCharacters} / 30
            </span>
          </div>
          <div className="reminder-modal__input">
            <span className="reminder-modal__input__title">City:</span>
            <input
              type="text"
              defaultValue={selectedReminder.city}
              placeholder="A city"
              onChange={(e) => setCity(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="reminder-modal__input">
            <span className="reminder-modal__input__title">Time:</span>
            <input
              type="time"
              defaultValue={selectedReminder.time}
              placeholder="Time of the reminder"
              onChange={(e) => setTime(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          {hasWeather() && (
            <div className="reminder-modal__weather">
              <h2>
                Weather for {selectedReminder?.weather?.resolvedAddress} in{" "}
                {selectedReminder?.weather?.days[0]?.datetime}
              </h2>
              <h3>Description</h3>
              <span>{selectedReminder?.weather?.days[0]?.description}</span>
              <h3>Temperatures</h3>
              <span>Min: {selectedReminder?.weather?.days[0]?.tempmin}</span>
              <span>Max: {selectedReminder?.weather?.days[0]?.tempmax}</span>
            </div>
          )}
          <div className="reminder-modal__actions">
            <button
              className="button-cancel"
              type="button"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button type="button" onClick={handleReminderSaving}>
              Save Reminder
            </button>
            {isEdit() && (
              <button
                className="button-exclude"
                type="submit"
                onClick={handleReminderExclusion}
              >
                Exclude Reminder
              </button>
            )}
          </div>
        </form>
      </Box>
    </Modal>
  );
};

ReminderModal.propTypes = {
  open: PropTypes.bool
};

ReminderModal.defaultProps = {
  open: false
};

export default ReminderModal;
