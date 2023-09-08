const request = require("supertest");
const app = require("../app");
const { Customer } = require("../models");

describe("POST /cust/login", () => {
  beforeAll(async () => {
    await Customer.create({
      email: "victor123@email.com",
      password: "asdasd123",
    });
  });

  afterAll(async () => {
    await Customer.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  });

  it("Login successful", async function () {
    const response = await request(app).post("/cust/login").send({
      email: "victor123@email.com",
      password: "asdasd123",
    });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      statusCode: 200,
      access_token: response.body.access_token,
    });
  });

  it("Wrong Password", async function () {
    const response = await request(app).post("/cust/login").send({
      email: "victor123@email.com",
      password: "asdasd12",
    });
    expect(response.status).toEqual(401);
    expect(response.body).toEqual({
      statusCode: 401,
      message: "Invalid password or email",
    });
  });

  it("Wrong Email", async function () {
    const response = await request(app).post("/cust/login").send({
      email: "victor123@email.co.id",
      password: "asdasd123",
    });
    expect(response.status).toEqual(401);
    expect(response.body).toEqual({
      statusCode: 401,
      message: "Invalid password or email",
    });
  });
});
