exports.config = {
  jwtPrivateKey: () => process.env.JWT_PRIVATE,
  jwtPublicKey: () => process.env.JWT_PUBLIC,
  initialize() {
    require("dotenv").config();
  },
};
