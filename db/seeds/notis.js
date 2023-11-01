const crypto = require("crypto");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("notis").del();
  await knex("notis").insert(
    Array.from({ length: 50 })
      .fill(0)
      .map(() => ({
        user_id: crypto.randomUUID(),
        scheduled_at: new Date(),
        type: "NEW_MESSAGE",
        args: { redirectId: "someid", userName: "Username" },
      })),
  );
};
