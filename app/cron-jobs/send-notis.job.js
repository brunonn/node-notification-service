const { CronJob } = require("cron");
const { DB } = require("../../db/db");
const { CRON_EXPRESSION } = require("./cron.constants");

async function deliverNotifications(notis) {
  console.log(`delivered ${notis.length} notifications`);
}

async function sendNotifications() {
  const query = DB("notis")
    .whereNull("sent_at")
    .whereRaw("scheduled_at < CURRENT_TIMESTAMP")
    .whereRaw("scheduled_at < CURRENT_TIMESTAMP - interval '1 days'")
    .whereNull("deleted_at");
  const data = await query;

  await deliverNotifications(data);

  await DB("notis")
    .update({ sent_at: new Date() })
    .whereIn(
      "id",
      data.map((item) => item.id),
    );
}

exports.initSendNotificationsJob = function () {
  const job = CronJob.from({
    cronTime: CRON_EXPRESSION.EVERY_10_MINUTES,
    onTick: function () {
      sendNotifications();
    },
    start: false,
    timeZone: "Europe/Warsaw",
  });
  job.start();
};
