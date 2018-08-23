"use strict";

const Persona = use("Persona");

class AuthController {
  async store({ request, auth }) {
    const payload = request.only(["uid", "password"]);
    const user = await Persona.verify(payload);
    const authScheme = `jwt`;

    return await auth
      .authenticator(authScheme)
      .withRefreshToken()
      .attempt(payload.uid, payload.password);
  }
}

module.exports = AuthController;
