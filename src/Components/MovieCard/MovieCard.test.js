/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, fireEvent, screen } from "@testing-library/react";
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
} from "../../app/redux-hooks";
import renderer from "react-test-renderer";

import MovieCard from "./MovieCard";
import { testUseAppSelector } from "../../app/test-app-selector";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";

const defaultProps = {
  key: "1",
  id: "1",
  title: "Movie title",
  src: "https://movie.com",
  genre: ["Comedy", "Adventure"],
  rating: "8.9",
  releaseYear: new Date("2022-04-04").getFullYear(),
  duration: 120,
  overview: "Description",
  openModal: false,
  setOpenModal: jest.fn(),
  setMovieId: jest.fn(),
};

jest.mock("../../app/redux-hooks");

describe("MovieCard component", () => {
  const dispatch = jest.fn;
  const navigate = jest.fn;

  beforeEach(() => {
    useAppSelector.mockImplementation(testUseAppSelector);
    useAppDispatch.mockImplementation(dispatch);
    useAppNavigate.mockImplementation(navigate);
  });

  afterEach(() => jest.clearAllMocks());
  it("should render correctly", () => {
    const tree = renderer
      .create(
        <Router>
          <MovieCard {...defaultProps} />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render edit/delete dropdown and run dispatch when edit is clicked", () => {
    const { container } = render(
      <Router>
        <MovieCard {...defaultProps} />
      </Router>
    );
    const dropdownIcon = container.querySelector(".edit-icon");

    userEvent.click(dropdownIcon);

    expect(container.querySelector(".edit-dropdown")).toBeInTheDocument();

    const editDropdown = container.querySelectorAll(".edit-dropdown__data")[0];

    userEvent.click(editDropdown);

    expect(useAppDispatch).toHaveBeenCalled();
  });

  it("should render edit/delete dropdown and run dispatch when delete is clicked", () => {
    const { container } = render(
      <Router>
        <MovieCard {...defaultProps} />
      </Router>
    );
    const dropdownIcon = container.querySelector(".edit-icon");

    userEvent.click(dropdownIcon);

    expect(container.querySelector(".edit-dropdown")).toBeInTheDocument();

    const editDropdown = container.querySelectorAll(".edit-dropdown__data")[1];

    userEvent.click(editDropdown);

    expect(useAppDispatch).toHaveBeenCalled();
  });

  it("should close edit dropdown when close btn is clicked", () => {
    const { container } = render(
      <Router>
        <MovieCard {...defaultProps} />
      </Router>
    );
    const dropdownIcon = container.querySelector(".edit-icon");

    userEvent.click(dropdownIcon);

    expect(container.querySelector(".edit-dropdown")).toBeInTheDocument();

    const closeBtn = document.querySelector(".close-btn");

    userEvent.click(closeBtn);

    expect(container.querySelector(".edit-dropdown")).not.toBeInTheDocument();
  });

  it("should call dispatch when move img is clicked", () => {
    const { container } = render(
      <Router>
        <MovieCard {...defaultProps} />
      </Router>
    );
    const movieImg = container.querySelector("img");

    userEvent.click(movieImg);

    expect(useAppNavigate).toHaveBeenCalled();
  });
});
