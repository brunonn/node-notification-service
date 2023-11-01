const { config } = require("../../config");
const { DB } = require("../../db/db");
const { dropAll } = require("../../db/dropAll");
const { JWT } = require("../auth/jwt");
const { build } = require("../build");

describe("Notis", () => {
  let app;
  beforeAll(async () => {
    app = build();
    config.initialize();
    await DB.migrate.latest();
  });
  afterAll(async () => {
    app.close();
    await DB.destroy();
  });
  beforeEach(async () => {
    await dropAll();
  });
  it("should respond with 200", async () => {
    const token = await JWT.sign({ id: "1" });
    const res = await app.inject({
      method: "GET",
      url: "api/notifications",
      headers: {
        authorization: "Bearer " + token,
      },
    });
    expect(res.statusCode).toBe(200);
  });
  it("should require authenticated user", async () => {
    const res = await app.inject({
      method: "GET",
      url: "api/notifications",
    });
    expect(res.statusCode).toBe(401);
  });
  it("should return data and meta for current user", async () => {
    await DB("notis").insert({
      user_id: "1",
      scheduled_at: new Date(),
      type: "NEW_MESSAGE",
      args: { userName: "Hello" },
    });
    const token = await JWT.sign({ id: "1" });
    const res = await app.inject({
      method: "GET",
      url: "api/notifications",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    expect(res.statusCode).toBe(200);
    const json = res.json();
    expect(json.data).toBeDefined();
    expect(json.meta).toEqual({ next_page: null });
    expect(json.data[0].type).toBe("NEW_MESSAGE");
    expect(json.data[0].user_id).toBe("1");
    const anotherUserNoti = json.data.find((item) => item.user_id !== "1");
    expect(anotherUserNoti).toBe(undefined);
  });
  it("should create notification", async () => {
    const token = await JWT.sign({ id: "1" });
    const res = await app.inject({
      method: "POST",
      url: "api/notifications",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    expect(res.statusCode).toBe(201);
    const res2 = await app.inject({
      method: "GET",
      url: "api/notifications",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    expect(res2.statusCode).toBe(200);
    const json = res2.json();
    expect(json.data.length).toBe(1);
  });
});
