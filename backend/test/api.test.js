const { test, describe, before, after } = require("node:test");
const assert = require("node:assert");
const http = require("node:http");
const { createApp } = require("../src/app");

describe("ShopKart Backend API Test Suite", () => {
  let server;
  let baseUrl;

  before(async () => {
    process.env.NODE_ENV = "test";
    const app = createApp();
    await new Promise((resolve) => {
      server = app.listen(0, "127.0.0.1", () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  // Helper function for sending HTTP GET requests
  function makeGet(path) {
    return new Promise((resolve, reject) => {
      http
        .get(`${baseUrl}${path}`, (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => {
            try {
              const body = data ? JSON.parse(data) : {};
              resolve({ status: res.statusCode, headers: res.headers, body });
            } catch (err) {
              resolve({ status: res.statusCode, headers: res.headers, raw: data });
            }
          });
        })
        .on("error", reject);
    });
  }

  test("GET /api/health - returns 200 and status UP", async () => {
    const res = await makeGet("/api/health");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.status, "UP");
    assert.strictEqual(res.body.service, "shopkart-backend");
    assert.ok(typeof res.body.uptime === "number");
    assert.ok(res.body.timestamp);
  });

  test("GET /api/products - returns 200 and catalog of products", async () => {
    const res = await makeGet("/api/products");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
    assert.ok(res.body.data.length >= 6);

    const first = res.body.data[0];
    assert.ok(first.id);
    assert.ok(first.name);
    assert.ok(first.price > 0);
  });

  test("GET /api/products?category=Electronics - filters correctly", async () => {
    const res = await makeGet("/api/products?category=Electronics");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    for (const prod of res.body.data) {
      assert.strictEqual(prod.category, "Electronics");
    }
  });

  test("GET /api/products/:id - returns product details for valid ID", async () => {
    const res = await makeGet("/api/products/prod-101");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.data.id, "prod-101");
    assert.strictEqual(res.body.data.name, "CloudNative DevOps Hoodie");
  });

  test("GET /api/products/:id - returns 404 for invalid ID", async () => {
    const res = await makeGet("/api/products/prod-invalid-999");
    assert.strictEqual(res.status, 404);
    assert.strictEqual(res.body.success, false);
    assert.strictEqual(res.body.error.code, "PRODUCT_NOT_FOUND");
  });

  test("GET /api/cart-demo - returns sample calculated cart", async () => {
    const res = await makeGet("/api/cart-demo");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(res.body.cart.summary);
    assert.ok(res.body.cart.summary.total > 0);
    assert.strictEqual(res.body.cart.currency, "USD");
  });

  test("GET /undefined-route - returns 404", async () => {
    const res = await makeGet("/api/non-existent-endpoint");
    assert.strictEqual(res.status, 404);
    assert.strictEqual(res.body.success, false);
    assert.strictEqual(res.body.error.code, "ROUTE_NOT_FOUND");
  });
});
