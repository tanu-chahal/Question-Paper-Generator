import _ from 'lodash';
import {getQuestionsByDifficulty} from './utils.js';

export default function generateQuestionPaper(questions, totalMarks, distribution) {
  const questionPaper = [];

  _.forEach(distribution, (percentage, difficulty) => {
    const difficultyQuestions = getQuestionsByDifficulty(questions, difficulty);
    const marksForDifficulty = Math.ceil(totalMarks * percentage);
    const selectedQuestions = _.sampleSize(difficultyQuestions, (marksForDifficulty/5));
    questionPaper.push(...selectedQuestions);
  });

  if (questionPaper.length*5 !== totalMarks) {
    throw new Error('Failed to generate question paper. Check distribution percentages.');
  }

  return questionPaper;
}
