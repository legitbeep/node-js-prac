import * as user from "../user";

describe("User handler", () => {
  // or test()
  it("Should create new user in db", async () => {
    const req = {
      body: {
        username: "test1",
        password: "test1",
      },
    };
    // spy (mocked feature which tells when we interact with it)
    // since we want to check the token
    // basically a cb
    const res = {
      json: (token) => {
        expect(token).toBeTruthy();
      },
    };
    const next = (err) => {
      expect(err).toBeFalsy();
    };
    // should clean db after every run
    await user.createNewUser(req, res, next);
  });
});
