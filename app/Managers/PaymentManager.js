"use strict";

const randtoken = require("rand-token");
const moment = require("moment");

const TokenManager = use("App/Models/Token");
const Encrypter = use("Encryption");

class PaymentManager {
  async generateTransactionToken(user, type = "payment") {
    if (!user) return;
    let query = user.tokens();
    query = await this._addTokenConstraints(query, type);

    if (query.length) {
      return query[0].token;
    }

    const token = Encrypter.encrypt(randtoken.generate(16));
    await user.tokens().create({ type, token });

    return token;
  }

  /**
   * Adds query constraints to pull the right token
   *
   * @method _addTokenConstraints
   *
   * @param  {Object}            query
   * @param  {String}            type
   *
   * @private
   */
  async _addTokenConstraints(query, type) {
    return await query
      .where("type", type)
      .where("is_revoked", false)
      .where(
        "updated_at",
        ">=",
        moment()
          .subtract(12, "hours")
          .format(this.dateFormat)
      );
  }
}

module.exports = PaymentManager;
