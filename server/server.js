import express from 'express';
import dotenv from "dotenv";
const app = express();
import QuestionPaperRouter from "./routes/questionpaper.route.js"
const PORT = process.env.PORT || 4000;
dotenv.config();
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.use("/api/questionpaper", QuestionPaperRouter);
  
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
