"use strict";

const Wallet = use("App/Models/Wallet");

class WalletManager {
  static async findOrCreateWallet(payload) {
    let wallet = await Wallet.findOrCreate(payload.data);

    return wallet.toJSON();
  }

  static async updateWalletByID(payload) {
    let wallet = await Wallet.query()
      .where("id", payload.id)
      .update(payload.data);

    return wallet;
  }

  static async findWalletByID(payload) {
    let wallet = await Wallet.find(payload.id);
    return wallet.toJSON();
  }

  static async findWalletByParams(payload) {
    let wallet = await Wallet.query()
      .where(payload.data)
      .first();
    return wallet;
  }
}

module.exports = WalletManager;
