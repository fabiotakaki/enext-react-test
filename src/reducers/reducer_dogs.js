import { FETCH_DOGS } from '../actions/index';

export default function(state = [], action){
  switch(action.type){
    case FETCH_DOGS:
      return action.payload;
  }
  return state;
}