const request = require("supertest");
const app = require("../app");
const { User, sequelize } = require("../models");

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true });
  await sequelize.close();
});

describe("Auth Controller", () => {
  test("POST /register", async () => {
    const user = { email: "test@mail.com", password: "rahasia" };
    const res = await request(app)
      .post("/register")
      .set("Content-Type", "application/json")
      .send(user);

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe(user.email);
  });
});
