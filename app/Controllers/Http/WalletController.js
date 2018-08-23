"use strict";

const WalletManager = use("App/Managers/WalletManager");

class WalletController {
  async store({ request }) {
    let { name, user_id, balance } = request.all();

    return WalletManager.findOrCreateWallet({
      data: {
        name,
        user_id,
        balance
      }
    });
  }

  async show({ request, params }) {
    let { id } = params;

    return WalletManager.findWalletByID({ id });
  }

  async update({ request, params }) {
    let { id } = params;
    let data = request.all();

    return WalletManager.updateWalletByID({ id, data });
  }
}

module.exports = WalletController;
