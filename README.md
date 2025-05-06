# Simple Counter API

A lightweight counter API built with Hono and Cloudflare Workers, designed to be deployed on Cloudflare.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a KV namespace:

   - Go to the Cloudflare dashboard
   - Navigate to Workers & Pages
   - Create a new KV namespace
   - Copy the namespace ID
   - Update the `wrangler.toml` file with your namespace ID

3. Development:

```bash
npm run dev
```

4. Deploy:

```bash
npm run deploy
```

## Storage

This application uses Cloudflare KV (Key-Value) storage.

## API Endpoints

- `GET /counter` - Get the current counter value
- `POST /increment` - Increment the counter by 1

## Usage in Webflow

Add this JavaScript code to your Webflow custom code section:

```javascript
// Replace with your deployed API URL
const API_URL = "https://your-worker.workers.dev";

// Function to increment the counter
async function incrementCounter() {
  try {
    const response = await fetch(`${API_URL}/increment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("Counter incremented:", data.count);
  } catch (error) {
    console.error("Error incrementing counter:", error);
  }
}

// Add this to your form submission handler
document
  .querySelector("your-form-selector")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    await incrementCounter();
    // Your existing form submission logic here
  });
```

## Notes

- The counter is stored in Cloudflare KV and persists between deployments
- For production use, you should replace the CORS origin with your actual Webflow domain
- Consider adding authentication if needed for production use
- The counter is globally distributed and highly available
