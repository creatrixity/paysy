"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use("Route");

Route.on("/").render("welcome");

Route.resource("/api/v1/wallets", "WalletController");

Route.resource("/api/v1/users", "UserController");

Route.resource("/api/v1/auth", "AuthController");

Route.resource("/api/v1/payments", "PaymentController");
