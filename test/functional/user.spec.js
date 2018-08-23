"use strict";

const { test, trait } = use("Test/Suite")("User");
const userData = {
  email: "john.doe@example.com",
  password: "secret",
  password_confirmation: "secret"
};

trait("Test/ApiClient");

test("Should create a user through the HTTP client", async ({ client }) => {
  const user = await client
    .post(`/api/v1/users`)
    .send(userData)
    .end();

  const response = await client.get(`/api/v1/users/${user.body.id}`).end();

  response.assertStatus(200);

  response.assertJSONSubset({
    email: userData.email
  });
}).timeout(0);

test("Should generate a token based on credentials passed through the HTTP client", async ({
  client
}) => {
  const response = await client
    .post(`/api/v1/auth`)
    .send({
      uid: userData["email"],
      password: userData["password"]
    })
    .end();

  response.assertStatus(200);

  response.assertJSONSubset({
    type: `bearer`
  });
}).timeout(0);

test("Should generate a transaction token for payments only if we are authenticated", async ({
  client
}) => {
  const authResponse = await client
    .post(`/api/v1/auth`)
    .send({
      uid: userData["email"],
      password: userData["password"]
    })
    .end();

  const token = authResponse.body.token;

  const paymentTokenResponse = await client
    .post(`/api/v1/payments`)
    .header("Authorization", `Bearer ${token}`)
    .send()
    .end();

  paymentTokenResponse.assertStatus(200);
}).timeout(0);
