const request = require("supertest");
const app = require("../app");
const { Station, User, sequelize } = require("../models");

let token;
const stations = [];

beforeAll(async () => {
  const user = await User.create({
    email: "user@mail.com",
    password: "rahasia",
    role: "admin",
  });

  token = user.generateToken();
});

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true });
  await Station.destroy({ truncate: true, cascade: true });
  await sequelize.close();
});

describe("Stations Controller", () => {
  test("POST /api/stations (SUCCESS)", async () => {
    const data = { code: "1", name: "Satu" };
    const res = await request(app)
      .post("/api/stations")
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" })
      .send(data);

    stations.push(res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.code).toBe(data.code);
    expect(res.body.name).toBe(data.name);
  });

  test("POST /api/stations (ERROR)", async () => {
    const data = { code: null, name: null };
    const res = await request(app)
      .post("/api/stations")
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" })
      .send(data);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("SequelizeValidationError");
  });

  test("GET /api/stations (SUCCESS)", async () => {
    const data = { code: null, name: null };
    const res = await request(app)
      .get("/api/stations")
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" })
      .send(data);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /api/stations (SUCCESS)", async () => {
    const data = { code: null, name: null };
    const res = await request(app)
      .get("/api/stations")
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /api/stations/:id (SUCCESS)", async () => {
    const data = { code: null, name: null };
    const res = await request(app)
      .get(`/api/stations/${stations[0].id}`)
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(stations[0]);
  });

  test("GET /api/stations/:id (ERROR)", async () => {
    const data = { code: null, name: null };
    const res = await request(app)
      .get(`/api/stations/999`)
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" });

    expect(res.statusCode).toBe(404);
  });
});
