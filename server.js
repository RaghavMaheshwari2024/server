import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import { $connect } from './config/db.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await $connect();
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("DB connection failed:", err);
  }
}

startServer();
