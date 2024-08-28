const request = require("supertest");
const app = require("../app");
const { Station, User, sequelize } = require("../models");

let token;

beforeAll(async () => {
  const user = await User.create({
    email: "user@mail.com",
    password: "rahasia",
    role: "user",
  });

  token = user.generateToken();
});

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true });
  await Station.destroy({ truncate: true, cascade: true });
  await sequelize.close();
});

describe("Stations Controller", () => {
  test("POST /api/stations", async () => {
    const data = { code: "1", name: "Satu" };
    const res = await request(app)
      .post("/api/stations")
      .set("Content-Type", "application/json")
      .send(data);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(data);
  });
});
