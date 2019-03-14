import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  ADD_RECOVERY_PHRASE,
  SET_NATIVE_ACCOUNT,
  SET_CONTRACT_ACCOUNT,
  ADD_EXTERNAL_ACCOUNT,
  CHOOSE_DEFAULT_EXTERNAL_ACCOUNT,
  DELETE_EXTERNAL_ACCOUNT
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

// action creator for recoveryPhraseReducer - accepts an array of strings
export const addRecoveryPhrases = recoveryPhrases => {
  return {
    type: ADD_RECOVERY_PHRASE,
    payload: recoveryPhrases
  };
};

// action creators for nativeAccountReducer
export const setNativeAccount = account => {
  return {
    type: SET_NATIVE_ACCOUNT,
    payload: account
  };
};

// action creators for contractAccountReducer
export const setContractAccount = account => {
  return {
    type: SET_CONTRACT_ACCOUNT,
    payload: account
  };
};

// action creator for externalAccountsReducer
export const addExternalAccount = account => {
  return {
    type: ADD_EXTERNAL_ACCOUNT,
    payload: account
  };
};

export const chooseDefaultExternalAccount = accountName => {
  return {
    type: CHOOSE_DEFAULT_EXTERNAL_ACCOUNT,
    payload: accountName
  };
};

export const deleteExternalAccount = accountName => {
  return {
    type: DELETE_EXTERNAL_ACCOUNT,
    payload: accountName
  };
};
