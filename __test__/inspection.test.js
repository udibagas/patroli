const request = require("supertest");
const app = require("../app");
const { Inspection, Station, User, sequelize } = require("../models");

let token;
let station;
const inspections = [];

beforeAll(async () => {
  const user = await User.create({
    name: "User 3",
    email: "user3@mail.com",
    password: "rahasia",
    role: "admin",
  });

  station = await Station.create({ code: "111", name: "Satu Satu" });
  token = user.generateToken();
});

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true });
  await Inspection.destroy({ truncate: true, cascade: true });
  await sequelize.close();
});

describe("Inspections Controller", () => {
  test("POST /api/inspections (SUCCESS)", async () => {
    const data = {
      result: "Tidak ada kegiatan",
      StationId: station.id,
      images: [
        { name: "Photo 1", path: "/images/blabla1" },
        { name: "Photo 2", path: "/images/blabla2" },
      ],
    };

    const res = await request(app)
      .post("/api/inspections")
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" })
      .send(data);

    inspections.push(res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.result).toBe(data.result);
  });

  // test("POST /api/inspections (ERROR)", async () => {
  //   const data = { result: "" };
  //   const res = await request(app)
  //     .post("/api/inspections")
  //     .set("Content-Type", "application/json")
  //     .auth(token, { type: "bearer" })
  //     .send(data);

  //   expect(res.statusCode).toBe(400);
  //   expect(res.body.error).toBe("SequelizeValidationError");
  // });

  // test("GET /api/inspections (SUCCESS)", async () => {
  //   const res = await request(app)
  //     .get("/api/inspections")
  //     .set("Content-Type", "application/json")
  //     .auth(token, { type: "bearer" });

  //   expect(res.statusCode).toBe(200);
  //   expect(Array.isArray(res.body)).toBe(true);
  // });

  // test("GET /api/inspections/:id (SUCCESS)", async () => {
  //   const res = await request(app)
  //     .get(`/api/inspections/${inspections[0].id}`)
  //     .set("Content-Type", "application/json")
  //     .auth(token, { type: "bearer" });

  //   expect(res.statusCode).toBe(200);
  //   expect(res.body).toEqual(inspections[0]);
  // });

  // test("GET /api/inspections/:id (ERROR)", async () => {
  //   const res = await request(app)
  //     .get(`/api/inspections/999`)
  //     .set("Content-Type", "application/json")
  //     .auth(token, { type: "bearer" });

  //   expect(res.statusCode).toBe(404);
  // });

  // test("PUT /api/inspections/:id (SUCCESS)", async () => {
  //   const data = { result: "Sip" };
  //   const res = await request(app)
  //     .put(`/api/inspections/${inspections[0].id}`)
  //     .set("Content-Type", "application/json")
  //     .auth(token, { type: "bearer" })
  //     .send(data);

  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.result).toEqual("Sip");
  // });

  // test("PUT /api/inspections/:id (ERROR)", async () => {
  //   const data = { result: "" };
  //   const res = await request(app)
  //     .put(`/api/inspections/${inspections[0].id}`)
  //     .set("Content-Type", "application/json")
  //     .auth(token, { type: "bearer" })
  //     .send(data);

  //   expect(res.statusCode).toBe(400);
  //   expect(res.body.error).toBe("SequelizeValidationError");
  // });

  // test("DELETE /api/inspections/:id (SUCCESS)", async () => {
  //   const res = await request(app)
  //     .delete(`/api/inspections/${inspections[0].id}`)
  //     .set("Content-Type", "application/json")
  //     .auth(token, { type: "bearer" });

  //   expect(res.statusCode).toBe(200);
  //   expect(res.body).toEqual({ message: "Data telah dihapus" });
  // });
});
