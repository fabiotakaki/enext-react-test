import { FETCH_BREEDS } from '../actions/index';

export default function(state = [], action){
  switch(action.type){
    case FETCH_BREEDS:
      return action.payload;
  }
  return state;
}