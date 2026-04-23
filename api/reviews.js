import { MongoClient } from 'mongodb';

// The connection string gets injected by Vercel Environment Variables
const uri = process.env.MONGODB_URI;
let client;
let db;

async function connectToDatabase() {
  if (!client) {
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    client = new MongoClient(uri);
    await client.connect();
    db = client.db('cjportfolio'); // The database name we'll use
  }
  return db;
}

export default async function handler(req, res) {
  // Setup CORS to allow your GitHub Pages site to call this API
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // You can restrict this to your github pages URL later
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
      // Return the newest reviews first
      const reviews = await collection.find({}).sort({ createdAt: -1 }).toArray();
      res.status(200).json(reviews);
    } else if (req.method === 'POST') {
      const newReview = req.body;
      newReview.createdAt = new Date();
      await collection.insertOne(newReview);
      res.status(201).json({ success: true });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('MongoDB Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
