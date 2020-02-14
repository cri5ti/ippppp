import {playersCtrl} from "./players.ctrl";
import "isomorphic-fetch"
// import {test, it} from "jest"

describe("Testing players API", () => {
  it('Get all players', async () => {
    // expect.assertions(1);
    const data = await playersCtrl.getAll(false);
    expect(data).not.toBeFalsy();
  })
});
