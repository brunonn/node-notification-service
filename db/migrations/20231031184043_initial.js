/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("notis", (table) => {
    table
      .string("id")
      .defaultTo(knex.raw("gen_random_uuid()"))
      .notNullable()
      .primary();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("deleted_at");
    table.timestamp("scheduled_at").notNullable();
    table.timestamp("sent_at");
    table.string("type").notNullable();
    table.json("args").notNullable();
    table.string("user_id").notNullable().index();
  });
  await knex.schema.createTable("tokens", (table) => {
    table.string("device_id").primary();
    table.string("fcm_token").notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
  });
  await knex.schema.createTable("user_devices", (table) => {
    table.string("device_id").primary();
    table.string("user_id").notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("notis");
  await knex.schema.dropTable("tokens");
  await knex.schema.dropTable("user_devices");
};
