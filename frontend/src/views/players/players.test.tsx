import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import {BrowserRouter as Router} from 'react-router-dom';
import PlayersPage from "./players";
import {playersApi} from "./players_api";

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


describe("Testing players API", () => {
  it('Get all players', async () => {
    // FIXME: this is not really testing any thing, as we've mocked the api anyway.
    const data = await playersApi.getAll();
    expect(data).not.toBeFalsy();
  });
});

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