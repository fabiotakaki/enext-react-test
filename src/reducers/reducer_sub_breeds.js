import { FETCH_SUB_BREEDS } from '../actions/index';

export default function(state = [], action){
  switch(action.type){
    case FETCH_SUB_BREEDS:
      return action.payload;
  }
  return state;
}