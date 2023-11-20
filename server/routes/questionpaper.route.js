import express from 'express'
const router = express.Router();
import { GetQuestionPaper, GenerateQuestionPaper} from "../controllers/questionpaper.controller.js"

router.get("/", GetQuestionPaper)
router.post("/", GenerateQuestionPaper)

export default router;