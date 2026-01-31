require('dotenv').config();
import { listen } from './app';
import { $connect } from './config/db';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await $connect();
    console.log("Database connected");

    listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("DB connection failed:", err);
  }
}

startServer();
