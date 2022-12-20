const dotenv = require("dotenv");
dotenv.config();

const baseURL = process.env.BASE_URL;
const request = require("supertest");

describe("GET /movies", () => {
  let id;
  const newMovie = {
    title: "Pengabdi Setan 2 Comunion",
    description: "Adalah sebuah film horor Indonesia tahun 2022",
    rating: 7,
    image: "",
  };

  afterAll(async () => {
    await request(baseURL).delete(`/movies/${id}`);
  });

  beforeAll(async () => {
    await request(baseURL).post("/movies").send(newMovie);
    const response = await request(baseURL).get("/movies");
    const lastIndex = response.body.results.length - 1;
    id = response.body.results[lastIndex].id;
  });

  it("Should get movie", async () => {
    const getMovie = await request(baseURL).get(`/movies/${id}`);
    expect(getMovie.body.message).toBe("Succes get movie by id " + id);
    expect(getMovie.statusCode).toBe(200);
  });

  it("Should not get movie", async () => {
    let idx = 9999999;
    const getMovie = await request(baseURL).get(`/movies/${idx}`);
    expect(getMovie.body.message).toBe("Movie not found");
    expect(getMovie.statusCode).toBe(400);
  });
});

describe("POST /movies", () => {
  let id;
  const newMovie = {
    title: "Pengabdi Setan 2 Comunion",
    description: "Adalah sebuah film horor Indonesia tahun 2022",
    rating: 7,
    image: "",
  };
  afterAll(async () => {
    await request(baseURL).delete(`/movies/${id}`);
  });
  it("Should add movie", async () => {
    const addMovie = await request(baseURL).post("/movies").send(newMovie);
    const response = await request(baseURL).get("/movies");
    const lastIndex = response.body.results.length - 1;
    id = response.body.results[lastIndex].id;
    expect(addMovie.statusCode).toBe(201);
    expect(response.body.message).toBe("Success get movies");
  });
});

describe("DELETE /movies", () => {
  let id;
  const newMovie = {
    title: "Pengabdi Setan 2 Comunion",
    description: "Adalah sebuah film horor Indonesia tahun 2022",
    rating: 7,
    image: "",
  };
  beforeAll(async () => {
    await request(baseURL).post("/movies").send(newMovie);
    const response = await request(baseURL).get("/movies");
    const lastIndex = response.body.results.length - 1;
    id = response.body.results[lastIndex].id;
  });
  it("Should delete movie", async () => {
    const response = await request(baseURL).delete(`/movies/${id}`);
    expect(response.body.message).toBe("Succes delete movie by id " + id);
    expect(response.statusCode).toBe(200);
  });

  it("Should not delete movie", async () => {
    let idx = 9999999;
    const response = await request(baseURL).delete(`/movies/${idx}`);
    expect(response.body.message).toBe("Movie not found");
    expect(response.statusCode).toBe(400);
  });
});

describe("PATCH /movies", () => {
  let id;
  const newMovie = {
    title: "Pengabdi Setan 2 Comunion",
    description: "Adalah sebuah film horor Indonesia tahun 2022",
    rating: 7,
    image: "",
  };
  const updateMovie = {
    title: "Pengabdi Setan 2 Comunion (edited)",
  };
  afterAll(async () => {
    await request(baseURL).delete(`/movies/${id}`);
  });
  beforeAll(async () => {
    await request(baseURL).post("/movies").send(newMovie);
    const response = await request(baseURL).get("/movies");
    const lastIndex = response.body.results.length - 1;
    id = response.body.results[lastIndex].id;
  });

  it("Should update movie", async () => {
    const editMovie = await request(baseURL)
      .patch(`/movies/${id}`)
      .send(updateMovie);
    expect(editMovie.body.message).toBe("Succes update movie by id " + id);
    expect(editMovie.statusCode).toBe(200);
  });

  it("Should not update movie", async () => {
    let idx = 9999999;
    const response = await request(baseURL)
      .patch(`/movies/${idx}`)
      .send(updateMovie);
    expect(response.body.message).toBe("Movie not found");
    expect(response.statusCode).toBe(400);
  });
});
