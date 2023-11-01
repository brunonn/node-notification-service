const jwt = require("jsonwebtoken");
const { config } = require("../../config");

exports.JWT = {
  /**
   * @param {string} token
   */
  verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        config.jwtPublicKey(),
        {
          algorithms: ["RS256"],
        },
        (err, decoded) => {
          if (err) {
            console.log(err);
            reject(err);
            return;
          }
          resolve(decoded);
        }
      );
    });
  },
  /**
   * @param {{id: string}} payload
   */
  sign(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        config.jwtPrivateKey(),
        {
          expiresIn: "2d",
          algorithm: "RS256",
        },
        (err, token) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(token);
        }
      );
    });
  },
};
