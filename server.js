import express from "express";
//import { getAllArticles } from "./queries.js";
import env from "dotenv";
import { createClient } from "@supabase/supabase-js";

env.config();

const app = express();
const router = express.Router;

app.get("/", (request, response) =>
  response.json({ info: "Node.js, Express, and Postgres API" })
);

app.get("/articles", getAllArticles);

//console.log(process.env.PORT);
app.listen(process.env.PORT, () => console.log("Server is running..."));
