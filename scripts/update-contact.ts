import { MongoClient } from "mongodb";

const uri = "mongodb+srv://adijsr5_db_user:4lsccxmBGOd07H43@dream-space.qnc4u5m.mongodb.net/dreamspace?retryWrites=true&w=majority&appName=dream-space";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    
    // Update contact numbers
    const result = await db.collection("config").updateOne(
      { _id: "global_cms" },
      { 
        $set: { 
          "contact.phone": "+91 99055 58959",
          "contact.whatsapp": "919905558959"
        } 
      }
    );
    console.log("Updated contact properties:", result);

  } catch (error) {
    console.error("Failed to update contact:", error);
  } finally {
    await client.close();
  }
}

run();
