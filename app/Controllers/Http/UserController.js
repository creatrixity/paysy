"use strict";

const UserManager = use("App/Managers/UserManager");

class UserController {
  async index() {
    return await UserManager.all();
  }

  async store({ request, auth }) {
    const data = request.only(["email", "password", "password_confirmation"]);

    try {
      const foundUser = await UserManager.findUserByParams({
        data: {
          email: data.email
        }
      });

      if (foundUser.length > 0) {
        return foundUser[0];
      } else {
        const user = await UserManager.createUserFromData({ data });
        return user;
      }
    } catch (e) {
      return e;
    }
  }

  async show({ params }) {
    const { id } = params;

    return UserManager.findUserByID({ id });
  }
}

module.exports = UserController;
