import { combineReducers } from 'redux';
import AuthenticationReducer from './authentication-reducer';
import TransitReducer from './transit-reducer';

export default combineReducers({
    auth: AuthenticationReducer,
    transit: TransitReducer
});
