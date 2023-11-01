const { DB } = require("../../db/db");
const { dropAll } = require("../../db/dropAll");
const { build } = require("../build");

describe("Tokens", () => {
  let app;
  beforeAll(async () => {
    app = build();
    await DB.migrate.latest();
  });
  afterAll(async () => {
    app.close();
    await DB.destroy();
  });
  beforeEach(async () => {
    await dropAll();
  });
  it("should add new token", async () => {
    const res = await app.inject({
      method: "POST",
      url: "api/fcm-tokens",
      payload: {
        device_id: "1",
        fcm_token: "1",
      },
    });
    expect(res.statusCode).toBe(201);
  });
  it("should fail when no device id is provided", async () => {
    const res = await app.inject({
      method: "POST",
      url: "api/fcm-tokens",
      payload: {
        fcm_token: "1",
      },
    });
    expect(res.statusCode).toBe(400);
  });
  it("should fail when no fcm token is provided", async () => {
    const res = await app.inject({
      method: "POST",
      url: "api/fcm-tokens",
      payload: {
        device_id: "1",
      },
    });
    expect(res.statusCode).toBe(400);
  });
  it("should replace previous token if device exists", async () => {
    const res = await app.inject({
      method: "POST",
      url: "api/fcm-tokens",
      payload: {
        fcm_token: "1",
        device_id: "1",
      },
    });
    expect(res.statusCode).toBe(201);
    const res2 = await app.inject({
      method: "POST",
      url: "api/fcm-tokens",
      payload: {
        fcm_token: "2",
        device_id: "1",
      },
    });
    expect(res2.statusCode).toBe(200);

    const data = await DB("tokens").where("device_id", "=", "1");
    expect(data.length).toBe(1);
  });
});
