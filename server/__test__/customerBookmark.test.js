const request = require("supertest");
const app = require("../app");
const { Bookmark, Customer, Movie, Genre, User } = require("../models");
const { generateToken } = require("../helpers");

describe("Bookmark - GET&POST /cust/bookmark", function () {
  beforeAll(async () => {
    const genres = require("../data/genre.json");
    const users = require("../data/user.json");
    const movies = require("../data/movies.json");
    const customers = require("../data/customer.json");
    const bookmarks = require("../data/bookmark.json");

    await Genre.bulkCreate(genres);
    await User.bulkCreate(users);
    await Movie.bulkCreate(movies);
    await Customer.bulkCreate(customers);
    await Bookmark.bulkCreate(bookmarks);
  });

  afterAll(async () => {
    await Genre.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    await User.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    await Customer.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    await Movie.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
      force: true,
    });

    await Bookmark.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  });

  const access_token = generateToken({
    id: 1,
    email: "kiki123@email.com",
    role: "Customer",
  });

  it("Fetch bookmark", async function () {
    const response = await request(app)
      .get("/cust/bookmark")
      .set("access_token", access_token);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("data", expect.any(Object));
    expect(response.body.data[0]).toHaveProperty("id", 1);
  });

  it("Add/Post bookmark with id", async function () {
    const response = await request(app)
      .post("/cust/bookmark/14")
      .set("access_token", access_token);

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("Failed to add bookmark because the data is not available in the database", async function () {
    const response = await request(app)
      .post("/cust/bookmark/21")
      .set("access_token", access_token);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("message", "Can't find data");
  });

  it("Failed to fetch bookmark because the user hasn't logged in yet", async function () {
    const response = await request(app).post("/cust/bookmark");

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("message", "You need to login before accessing even further");
  });

  it("Failed to fetch bookmark because the user inputting invalid token", async function () {
    const response = await request(app)
      .post("/cust/bookmark")
      .set("access_token", "asdf");

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("message", "You need to login before accessing even further");
  });
});
