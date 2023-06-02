import app from "../server";
import supertest from "supertest";

// Integration tests

describe("Get /", () => {
  it("Should send back some data", async () => {
    const res = await supertest(app).get("/");
    expect(res.body.message).toBe("Server running 🚀");
  });
});
