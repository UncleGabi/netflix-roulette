/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useAppDispatch, useAppSelector } from "../../app/redux-hooks";
import renderer from "react-test-renderer";

import Header from "./Header";
import { BrowserRouter as Router } from "react-router-dom";
import { testUseAppSelector } from "../../app/test-app-selector";

jest.mock("../../app/redux-hooks");

describe("Header component", () => {
  const dispatch = jest.fn;

  beforeEach(() => {
    useAppSelector.mockImplementation(testUseAppSelector);
    useAppDispatch.mockImplementation(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderHeader = () => (
    <Router>
      <Header />
    </Router>
  );

  it("should render Header component correctly", () => {
    const tree = renderer
      .create(
        <Router>
          <Header />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should change input value when user types in it", () => {
    const { container } = render(
      <Router>
        <Header />
      </Router>
    );
    const titleInput = container.querySelector("input");

    userEvent.type(titleInput, "movie");

    expect(titleInput).toHaveValue("movie");
    expect(useAppDispatch).toHaveBeenCalled();
  });
});
