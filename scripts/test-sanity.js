const { createClient } = require("@sanity/client");
require("dotenv").config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dlqibmo9";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

console.log(`Connecting to Project ID: ${projectId}, Dataset: ${dataset}`);

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-07-07",
  useCdn: true,
  token,
});

async function runTest() {
  try {
    const categories = await client.fetch(`*[_type == "category"]`);
    console.log("Query completed successfully!");
    console.log(`Fetched categories count: ${categories.length}`);
    if (categories.length > 0) {
      console.log("Sample category name:", categories[0].name);
    } else {
      console.log("No categories found in dataset. (Safe: frontend will fall back to local mock data).");
    }
  } catch (error) {
    console.error("Query failed with error:", error.message);
  }
}

runTest();
