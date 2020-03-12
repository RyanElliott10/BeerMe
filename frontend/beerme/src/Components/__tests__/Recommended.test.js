import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter as Router } from "react-router-dom";

import Recommended from "../Recommended";
import UserController from "../../Controllers/UserController";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <Router>
        <Recommended />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with fromExplore prop", () => {
  const tree = renderer
    .create(
      <Router>
        <Recommended fromExplore={true} mainDesc={true} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with a user", () => {
  UserController.isLoggedIn = true;
  const tree = renderer
    .create(
      <Router>
        <Recommended />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
