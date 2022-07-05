import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllMovies,
  setEditedMoive,
} from "../../../features/MoviesSlice";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import "./Modal.scss";

const Modal = ({
  title,
  width,
  height,
  primaryButtonLabel = "Submit",
  primaryButtonFn,
  secondaryButtonLabel,
  secondaryButtonFn,
  children,
  setOpenModal,
}) => {
  const modalWidth = `${width}px`;
  const modalHeight = `${height}px`;
  const dispatch = useDispatch();
  const { editedMovie } = useSelector(selectAllMovies);

  const checkEditedMovie = () => {
    const emptyValues = Object.entries(editedMovie).filter(([key, value]) => {
      if (key === "genres") {
        return value.length === 1 && value[0] === "";
      }

      return value === "" || value === 0;
    });

    emptyValues.length === 0
      ? primaryButtonFn()
      : alert("All the fields are required!");
  };

  useEffect(() => {
    if (title.toLowerCase() === "add movie") {
      dispatch(
        setEditedMoive({
          title: "",
          vote_average: 0,
          genres: [],
          release_date: new Date().toLocaleDateString(),
          runtime: 0,
          overview: "",
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <div className="modal-container">
      <div
        className="modal-content"
        style={{ width: modalWidth, height: modalHeight }}
      >
        <div
          className="close-btn"
          onClick={() => {
            dispatch(
              setEditedMoive({
                title: "",
                vote_average: 0,
                genres: [],
                release_date: new Date().toLocaleDateString(),
                runtime: 0,
                overview: "",
              })
            );
            setOpenModal(undefined);
          }}
        >
          +
        </div>
        <h1 className="modal-header">{title}</h1>
        <div className="modal-form">{children}</div>
        <div className="modal-footer">
          <div className="btn-container">
            {secondaryButtonLabel && (
              <button className="secondary-button" onClick={secondaryButtonFn}>
                {secondaryButtonLabel}
              </button>
            )}
            <button
              className="primary-button"
              onClick={() => {
                console.log("editedMovie", editedMovie);
                checkEditedMovie();
              }}
            >
              {primaryButtonLabel}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("root")
  );
};

Modal.prototype = {
  title: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  primaryButtonFn: PropTypes.func,
  primaryButtonLabel: PropTypes.string,
  secondaryButtonFn: PropTypes.func,
  secondaryButtonLabel: PropTypes.string,
  setOpenModal: PropTypes.func.isRequired,
};

export default Modal;
