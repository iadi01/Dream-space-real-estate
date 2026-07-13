import { MongoClient } from "mongodb";

const uri = "mongodb+srv://adijsr5_db_user:4lsccxmBGOd07H43@dream-space.qnc4u5m.mongodb.net/dreamspace?retryWrites=true&w=majority&appName=dream-space";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const leads = await db.collection("leads").find({}).toArray();
    console.log("Current leads in MongoDB database:");
    console.log(JSON.stringify(leads, null, 2));
  } catch (error) {
    console.error("Failed to query leads:", error);
  } finally {
    await client.close();
  }
}

run();
