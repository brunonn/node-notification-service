const { getPageQ, pageReq } = require("../pages/pages");
const { notiRes, NOTI_TYPE } = require("./notis.model");
const { Notis } = require("./notis.repo");

/**
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} reply
 */
exports.handleGETNotis = async function handleGETNotis(req, reply) {
  const pageQ = getPageQ(req);
  const data = await Notis.getAll(pageQ);
  return pageReq(notiRes(data), pageQ);
};

/**
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} reply
 */
exports.handlePOSTNotis = async function handlePOSTNotis(req, reply) {
  const userId = req.user.id;
  const data = await Notis.insert({
    user_id: userId,
    scheduled_at: new Date(),
    args: { userName: "Hello" },
    type: NOTI_TYPE.NEW_MESSAGE,
  });
  reply.status(201)
  return {
    data: data,
  };
};
