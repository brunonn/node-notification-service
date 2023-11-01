const AppError = require("../errors/app.error");
const { JWT } = require("./jwt");

exports.JwtHook = function JwtHook(req, reply, done) {
  const { authorization } = req.headers;
  if (typeof authorization !== "string") {
    done(new AppError(401, "unauthorized"));
  }
  const token = authorization.split(" ")?.[1];
  if (!token) {
    done(new AppError(401, "unauthorized"));
  }
  JWT.verify(token)
    .then((decoded) => {
      req.user = decoded;
      done();
    })
    .catch((err) => {
      done(new AppError(401, "unauthorized"));
    });
};
