const express = require("express");
const cors = require("cors");
const { PRODUCTS } = require("./products.data");

function createApp() {
  const app = express();

  // Environment-aware configuration
  const allowedOrigin = process.env.CORS_ORIGIN || "*";
  const serviceName = process.env.SERVICE_NAME || "shopkart-backend";
  const appVersion = process.env.APP_VERSION || "1.0.0";
  const environment = process.env.NODE_ENV || "development";

  // Middleware
  app.use(
    cors({
      origin: allowedOrigin === "*" ? "*" : allowedOrigin.split(","),
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"]
    })
  );

  app.use(express.json());

  // Structured request logging
  app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      // In production, forward to structured log collectors (Prometheus / FluentBit / CloudWatch)
      if (process.env.NODE_ENV !== "test") {
        console.log(
          `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
        );
      }
    });
    next();
  });

  // Health check endpoint (Readiness & Liveness probes for Kubernetes / Harness)
  app.get("/api/health", (req, res) => {
    res.status(200).json({
      status: "UP",
      service: serviceName,
      version: appVersion,
      environment: environment,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      checks: {
        database: "simulated-in-memory-ok",
        memoryUsage: process.memoryUsage()
      }
    });
  });

  // Root landing check
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "ShopKart Backend API is running",
      documentation: "/api/products",
      healthCheck: "/api/health"
    });
  });

  // Product catalog - List all products
  app.get("/api/products", (req, res) => {
    const { category, search } = req.query;
    let filtered = [...PRODUCTS];

    if (category) {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered
    });
  });

  // Product catalog - Get product by ID
  app.get("/api/products/:id", (req, res) => {
    const product = PRODUCTS.find((p) => p.id === req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: {
          code: "PRODUCT_NOT_FOUND",
          message: `Product with identifier '${req.params.id}' was not found in the catalog.`
        }
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  });

  // Demo Cart calculation endpoint
  app.get("/api/cart-demo", (req, res) => {
    // Demonstrates pricing engine calculation with sample cart items
    const sampleItems = [
      { product: PRODUCTS[0], quantity: 1 },
      { product: PRODUCTS[3], quantity: 2 }
    ];

    const subtotal = sampleItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const taxRate = 0.0825; // 8.25% demo sales tax
    const tax = +(subtotal * taxRate).toFixed(2);
    const shipping = subtotal > 50 ? 0.0 : 9.99;
    const total = +(subtotal + tax + shipping).toFixed(2);

    res.status(200).json({
      success: true,
      cart: {
        id: "demo-cart-001",
        currency: "USD",
        items: sampleItems,
        summary: {
          subtotal: +subtotal.toFixed(2),
          tax: tax,
          shipping: shipping,
          isFreeShipping: shipping === 0,
          total: total
        }
      }
    });
  });

  // 404 handler for undefined routes
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: {
        code: "ROUTE_NOT_FOUND",
        message: `Route ${req.method} ${req.originalUrl} does not exist.`
      }
    });
  });

  // Global error handler
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.error("Unhandled API error:", err);
    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred while processing your request."
      }
    });
  });

  return app;
}

module.exports = { createApp };
