import express from "express";
import env from "dotenv";

import cors from "cors";
import { createClient } from "@supabase/supabase-js";

env.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Post an article
app.post("/articles", async (request, response) => {
  try {
    console.log(request.body);
    const { data, error } = await supabase.from("blog").insert(request.body);
    if (error) {
      return response.status(400).json(error);
    }
    response.status(200).json(request.body);
  } catch (error) {
    response.send({ error });
  }
});

// Update an article
app.put("/articles/:id", async (request, response) => {
  console.log(request.params);
  try {
    const { data, err } = await supabase
      .from("blog")
      .select()
      .eq("id", parseInt(request.params.id));
    const { data: updatedData, error: updatedError } = await supabase
      .from("blog")
      .update({
        title: request.body.title ? request.body.title : data[0].title,
        content: request.body.content ? request.body.content : data[0].content,
        tags: request.body.tags ? request.body.tags : data[0].tags,
      })
      .eq("id", request.params.id);
    response.send(request.body);
  } catch (error) {
    response.send({ error });
  }
});

// Delete an article
app.delete("/articles/:id", async (request, response) => {
  try {
    const { data, error } = await supabase
      .from("blog")
      .delete()
      .eq("id", request.params.id);
    if (error) {
      return response.status(400).json(error);
    }
    response.status(200).json({ data });
  } catch (error) {
    response.send({ error });
  }
});

app.listen(process.env.PORT, () =>
  console.log(
    new Date().toLocaleTimeString() +
      `: Server is running on port ${process.env.PORT}...`
  )
);
