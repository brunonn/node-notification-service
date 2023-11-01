const { DB } = require("../../db/db");

exports.Tokens = {
  /**
   * @param {string} deviceId
   */
  findOneByDeviceId(deviceId) {
    return DB("tokens").select("*").where("device_id", "=", deviceId);
  },
  /**
   * @param {string} deviceId
   * @param {string} fcmToken
   */
  updateByDeviceId(deviceId, fcmToken) {
    return DB("tokens")
      .update({
        fcm_token: fcmToken,
        updated_at: new Date(),
      })
      .where("device_id", "=", deviceId);
  },
  /**
   * @param {string} deviceId
   * @param {string} fcmToken
   */
  insert(deviceId, fcmToken) {
    return DB("tokens").insert({
      device_id: deviceId,
      fcm_token: fcmToken,
    });
  },
};
