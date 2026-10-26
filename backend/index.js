require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./db");

const port = process.env.PORT || 6001;

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Default route
app.get("/", (req, res) => {
  res.json({
    message: "server is running",
  });
});

// Import and use routes
const questionRoutes = require("./routes/question-routes");

app.use("/v1/questions", questionRoutes);

// Connect DB and start server
const startTime = Date.now();

connectDB().then(() => {
  const endTime = Date.now();

  app.listen(port, () => {
    console.log(
      `Server running on port ${port}, Time taken: ${endTime - startTime}ms`,
    );
  });
});
