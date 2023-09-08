const request = require("supertest");
const app = require("../app");
const { Customer } = require("../models");

describe("POST /cust/register", () => {
  beforeAll(async () => {
    await Customer.create({
      email: "duplicate@email.com",
      password: "asdasd123"
    });
  });

  afterAll(async () => {
    await Customer.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  });

  it("Registered", async () => {
    const payload = {
      email: "leli123@email.com",
      password: "asdasd123",
    };

    const response = await request(app).post("/cust/register").send(payload);
    expect(response.status).toEqual(201);
    expect(response.body.message).toEqual("Successfully created");
  });

  it("Email is null", async () => {
    const payload = {
      password: "asdasd123",
    };

    const response = await request(app).post("/cust/register").send(payload);

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual(["Email is required"]);
  });

  it("Password is null", async () => {
    const payload = {
      email: "leli123@email.com",
    };

    const response = await request(app).post("/cust/register").send(payload);

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual(["Password is required"]);
  });

  it("Email is empty string", async () => {
    const payload = {
      email: "",
      password: "asdasd123",
    };

    const response = await request(app).post("/cust/register").send(payload);

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual([
      "Email is required",
      "The email format you're inputting is invalid",
    ]);
  });

  it("Password is empty string", async () => {
    const payload = {
      email: "leli123@email.com",
      password: "",
    };

    const response = await request(app).post("/cust/register").send(payload);

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual([
      "Minimum password length is 5 characters",
      "Password is required",
    ]);
  });

  it("Email unique constraint", async () => {
    const payload = {
      email: "duplicate@email.com",
      password: "asdasd123",
    };

    const response = await request(app).post("/cust/register").send(payload);

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Email must be unique");
  });

  it("Email format invalid", async () => {
    const payload = {
      email: "test",
      password: "asdasd123",
    };

    const response = await request(app).post("/cust/register").send(payload);

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual(["The email format you're inputting is invalid"]);
  });

});
