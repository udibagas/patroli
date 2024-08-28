const request = require("supertest");
const app = require("../app");
const { Area, Station, User, sequelize } = require("../models");

let token;
let station;
const areas = [];

beforeAll(async () => {
  const user = await User.create({
    email: "user@mail.com",
    password: "rahasia",
    role: "admin",
  });

  station = await Station.create({ code: "9", name: "Sembilan" });
  token = user.generateToken();
});

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true });
  await Area.destroy({ truncate: true, cascade: true });
  await Station.destroy({ truncate: true, cascade: true });
  await sequelize.close();
});

describe("Areas Controller", () => {
  test("POST /api/areas (SUCCESS)", async () => {
    const data = { StationId: station.id, name: "Area Satu" };
    const res = await request(app)
      .post("/api/areas")
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" })
      .send(data);

    areas.push(res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.StationId).toBe(data.StationId);
    expect(res.body.name).toBe(data.name);
  });

  test("POST /api/areas (ERROR)", async () => {
    const data = { StationId: null, name: null };
    const res = await request(app)
      .post("/api/areas")
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" })
      .send(data);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("SequelizeValidationError");
  });

  test("GET /api/areas (SUCCESS)", async () => {
    const res = await request(app)
      .get("/api/areas")
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /api/areas (SUCCESS)", async () => {
    const res = await request(app)
      .get("/api/areas")
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /api/areas/:id (SUCCESS)", async () => {
    const res = await request(app)
      .get(`/api/areas/${areas[0].id}`)
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(areas[0]);
  });

  test("GET /api/areas/:id (ERROR)", async () => {
    const res = await request(app)
      .get(`/api/areas/999`)
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" });

    expect(res.statusCode).toBe(404);
  });

  test("PUT /api/areas/:id (SUCCESS)", async () => {
    const data = { name: "Satu Edit" };
    const res = await request(app)
      .put(`/api/areas/${areas[0].id}`)
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" })
      .send(data);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      id: areas[0].id,
      StationId: station.id,
      name: "Satu Edit",
    });
  });

  test("DELETE /api/areas/:id (SUCCESS)", async () => {
    const res = await request(app)
      .delete(`/api/areas/${areas[0].id}`)
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Data telah dihapus" });
  });
});
