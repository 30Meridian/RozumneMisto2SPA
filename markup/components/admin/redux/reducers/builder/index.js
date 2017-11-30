import { combineReducers } from 'redux';

import one from './step-one';
import two from './step-two';
import three from './step-three';
import four from './step-four';
import five from './step-five';
import workflow from './workflow';


const reducer = combineReducers({
  one,
  two,
  three,
  four,
  five,
  workflow,
});

export default reducer;
