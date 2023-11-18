import generateQuestionPaper  from './questionStore.js';
import { sampleQuestions } from './data.js';

const totalMarks = 100;
const distribution = { Easy: 0.2, Medium: 0.5, Hard: 0.3 };

try {
  const questionPaper = generateQuestionPaper(sampleQuestions, totalMarks, distribution);
  console.log('Generated Question Paper:', questionPaper);
} catch (error) {
  console.error('Error generating question paper:', error.message);
}
