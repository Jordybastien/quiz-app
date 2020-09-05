import { FETCH_STUDENTS } from '../actions/actionTypes';

// TODO: Switch back to Initial State {}
export default function students(state = tempState, action) {
  switch (action.type) {
    case FETCH_STUDENTS:
      return action.students;
    default:
      return state;
  }
}

const tempState = [
  {
    stdId: 8,
    stdFname: 'Axel',
    stdLname: 'SHEMA Romeo',
    age: 23,
    MSISDN: '0782980090',
    levelId: 4,
    status: 1,
    dateCreated: '2020-09-02T19:59:08.000000Z',
    dateModified: '2020-09-02T19:59:08.000000Z',
  },
  {
    stdId: 10,
    stdFname: 'Axel',
    stdLname: 'SHEMA Romeo',
    age: 23,
    MSISDN: '0782980091',
    levelId: 4,
    status: 1,
    dateCreated: '2020-09-04T07:04:47.000000Z',
    dateModified: '2020-09-04T07:04:47.000000Z',
  },
  {
    stdId: 12,
    stdFname: 'Rugumbira',
    stdLname: 'Jordy Bastien',
    age: 24,
    MSISDN: '+250785634779',
    levelId: 4,
    status: 1,
    dateCreated: '2020-09-04T07:12:18.000000Z',
    dateModified: '2020-09-04T07:12:18.000000Z',
  },
];
