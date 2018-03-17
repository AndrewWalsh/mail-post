import uuidv4 from 'uuid/v4'; // Used to signify that a notification is unique, even if the message is the same

import { NOTIFICATION } from '../types';

const initialState = {
  id: uuidv4(),
  message: '',
};

export default function notification(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION:
      return { ...state, message: action.payload, id: uuidv4() };
    default:
      return state;
  }
}
