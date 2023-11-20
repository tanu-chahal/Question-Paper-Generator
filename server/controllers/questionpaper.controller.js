import _ from 'lodash';
import {getQuestionsByDifficulty} from '../utils.js';
import {questions} from '../data.js';

export const GetQuestionPaper = async(req,res)=>{
  res.status(200).send("To generate question paper, send a post request with no. of questions & difficulty distribution object in request body.")
}

export const GenerateQuestionPaper = async (req,res)=> {
  const {totalMarks, distribution} = req.body;
  const questionPaper = [];

  console.log(req.body)
  _.forEach(distribution, (percentage, difficulty) => {
    const difficultyQuestions = getQuestionsByDifficulty(questions, difficulty);
    const marksForDifficulty = Math.ceil(totalMarks * (percentage/100));
    const selectedQuestions = _.sampleSize(difficultyQuestions, (marksForDifficulty/5));
    questionPaper.push(...selectedQuestions);
  });

  if (questionPaper.length*5 !== totalMarks) {
  res.status(400).json({"errMsg" : 'Failed to generate question paper. Check distribution percentages.'});
  }
  res.status(201).json({questionPaper})
}
