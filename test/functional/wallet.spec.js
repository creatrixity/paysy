"use strict";

const { test, trait } = use("Test/Suite")("Wallet");

trait("Test/ApiClient");

test("Should create a wallet through the HTTP client", async ({ client }) => {
  let data = {
    name: "STEEM",
    user_id: 1,
    balance: 0.0
  };

  const wallet = await client
    .post(`/api/v1/wallets`)
    .send(data)
    .end();

  const response = await client.get(`/api/v1/wallets/${wallet.body.id}`).end();

  response.assertStatus(200);

  response.assertJSONSubset(data);
}).timeout(0);

test("Should update the wallet with the id #1 through the HTTP client", async ({
  client
}) => {
  let walletID = 1;

  let data = {
    balance: 5.0
  };

  const wallet = await client
    .put(`/api/v1/wallets/${walletID}`)
    .send(data)
    .end();

  const response = await client.get(`/api/v1/wallets/${walletID}`).end();

  response.assertStatus(200);

  response.assertJSONSubset(data);
}).timeout(0);
