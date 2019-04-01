import { combineReducers } from "redux";
import {
  LOG_IN,
  LOG_OUT,
  ADD_EMAIL,
  SET_DEFAULT_EMAIL,
  DELETE_EMAIL,
  ADD_PERMISSIONED_ACCOUNT,
  REVEAL_RECOVERY_PHRASE,
  ADD_EXTERNAL_ACCOUNT,
  SET_DEFAULT_EXTERNAL_ACCOUNT,
  REVEAL_EXTERNAL_ACCOUNT_ADDRESS,
  DELETE_EXTERNAL_ACCOUNT,
  SET_CONTRACT_ACCOUNT,
  REVEAL_CONTRACT_ADDRESS,
  GENERATING_MNEMONIC
} from "../actions/types";

const initialState = {
  // boolean
  isLoggedIn: false,
  // array of objects
  emailAddresses: [],
  // array of objects
  permissionedAccounts: [],
  // single object
  contractAccount: {},
  // array of objects
  externalAccounts: [],
  // boolean
  generatingMnemonic: false
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

const permissionedAccountsReducer = (
  state = initialState.permissionedAccounts,
  action
) => {
  switch (action.type) {
    case ADD_PERMISSIONED_ACCOUNT:
      return [...state, ...action.payload];

    case REVEAL_RECOVERY_PHRASE:
      return state.map(account => {
        if (account.recoveryPhrase === action.payload) {
          return {
            ...account,
            revealedRecoveryPhrase: !account.revealedRecoveryPhrase
          };
        } else
          return {
            ...account
          };
      });

    default:
      return state;
  }
};

// add generatingMnemonic reducer

const contractAccountReducer = (
  state = initialState.contractAccount,
  action
) => {
  switch (action.type) {
    case SET_CONTRACT_ACCOUNT:
      return (state = action.payload);

    case REVEAL_CONTRACT_ADDRESS:
      return {
        ...state,
        revealedAddress: !state.revealedAddress
      };

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

    case REVEAL_EXTERNAL_ACCOUNT_ADDRESS:
      return state.map(account => {
        if (account.name === action.payload) {
          return {
            ...account,
            revealedAddress: !account.revealedAddress
          };
        } else
          return {
            ...account
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
  permissionedAccounts: permissionedAccountsReducer,
  contractAccount: contractAccountReducer,
  externalAccounts: externalAccountsReducer
});
