const { DB } = require("../../db/db");

exports.Notis = {
  /**
   * @param {{limit: number; page: number}} pageQ
   */
  getAll(pageQ) {
    const q = DB("notis")
      .select("*")
      .limit(pageQ.limit + 1)
      .offset((pageQ.page - 1) * pageQ.limit);
    return q;
  },
  /**
   *
   * @param {{
   *  user_id: string;
   *  scheduled_at: Date;
   *  args: any;
   *  type: string;
   * }} data
   */
  insert(data) {
    return DB("notis")
      .insert({
        user_id: data.user_id,
        scheduled_at: data.scheduled_at,
        type: data.type,
        args: data.args,
      })
      .returning("*");
  },
};
