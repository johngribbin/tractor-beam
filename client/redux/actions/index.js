import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  SET_NATIVE_ADDRESS
} from "./types";

// action creators for counterReducer
export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNTER
  };
};

export const decrementCounter = () => {
  return {
    type: DECREMENT_COUNTER
  };
};

// action creators for nativeAddressReducer
export const setNativeAddress = address => {
  return {
    type: SET_NATIVE_ADDRESS,
    payload: address
  };
};
