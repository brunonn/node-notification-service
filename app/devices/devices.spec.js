const { config } = require("../../config");
const { DB } = require("../../db/db");
const { dropAll } = require("../../db/dropAll");
const { JWT } = require("../auth/jwt");
const { build } = require("../build");

describe("Devices", () => {
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
  it("should require authenticated user", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/devices",
    });
    expect(res.statusCode).toBe(401);
  });
  it("should create and assign the device", async () => {
    const token = await JWT.sign({ id: "1" });
    const res = await app.inject({
      method: "POST",
      url: "/api/devices",
      headers: {
        Authorization: "Bearer " + token,
      },
      payload: {
        device_id: "my-device-id",
      },
    });
    expect(res.statusCode).toBe(201);
    const devices = await DB("user_devices").where("device_id", "=", "my-device-id");
    expect(devices.length).toBe(1);
    expect(devices[0].user_id).toBe("1");
    expect(devices[0].device_id).toBe("my-device-id");
  });
  it("should assign the device if it exists", async () => {
    const token = await JWT.sign({ id: "1" });
    const res = await app.inject({
      method: "POST",
      url: "/api/devices",
      headers: {
        Authorization: "Bearer " + token,
      },
      payload: {
        device_id: "my-device-id",
      },
    });
    expect(res.statusCode).toBe(201);
    const res2 = await app.inject({
      method: "POST",
      url: "/api/devices",
      headers: {
        Authorization: "Bearer " + token,
      },
      payload: {
        device_id: "my-device-id",
      },
    });

    expect(res2.statusCode).toBe(200);
    const devices = await DB("user_devices").where("device_id", "=", "my-device-id");
    expect(devices.length).toBe(1);
    expect(devices[0].user_id).toBe("1");
    expect(devices[0].device_id).toBe("my-device-id");
  });
});
