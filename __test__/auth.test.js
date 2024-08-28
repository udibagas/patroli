const request = require("supertest");
const app = require("../app");
const { User, sequelize } = require("../models");

let token;

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true });
  await sequelize.close();
});

describe("Auth Controller", () => {
  test("POST /api/register", async () => {
    const user = { email: "test@mail.com", password: "rahasia" };
    const res = await request(app)
      .post("/api/register")
      .set("Content-Type", "application/json")
      .send(user);

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe(user.email);
  });

  test("POST /api/login", async () => {
    const user = { email: "test@mail.com", password: "rahasia" };
    const res = await request(app)
      .post("/api/login")
      .set("Content-Type", "application/json")
      .send(user);

    token = res.body.token;
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("GET /api/me", async () => {
    const res = await request(app)
      .get("/api/me")
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" });

    expect(res.statusCode).toBe(200);
  });
});
