import {
  LOG_IN,
  LOG_OUT,
  ADD_EMAIL,
  SET_DEFAULT_EMAIL,
  DELETE_EMAIL,
  ADD_RECOVERY_PHRASE,
  SET_NATIVE_ACCOUNT,
  SET_CONTRACT_ACCOUNT,
  ADD_EXTERNAL_ACCOUNT,
  SET_DEFAULT_EXTERNAL_ACCOUNT,
  DELETE_EXTERNAL_ACCOUNT
} from "./types";

// action creators for isLoggedInReducer
export const logIn = () => {
  return {
    type: LOG_IN
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT
  };
};

// action creator for emailAddressesReducer
export const addEmail = email => {
  return {
    type: ADD_EMAIL,
    payload: email
  };
};

export const setDefaultEmail = emailAddress => {
  return {
    type: SET_DEFAULT_EMAIL,
    payload: emailAddress
  };
};

export const deleteEmail = emailAddress => {
  return {
    type: DELETE_EMAIL,
    payload: emailAddress
  };
};

// action creator for recoveryPhraseReducer
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

export const setDefaultExternalAccount = accountName => {
  return {
    type: SET_DEFAULT_EXTERNAL_ACCOUNT,
    payload: accountName
  };
};

export const deleteExternalAccount = accountName => {
  return {
    type: DELETE_EXTERNAL_ACCOUNT,
    payload: accountName
  };
};
