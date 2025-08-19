import { createStore, combineReducers } from 'redux';
import { userFlowReducer } from './userRole-slice/Reducer';
import { eventTypeReducer } from './event-type/Reducer';

const rootReducer = combineReducers({
  userFlow: userFlowReducer,
  eventType :eventTypeReducer,
});

const store = createStore(rootReducer);

export default store;
