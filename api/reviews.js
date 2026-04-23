import { MongoClient } from 'mongodb';

// The connection string gets injected by Vercel Environment Variables
const uri = process.env.MONGODB_URI;
let client;
let db;

async function connectToDatabase() {
  console.log("------ [MongoDB Debug Log] ------");
  console.log("1. Attempting database connection...");
  
  if (!client) {
    if (!uri) {
      console.error("CRITICAL ERROR: MONGODB_URI environment variable is missing!");
      console.error("Please add it in Vercel > Settings > Environment Variables.");
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    
    try {
      console.log("2. URI found. Password looks correct. Establishing connection via MongoDB driver...");
      
      // Setup client with a 5-second timeout so it fails quickly if connection string is bad
      client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000
      });
      
      await client.connect();
      db = client.db('cjportfolio'); // Ensure this is the DB name you want inside Atlas
      
      console.log("3. SUCCESS! Connected directly to MongoDB cluster.");
    } catch (e) {
      // This will catch exact reasons (wrong IP address whitelist, wrong password, etc.)
      console.error("FAILED to connect to MongoDB cluster. Error details:");
      console.error(e.message);
      throw e;
    }
  } else {
    console.log("2. Reusing existing MongoDB connection. (Fast!)");
  }
  return db;
}

export default async function handler(req, res) {
  console.log(`\n[API START] Received ${req.method} request directly to /api/reviews`);
  
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const database = await connectToDatabase();
    const collection = database.collection('reviews');

    if (req.method === 'GET') {
      console.log("4. Fetching reviews from 'reviews' collection...");
      const reviews = await collection.find({}).sort({ createdAt: -1 }).toArray();
      console.log(`5. Successfully retrieved ${reviews.length} reviews from MongoDB to send to React.`);
      res.status(200).json(reviews);
    } else if (req.method === 'POST') {
      console.log("4. Trying to save new review:", req.body);
      const newReview = req.body;
      newReview.createdAt = new Date();
      
      const result = await collection.insertOne(newReview);
      console.log("5. Insert SUCCESS! New MongoDB ID generated:", result.insertedId);
      res.status(201).json({ success: true, id: result.insertedId });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('------- [API FATAL ERROR] -------');
    console.error(error.message);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      details: error.message,
      help: "Check Vercel 'Logs' tab for exact details."
    });
  }
  console.log(`[API END] Finished handling request.`);
}
