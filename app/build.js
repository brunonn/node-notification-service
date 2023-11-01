const fastify = require("fastify");
const { handleGETNotis, handlePOSTNotis } = require("./notis/notis.handler");
const errorHandler = require("./errors/error.handler");
const { handlePOSTTokens } = require("./tokens/tokens.handler");
const { config } = require("../config");
const { JwtHook } = require("./auth/jwt.hook");
const { handlePOSTDevices } = require("./devices/devices.handler");

exports.build = function build() {
  config.initialize();

  const app = fastify({ logger: false });

  app.setErrorHandler(errorHandler);

  app.get("/api/notifications", { onRequest: JwtHook }, handleGETNotis);
  app.post("/api/notifications", { onRequest: JwtHook }, handlePOSTNotis);
  app.post("/api/fcm-tokens", handlePOSTTokens);
  app.post("/api/devices", { onRequest: JwtHook }, handlePOSTDevices);
  return app;
};
