const request = require("supertest");
const app = require("../app");
const { Shift, User, sequelize } = require("../models");

let token;
const shifts = [];

beforeAll(async () => {
  const user = await User.create({
    name: "User 1",
    email: "user1@mail.com",
    password: "rahasia",
    role: "admin",
  });

  token = user.generateToken();
});

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true });
  await Shift.destroy({ truncate: true, cascade: true });
  await sequelize.close();
});

describe("Shifts Controller", () => {
  test("POST /api/shifts (SUCCESS)", async () => {
    const data = { name: "PAGI", start: "07:00", end: "18:00" };
    const res = await request(app)
      .post("/api/shifts")
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" })
      .send(data);

    shifts.push(res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(data.name);
    expect(res.body.start).toBe(data.start);
    expect(res.body.end).toBe(data.end);
  });

  test("POST /api/shifts (ERROR)", async () => {
    const data = { name: null, start: "", end: "" };
    const res = await request(app)
      .post("/api/shifts")
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" })
      .send(data);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("SequelizeValidationError");
  });

  test("GET /api/shifts (SUCCESS)", async () => {
    const res = await request(app)
      .get("/api/shifts")
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("PUT /api/shifts/:id (SUCCESS)", async () => {
    const data = { name: "SIANG", start: "12:00", end: "22:00" };
    const res = await request(app)
      .put(`/api/shifts/${shifts[0].id}`)
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" })
      .send(data);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: shifts[0].id, ...data });
  });

  test("PUT /api/shifts/:id (ERROR)", async () => {
    const data = { name: "", start: "12:00", end: "22:00" };
    const res = await request(app)
      .put(`/api/shifts/${shifts[0].id}`)
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" })
      .send(data);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("SequelizeValidationError");
  });

  test("DELETE /api/shifts/:id (SUCCESS)", async () => {
    const res = await request(app)
      .delete(`/api/shifts/${shifts[0].id}`)
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Data telah dihapus" });
  });
});
