const request = require("supertest");
const app = require("../app");
const { Movie, Genre, User } = require("../models");

describe("GET /cust/movies", function () {
  beforeAll(async () => {
    const genres = require("../data/genre.json");
    const users = require("../data/user.json");
    const movies = require("../data/movies.json");

    await Genre.bulkCreate(genres);
    await User.bulkCreate(users);
    await Movie.bulkCreate(movies);
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

    await Movie.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
      force: true,
    });
  });

  it("Fetch movies", async function () {
    const response = await request(app).get("/cust/movies");
    console.log(response.body, 39);
    expect(response.status).toEqual(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body).toHaveProperty("totalData", expect.any(Number));
    expect(response.body).toHaveProperty("totalPage", expect.any(Number));
  });

  it("Fetch movies with 1 genre filter", async function () {
    const response = await request(app).get("/cust/movies?genreFilter=Horror");

    expect(response.status).toEqual(200);
    expect(response.body.data.length).toEqual(4);
    expect(response.body.data[0].Genre).toHaveProperty("name", "Horror");
    expect(response.body.data[1].Genre).toHaveProperty("name", "Horror");
    expect(response.body.data[2].Genre).toHaveProperty("name", "Horror");
  });

  it("Fetch movies with pagination", async function () {
    const response = await request(app).get("/cust/movies?currentPage=2");

    expect(response.status).toEqual(200);
    expect(response.body.data.length).toEqual(4);
    expect(response.body.data).toEqual(expect.any(Object));
  });

  it("Fetch movies with params", async function () {
    const response = await request(app).get("/cust/movies/2");

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("data", expect.any(Object));
    expect(response.body.data).toHaveProperty("id", 2);
  });

  it("Failed to fetch movies with params because data is not available in the database", async function () {
    const response = await request(app).get("/cust/movies/21");

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("message", "Can't find data");
  });
});
