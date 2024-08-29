const request = require("supertest");
const app = require("../app");
const { InspectionTemplate, User, sequelize } = require("../models");

let token;
const templates = [];

beforeAll(async () => {
  const user = await User.create({
    name: "User 2",
    email: "user2@mail.com",
    password: "rahasia",
    role: "admin",
  });

  token = user.generateToken();
});

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true });
  await InspectionTemplate.destroy({ truncate: true, cascade: true });
  await sequelize.close();
});

describe("InspectionTemplates Controller", () => {
  test("POST /api/inspection-templates (SUCCESS)", async () => {
    const data = { result: "Tidak ada masalah" };
    const res = await request(app)
      .post("/api/inspection-templates")
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" })
      .send(data);

    templates.push(res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.result).toBe(data.result);
  });

  test("POST /api/inspection-templates (ERROR)", async () => {
    const data = { result: null };
    const res = await request(app)
      .post("/api/inspection-templates")
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" })
      .send(data);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("SequelizeValidationError");
  });

  test("GET /api/inspection-templates (SUCCESS)", async () => {
    const res = await request(app)
      .get("/api/inspection-templates")
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("PUT /api/inspection-templates/:id (SUCCESS)", async () => {
    const data = { result: "Data diedit" };
    const res = await request(app)
      .put(`/api/inspection-templates/${templates[0].id}`)
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" })
      .send(data);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: templates[0].id, ...data });
  });

  test("PUT /api/inspection-templates/:id (ERROR)", async () => {
    const data = { result: "" };
    const res = await request(app)
      .put(`/api/inspection-templates/${templates[0].id}`)
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" })
      .send(data);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("SequelizeValidationError");
  });

  test("DELETE /api/inspection-templates/:id (SUCCESS)", async () => {
    const res = await request(app)
      .delete(`/api/inspection-templates/${templates[0].id}`)
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Data telah dihapus" });
  });
});
