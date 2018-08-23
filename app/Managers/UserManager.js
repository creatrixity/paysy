"use strict";

const User = use("App/Models/User");
const Persona = use("Persona");

class UserManager {
  static async all(payload) {
    return await User.all();
  }

  static async createUserFromData(payload) {
    return await Persona.register(payload.data);
  }

  static async findUserByID(payload) {
    let user = await User.find(payload.id);
    return user.toJSON();
  }

  static async findUserByParams(payload) {
    return await User.query().where(payload.data);
  }
}

module.exports = UserManager;
