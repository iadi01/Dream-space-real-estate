import { MongoClient } from "mongodb";

const uri = "mongodb+srv://adijsr5_db_user:4lsccxmBGOd07H43@dream-space.qnc4u5m.mongodb.net/dreamspace?retryWrites=true&w=majority&appName=dream-space";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    
    // Update contact google maps link
    const contactRes = await db.collection("config").updateOne(
      { _id: "global_cms" },
      { $set: { "contact.googleMapsLink": "https://maps.google.com/maps?q=Pardih%20Dimna,%20Jamshedpur&z=14&output=embed" } }
    );
    console.log("Updated contact map:", contactRes);

    // Update all projects map embed URLs
    const projectRes = await db.collection("projects").updateMany(
      {},
      { $set: { googleMapEmbedUrl: "https://maps.google.com/maps?q=Pardih%20Dimna,%20Jamshedpur&z=14&output=embed" } }
    );
    console.log("Updated projects maps count:", projectRes.modifiedCount);

  } catch (error) {
    console.error("Failed to update maps:", error);
  } finally {
    await client.close();
  }
}

run();
