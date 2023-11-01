const AppError = require("./app.error");

/**
 *
 * @param {unknown} error
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} reply
 */
function errorHandler(error, req, reply) {
  if (error instanceof AppError) {
    reply.status(error.code).send({
      status: error.code,
      message: error.message,
      stack: error.stack,
    });
  }
  if (error instanceof Error) {
    reply.status(500).send({
      status: 500,
      message: error.message,
      stack: error.stack,
    });
  }
  reply.status(500).send({ message: "internal server error" });
}

module.exports = errorHandler;
