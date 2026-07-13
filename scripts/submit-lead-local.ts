import fs from "fs";
import path from "path";

// Load environment variables from .env.local manually for the standalone node script
const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join("=").trim();
    }
  });
}

async function test() {
  // Dynamically import db after env vars have been loaded
  const { saveLead, getLeads } = await import("../src/lib/db");

  console.log("Submitting a test lead directly to MongoDB...");
  const sampleLead = {
    name: "Aadi Kumar Test",
    phone: "9905558959",
    email: "adijsr5@gmail.com",
    project: "Silver Oak Enclave",
    message: "Test lead submission from backend validation script",
    source: "Contact Form",
    status: "New" as const
  };

  const saved = await saveLead(sampleLead);
  console.log("Saved lead:", saved);

  console.log("Fetching leads from MongoDB...");
  const leads = await getLeads();
  console.log("Current leads in database:");
  console.log(JSON.stringify(leads, null, 2));
}

test();
