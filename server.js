const { build } = require("./app/build");

async function main() {
  const app = build();
  const PORT = 3000;
  try {
    await app.listen({ port: PORT });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

main();
