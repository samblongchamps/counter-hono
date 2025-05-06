import { Hono } from "hono";
import { cors } from "hono/cors";
import type { KVNamespace } from "@cloudflare/workers-types";

// Define the environment type
type Bindings = {
  COUNTER_KV: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS for your Webflow domain
app.use(
  "/*",
  cors({
    origin: "*", // You should replace this with your actual Webflow domain in production
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
    exposeHeaders: ["Content-Length"],
    maxAge: 86400,
  })
);

// Get current counter value
app.get("/counter", async (c) => {
  const count = await c.env.COUNTER_KV.get("counter");
  return c.json({ count: parseInt(count || "0") });
});

// Increment counter
app.post("/increment", async (c) => {
  const currentCount = await c.env.COUNTER_KV.get("counter");
  const newCount = (parseInt(currentCount || "0") + 1).toString();
  await c.env.COUNTER_KV.put("counter", newCount);
  return c.json({ count: parseInt(newCount) });
});

export default app;
