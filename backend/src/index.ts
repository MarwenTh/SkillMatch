import "dotenv/config";
import express, { Request, Response } from "express";
import { Client } from "pg";

const app = express();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client
  .connect()
  .then(() => console.log("Connected to NeonDB!"))
  .catch((err: unknown) => console.error("Database connection error:", err));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server is running at http://localhost:${process.env.SERVER_PORT}`
  );
});
