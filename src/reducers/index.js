import { combineReducers } from 'redux';
import BreedsReducer from './reducer_breeds';
import SubBreedsReducer from './reducer_sub_breeds';
import DogsReducer from './reducer_dogs';
import DogsSavedReducer from './reducer_dogs_saved';

const rootReducer = combineReducers({
  breeds: BreedsReducer,
  sub_breeds: SubBreedsReducer,
  dogs: DogsReducer,
  dogs_saved: DogsSavedReducer
});

export default rootReducer;
