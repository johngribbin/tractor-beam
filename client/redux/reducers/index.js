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
  GENERATING_MNEMONIC,
  UPDATING_CONTRACT_BALANCE,
  UPDATE_CONTRACT_BALANCE,
  DISPLAYING_PSEUDO_CONTRACT_BALANCE,
  DISPLAY_PSEUDO_CONTRACT_BALANCE
} from "../actions/types";

const initialState = {
  app: {
    isGeneratingMnemonic: false,
    isUpdatingContractBalance: false,
    isDisplayingPseudoContractBalance: false
  },
  user: {
    isLoggedIn: false,
    // array of objects
    emailAddresses: []
  },
  // array of objects
  permissionedAccounts: [],
  // single object
  contractAccount: {},
  // array of objects
  externalAccounts: []
};

const appReducer = (state = initialState.app, action) => {
  switch (action.type) {
    case GENERATING_MNEMONIC:
      return {
        ...state,
        isGeneratingMnemonic: action.payload
      };

    case UPDATING_CONTRACT_BALANCE:
      return {
        ...state,
        isUpdatingContractBalance: action.payload
      };

    case DISPLAYING_PSEUDO_CONTRACT_BALANCE:
      return {
        ...state,
        isDisplayingPseudoContractBalance: action.payload
      };
    default:
      return state;
  }
};

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: action.payload
      };

    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: action.payload
      };

    case ADD_EMAIL:
      return {
        ...state,
        emailAddresses: [...state.emailAddresses, ...action.payload]
      };

    case SET_DEFAULT_EMAIL:
      return {
        ...state,
        emailAddresses: state.emailAddresses.map(emailObj =>
          emailObj.address === action.payload
            ? { ...emailObj, default: true }
            : { ...emailObj, default: false }
        )
      };

    case DELETE_EMAIL:
      return {
        ...state,
        emailAddresses: state.emailAddresses.filter(
          email => email.address !== action.payload
        )
      };

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

    case DISPLAY_PSEUDO_CONTRACT_BALANCE:
      return {
        ...state,
        balance: action.payload
      };

    case UPDATE_CONTRACT_BALANCE:
      return {
        ...state,
        balance: action.payload
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
  app: appReducer,
  user: userReducer,
  permissionedAccounts: permissionedAccountsReducer,
  contractAccount: contractAccountReducer,
  externalAccounts: externalAccountsReducer
});
