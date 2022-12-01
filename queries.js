// import pg from "pg";

// const { Pool } = pg;

// const pool = new Pool({
//   user: "john",
//   host: "localhost",
//   database: "ausbildungblog",
//   password: "Ademoye75",
//   port: 5432,
// });

// const getAllArticles = (_, response) => {
//   pool.query("SELECT * FROM public.blog ORDER BY id ASC", (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   });
// };

// export { getAllArticles };
