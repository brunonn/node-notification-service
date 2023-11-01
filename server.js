const { build } = require("./app/build");
const { initRemoveOldTokensJob } = require("./app/cron-jobs/remove-tokens.job");
const { initSendNotificationsJob } = require("./app/cron-jobs/send-notis.job");

async function main() {
  const app = build();
  const PORT = 3000;
  try {
    initRemoveOldTokensJob();
    initSendNotificationsJob();
    await app.listen({ port: PORT });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

main();
