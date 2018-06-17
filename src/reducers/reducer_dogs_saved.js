import { SAVE_DOG, DOGS_UPDATE } from '../actions/index';

export default function(state = [], action){
  switch(action.type){
    case SAVE_DOG:
      let data = [action.payload, ...state];
      localStorage.setItem('savedDogs', JSON.stringify(data));
      localStorage.setItem('savedDogsDateTime', Date.now());
      return data;
    case DOGS_UPDATE:
      return action.payload;
  }
  return state;
}