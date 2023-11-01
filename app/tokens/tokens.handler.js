const AppError = require("../errors/app.error");
const { Tokens } = require("./tokens.repo");

/**
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} reply
 */
exports.handlePOSTTokens = async function handlePOSTTokens(req, reply) {
  const { device_id, fcm_token } = req.body;
  if (typeof device_id !== "string") {
    throw new AppError(400, "device id should be a string");
  }
  if (typeof fcm_token !== "string") {
    throw new AppError(400, "fcm_token should be a string");
  }
  if (!device_id) {
    throw new AppError(400, "device id is required");
  }
  if (!fcm_token) {
    throw new AppError(400, "fcm_token is required");
  }

  const [currentDevice] = await Tokens.findOneByDeviceId(device_id);
  if (!currentDevice) {
    await Tokens.insert(device_id, fcm_token);
    reply.status(201).send("");
    return;
  }
  await Tokens.updateByDeviceId(device_id, fcm_token);

  reply.status(200).send("");
  return;
};
