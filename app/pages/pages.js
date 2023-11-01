const AppError = require("../errors/app.error");

/**
 *
 * @param {import("fastify").FastifyRequest} req
 */
exports.getPageQ = function getPageQ(req) {
  let { page = "1", limit = "20" } = req.query;

  try {
    page = +page;
    limit = +limit;
    if (isNaN(limit)) {
      throw "";
    }
    if (isNaN(page)) {
      throw "";
    }
    return {
      page,
      limit,
    };
  } catch (error) {
    throw new AppError(400, "invalid page or query param");
  }
};

exports.pageReq = function pageRes(data, pageOpt) {
  return {
    data: data.length > pageOpt.limit ? data.slice(0, data.length - 1) : data,
    meta: {
      next_page: data.length > pageOpt.limit ? pageOpt.page + 1 : null,
    },
  };
};
