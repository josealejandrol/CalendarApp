import moment from 'moment';
import { types } from '../types/types';

const initialState = {
  events: [{
    title: 'Cumpleaños de José',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgColor: '#fafafa',
    notes: 'Comprar pastel de cumpleaños',
    user: {
      _uid: '123',
      name: 'Alejandro'
    }
  }],
  active: null
};

export const calendarReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        active: action.payload 
      }

    default:
      return state;
  }
}