import express from "express";
//import { getAllArticles } from "./queries.js";
import env from "dotenv";
import { createClient } from "@supabase/supabase-js";

env.config();

const app = express();

const supabase = createClient(
  process.env.DATABASE_URL,
  process.env.DATABASE_KEY
);

app.get("/", (_, response) =>
  response.json({ info: "Node.js, Express, and Postgres API" })
);

// Get all articles
app.get("/articles", async (_, response) => {
  try {
    const { data, error } = await supabase.from("blog").select();
    console.log(data);

    return response.send(data);
  } catch (error) {
    return response.send({ error });
  }
});

// Get an article
app.get("/articles/:id", async (request, response) => {
  try {
    const { data, error } = await supabase
      .from("blog")
      .select()
      .eq("id", request.params.id)
      .order("id", { ascending: true });

    console.log(data);
    return response.send(data);
  } catch (error) {
    return response.send({ error });
  }
});

app.listen(process.env.PORT, () => console.log("Server is running..."));
