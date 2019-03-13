import { combineReducers } from "redux";
import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  SET_NATIVE_ADDRESS
} from "../actions/types";

const initialState = {
  count: 0,
  nativeAddress: "",
  email: ""
};

const counterReducer = (state = initialState.count, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
};

const nativeAddressReducer = (state = initialState.nativeAddress, action) => {
  switch (action.type) {
    case SET_NATIVE_ADDRESS:
      return (state = action.payload);
    default:
      return state;
  }
};

export default combineReducers({
  count: counterReducer,
  nativeAddress: nativeAddressReducer
});
