const { DB } = require("../../db/db");

exports.Devices = {
  /**
   * @param {string} deviceId
   */
  findOneByDeviceId(deviceId) {
    return DB("user_devices").where("device_id", "=", deviceId);
  },
  createOne(deviceId, userId) {
    return DB("user_devices").insert({
      device_id: deviceId,
      user_id: userId,
    });
  },
  changeDeviceUser(deviceId, userId) {
    return DB("user_devices")
      .update({
        user_id: userId,
      })
      .where("device_id", "=", deviceId);
  },
};
