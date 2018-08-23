"use strict";

const UserManager = use("App/Managers/UserManager");
const TokenManager = use("App/Managers/TokenManager");
const WalletManager = use("App/Managers/WalletManager");
const PaymentManager = use("App/Managers/PaymentManager");

class PaymentController {
  async index({ request, response, view }) {
    const data = request.only(["uid", "amt", "tkn", "wlt"]);

    const userID = parseInt(data.uid, 10);
    const amount = parseFloat(data.amt, 10);
    const walletName = data.wlt;

    const user = await UserManager.findUserByID({
      id: userID
    });

    let validTransactionToken = await TokenManager.findTokenByParams({
      data: {
        user_id: user.id,
        is_revoked: 0,
        type: "payment"
      }
    });

    if (!validTransactionToken) {
      return response.status(401).send({
        error: {
          message: "Invalid token supplied."
        }
      });
    }

    await TokenManager.updateTokenByID({
      id: validTransactionToken.id,
      data: {
        is_revoked: 1
      }
    });

    let wallet = await WalletManager.findWalletByParams({
      data: {
        user_id: userID,
        name: walletName
      }
    });

    let balance = Number(wallet.balance, 10) + amount;

    let userWallet = await WalletManager.updateWalletByID({
      id: wallet.id,
      data: { balance }
    });

    return view.render("payment.process");
  }

  async store({ request, response, auth }) {
    try {
      await auth.check();
      return new PaymentManager().generateTransactionToken(
        auth.user,
        "payment"
      );
    } catch (e) {
      return response.status(401).send("Missing or invalid api token");
    }
  }
}

module.exports = PaymentController;
