import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
import QuestionPaperRouter from "./routes/questionpaper.route.js";
const PORT = process.env.PORT || 4000;
dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/questionpaper", QuestionPaperRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json(errorMessage);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
