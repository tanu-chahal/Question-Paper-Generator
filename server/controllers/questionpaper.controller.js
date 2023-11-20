import _ from 'lodash';
import {getQuestionsByDifficulty} from '../utils.js';
import {questions} from '../data.js';

export const GetQuestionPaper = (req,res)=>{
  return res.status(200).json({"msg": "To generate question paper, send a post request with no. of questions & difficulty distribution object in request body."})
}

export const GenerateQuestionPaper = (req,res)=> {
  const {totalMarks, distribution} = req.body;
  const questionPaper = [];

  if(_.reduce(distribution, function(result, value, key) { return result + value;}, 0) !== 100){
    return res.status(400).json({"errMsg":'Invalid distribution. The sum of percentages should be 100.'});
  }

  _.forEach(distribution, (percentage, difficulty) => {
    const difficultyQuestions = getQuestionsByDifficulty(questions, difficulty);
    const reqQuesForDifficulty = Math.ceil((totalMarks * (percentage/100))/5);
    const difficultyQuesCount = difficultyQuestions.length;

    if(difficultyQuesCount < reqQuesForDifficulty){
      return res.status(400).json({"errMsg" : `Don't have enough ${difficulty} questions for this distribution.`});
    }
    const selectedQuestions = _.sampleSize(difficultyQuestions, reqQuesForDifficulty);
    questionPaper.push(...selectedQuestions);
  });

  if (questionPaper.length*5 !== totalMarks) {
  return res.status(400).json({"errMsg" : 'Failed to generate question paper. Check distribution percentages.'});
  }
  return res.status(201).json({questionPaper})
}
