import { MongoClient } from "mongodb";

const uri = "mongodb+srv://adijsr5_db_user:4lsccxmBGOd07H43@dream-space.qnc4u5m.mongodb.net/dreamspace?retryWrites=true&w=majority&appName=dream-space";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection("config").updateOne(
      { _id: "global_cms" },
      { $set: { "about.image": "/about-drone.jpg" } }
    );
    console.log("Database update result:", result);
  } catch (error) {
    console.error("Failed to update database:", error);
  } finally {
    await client.close();
  }
}

run();
