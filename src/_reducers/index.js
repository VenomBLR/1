import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { reims } from './reims.reducer';
import { alert } from './alert.reducer';


const rootReducer = combineReducers({
  authentication,
  users,
  reims,
  alert
});

export default rootReducer;