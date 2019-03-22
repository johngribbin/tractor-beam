import { combineReducers } from "redux";
import {
  LOG_IN,
  LOG_OUT,
  ADD_EMAIL,
  SET_DEFAULT_EMAIL,
  DELETE_EMAIL,
  ADD_RECOVERY_PHRASE,
  SET_NATIVE_ACCOUNT,
  ADD_EXTERNAL_ACCOUNT,
  SET_DEFAULT_EXTERNAL_ACCOUNT,
  DELETE_EXTERNAL_ACCOUNT,
  SET_CONTRACT_ACCOUNT
} from "../actions/types";

const initialState = {
  isLoggedIn: false,
  // array of objects
  emailAddresses: [],
  // array of strings
  recoveryPhrases: [],
  // array of objects
  nativeAccount: {},
  // object
  contractAccount: {},
  // array of objects
  externalAccounts: []
};

const isLoggedInReducer = (state = initialState.isLoggedIn, action) => {
  switch (action.type) {
    case LOG_IN:
      return (state = true);
    case LOG_OUT:
      return (state = false);
    default:
      return state;
  }
};

const emailsReducer = (state = initialState.emailAddresses, action) => {
  switch (action.type) {
    case ADD_EMAIL:
      return [...state, ...action.payload];

    case SET_DEFAULT_EMAIL:
      return state.map(email => {
        if (email.address !== action.payload) {
          return {
            ...email,
            default: false
          };
        } else
          return {
            ...email,
            default: true
          };
      });

    case DELETE_EMAIL:
      return state.filter(email => email.address !== action.payload);

    default:
      return state;
  }
};

const recoveryPhrasesReducer = (
  state = initialState.recoveryPhrases,
  action
) => {
  switch (action.type) {
    case ADD_RECOVERY_PHRASE:
      return [...state, ...action.payload];

    default:
      return state;
  }
};

const nativeAccountReducer = (state = initialState.nativeAccount, action) => {
  switch (action.type) {
    case SET_NATIVE_ACCOUNT:
      return (state = action.payload);

    default:
      return state;
  }
};

const contractAccountReducer = (
  state = initialState.contractAccount,
  action
) => {
  switch (action.type) {
    case SET_CONTRACT_ACCOUNT:
      return (state = action.payload);

    default:
      return state;
  }
};

const externalAccountsReducer = (
  state = initialState.externalAccounts,
  action
) => {
  switch (action.type) {
    case ADD_EXTERNAL_ACCOUNT:
      return [...state, ...action.payload];

    case SET_DEFAULT_EXTERNAL_ACCOUNT:
      return state.map(account => {
        if (account.name !== action.payload) {
          return {
            ...account,
            default: false
          };
        } else
          return {
            ...account,
            default: true
          };
      });

    case DELETE_EXTERNAL_ACCOUNT:
      return state.filter(account => account.name !== action.payload);

    default:
      return state;
  }
};

export default combineReducers({
  isLoggedIn: isLoggedInReducer,
  emails: emailsReducer,
  recoveryPhrases: recoveryPhrasesReducer,
  nativeAccount: nativeAccountReducer,
  contractAccount: contractAccountReducer,
  externalAccounts: externalAccountsReducer
});
