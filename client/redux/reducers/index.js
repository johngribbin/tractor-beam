import { combineReducers } from "redux";
import {
  ADD_EMAIL,
  ADD_RECOVERY_PHRASE,
  SET_NATIVE_ACCOUNT,
  ADD_EXTERNAL_ACCOUNT,
  CHOOSE_DEFAULT_EXTERNAL_ACCOUNT,
  DELETE_EXTERNAL_ACCOUNT,
  SET_CONTRACT_ACCOUNT
} from "../actions/types";

const initialState = {
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

const emailAddressesReducer = (state = initialState.emailAddresses, action) => {
  switch (action.type) {
    case ADD_EMAIL:
      return [...state, ...action.payload];
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

    case CHOOSE_DEFAULT_EXTERNAL_ACCOUNT:
      return state.map(account => {
        if (account.name !== action.payload) {
          return {
            ...account,
            default: false
          };
        } else
          return {
            ...account,
            default: !account.default
          };
      });

    case DELETE_EXTERNAL_ACCOUNT:
      return state.filter(account => account.name !== action.payload);

    default:
      return state;
  }
};

export default combineReducers({
  emailAddresses: emailAddressesReducer,
  recoveryPhrases: recoveryPhrasesReducer,
  nativeAccount: nativeAccountReducer,
  contractAccount: contractAccountReducer,
  externalAccounts: externalAccountsReducer
});
