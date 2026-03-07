import express from "express";
import pool from "./db.js";

const app = express();
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { name, dob, voterId } = req.body;

    if (!name || !dob || !voterId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const voterRegex = /^[A-Z0-9]{10}$/;
    if (!voterRegex.test(voterId)) {
      return res.status(400).json({ message: "Invalid voter ID format" });
    }

    const result = await pool.query(
      "INSERT INTO candidates (name, dob, voter_id) VALUES ($1, $2, $3) RETURNING *",
      [name, dob, voterId]
    );

    res.status(201).json({
      message: "Registration successful",
      candidate: result.rows[0],
    });

  } catch (error) {

    if (error.code === "23505") { // duplicate key
      return res.status(400).json({ message: "Voter ID already registered" });
    }

    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});