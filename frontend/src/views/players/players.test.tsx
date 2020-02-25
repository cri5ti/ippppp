import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import {BrowserRouter as Router} from 'react-router-dom';
import PlayersPage from "./players";
import {playersApi} from "../../api/players";

jest.mock('./players_api', () => ({
  playersApi: {
    getAll: jest.fn(() => [
      {code:'p1', description: "John", email: 'john@example.com'},
      {code:'p2', description: "Doe", email: 'doe@example.com'}
    ])
  }
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteMatch: () => ({url: '/players'}),
}));

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Players", () => {
  it('snapshot testing', async () => {
    await act(async () => {
      render(<Router><PlayersPage /></Router>, container);
    });

    expect(container).toMatchSnapshot();
  });
});
