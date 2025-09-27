import { legacy_createStore as createStore} from 'redux';
import { hazariCalculatorAppReducer } from './reducer';

const store = createStore(hazariCalculatorAppReducer);

export default store;