import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

// Simulate KV storage
const kvStore = new Map<string, string>();

const app = new Hono();

// Enable CORS
app.use(
  "/*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
    exposeHeaders: ["Content-Length"],
    maxAge: 86400,
  })
);

// Get current counter value
app.get("/counter", (c) => {
  const count = kvStore.get("counter") || "0";
  return c.json({ count: parseInt(count) });
});

// Increment counter
app.post("/increment", (c) => {
  const currentCount = kvStore.get("counter") || "0";
  const newCount = (parseInt(currentCount) + 1).toString();
  kvStore.set("counter", newCount);
  return c.json({ count: parseInt(newCount) });
});

// Initialize counter
kvStore.set("counter", "0");

// Start server
const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
