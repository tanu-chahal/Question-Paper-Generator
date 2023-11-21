import _ from 'lodash';
import createError from "../createError.js"
import {getQuestionsByDifficulty} from '../utils.js';
import {questions} from '../data.js';

export const GetQuestionPaper = (req,res)=>{
  return res.status(200).json({"msg": "To generate question paper, send a post request with no. of questions & difficulty distribution object in request body."})
}

export const GenerateQuestionPaper = (req,res,next)=> {
  const {totalMarks, distribution} = req.body;
  const questionPaper = [];

  if(_.reduce(distribution, function(result, value, key) { return result + value;}, 0) !== 100){
    return next(createError(400,'Invalid distribution. The sum of percentages should be 100.'));
  }

  _.forEach(distribution, (percentage, difficulty) => {
    const difficultyQuestions = getQuestionsByDifficulty(questions, difficulty);
    const reqQuesForDifficulty = Math.ceil((totalMarks * (percentage/100))/5);
    const difficultyQuesCount = difficultyQuestions.length;

    if(difficultyQuesCount < reqQuesForDifficulty){
      return next(createError(400,`Don't have enough ${difficulty} questions for this distribution.`));
    }
    const selectedQuestions = _.sampleSize(difficultyQuestions, reqQuesForDifficulty);
    questionPaper.push(...selectedQuestions);
  });

  if (questionPaper.length*5 !== totalMarks) {
  return next(createError(400,'Failed to generate question paper. Distribution percentages or marks for each question doesn\'t sync with (or make) total marks.'));
  }
  return res.status(201).json({questionPaper})
}
