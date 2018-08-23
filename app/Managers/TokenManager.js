"use strict";

const Token = use("App/Models/Token");

class TokenManager {
  static async updateTokenByID(payload) {
    let token = await Token.query()
      .where("id", payload.id)
      .update(payload.data);

    return token;
  }

  static async findTokenByParams(payload) {
    let token = await Token.query()
      .where(payload.data)
      .first();
    return token;
  }
}

module.exports = TokenManager;
