import _ from 'lodash';

export const getQuestionsByDifficulty = (questions, difficulty) => {
  return _.filter(questions, { difficulty });
}
