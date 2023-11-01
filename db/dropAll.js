const { DB } = require("./db");

exports.dropAll = async function dropAll() {
  await DB("notis").del();
  await DB("tokens").del();
  await DB("user_devices").del();
};
