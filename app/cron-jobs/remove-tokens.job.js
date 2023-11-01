const { CronJob } = require("cron");
const { DB } = require("../../db/db");
const { CRON_EXPRESSION } = require("./cron.constants");

async function removeOldTokens() {
  const count = await DB("tokens")
    .delete()
    .whereRaw("updated_at < CURRENT_TIMESTAMP - interval '2 months'");
  console.log(`removed ${count} tokens`);
}

exports.initRemoveOldTokensJob = function () {
  const job = CronJob.from({
    cronTime: CRON_EXPRESSION.EVERY_10_MINUTES,
    onTick: function () {
      removeOldTokens();
    },
    start: false,
    timeZone: "Europe/Warsaw",
  });
  job.start();
};
