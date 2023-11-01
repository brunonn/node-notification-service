const AppError = require("../errors/app.error");
const { Devices } = require("./devices.repo");

/**
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} reply
 */
exports.handlePOSTDevices = async function handlePOSTDevices(req, reply) {
  const userId = req.user.id;
  const { device_id } = req.body;
  if (typeof device_id !== "string") {
    throw new AppError(400, "device id should be a string");
  }
  if (!device_id) {
    throw new AppError(400, "device id should be not be empty");
  }
  const [current] = await Devices.findOneByDeviceId(device_id);
  if (!current) {
    await Devices.createOne(device_id, userId);
    reply.status(201).send("");
    return;
  }
  await Devices.changeDeviceUser(device_id, userId);
  reply.status(200).send("");
  return;
};
