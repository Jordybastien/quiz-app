import { FETCH_QUIZES } from '../actions/actionTypes';

// TODO: Switch back to Initial State {}
export default function allQuizes(state = tempState, action) {
  switch (action.type) {
    case FETCH_QUIZES:
      return action.allQuizes;
    default:
      return state;
  }
}

const tempState = [
  {
    QId: 3,
    levelId: 4,
    type: 'multiChoices',
    question: 'test',
    answer: 'test',
    response: 'test',
    marks: 10,
    status: 1,
    dateCreated: '2020-09-02T20:00:23.000000Z',
    dateModified: '2020-09-02T20:00:23.000000Z',
  },
  {
    QId: 4,
    levelId: 4,
    type: 'multiChoices',
    question: 'test',
    answer: 'test',
    response: 'test',
    marks: 10,
    status: 1,
    dateCreated: '2020-09-02T20:00:25.000000Z',
    dateModified: '2020-09-02T20:00:25.000000Z',
  },
  {
    QId: 5,
    levelId: 4,
    type: 'multiChoices',
    question: 'test',
    answer: 'test',
    response: 'test',
    marks: 10,
    status: 1,
    dateCreated: '2020-09-02T20:00:26.000000Z',
    dateModified: '2020-09-02T20:00:26.000000Z',
  },
  {
    QId: 6,
    levelId: 4,
    type: 'multiChoices',
    question: 'test',
    answer: 'test',
    response: 'test',
    marks: 10,
    status: 1,
    dateCreated: '2020-09-02T20:00:29.000000Z',
    dateModified: '2020-09-02T20:00:29.000000Z',
  },
  {
    QId: 7,
    levelId: 4,
    type: 'multiChoices',
    question: 'test',
    answer: 'test',
    response: 'test',
    marks: 10,
    status: 1,
    dateCreated: '2020-09-02T20:00:30.000000Z',
    dateModified: '2020-09-02T20:00:30.000000Z',
  },
  {
    QId: 8,
    levelId: 4,
    type: 'multiChoices',
    question: 'test',
    answer: 'test',
    response: 'test',
    marks: 10,
    status: 1,
    dateCreated: '2020-09-04T16:54:20.000000Z',
    dateModified: '2020-09-04T16:54:20.000000Z',
  },
  {
    QId: 9,
    levelId: 4,
    type: 'multiChoices',
    question: 'test',
    answer: 'test',
    response: 'test',
    marks: 10,
    status: 1,
    dateCreated: '2020-09-04T16:54:32.000000Z',
    dateModified: '2020-09-04T16:54:32.000000Z',
  },
];
