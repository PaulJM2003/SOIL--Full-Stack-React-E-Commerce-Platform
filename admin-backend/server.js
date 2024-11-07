require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./src/schema");
const db = require("./src/database");

db.sync();

const app = express();

app.use(cors());  // Enable CORS for all routes

app.use("/graphql", graphqlHTTP({
  schema: schema,
  graphiql: true,
  customFormatErrorFn: (err) => {
    console.error("GraphQL Error:", err);
    return { message: err.message, status: err.status };
  }
}));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



