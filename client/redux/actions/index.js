import { Wallet } from "ethers";

import {
  LOG_IN,
  LOG_OUT,
  ADD_EMAIL,
  SET_DEFAULT_EMAIL,
  DELETE_EMAIL,
  ADD_PERMISSIONED_ACCOUNT,
  REVEAL_RECOVERY_PHRASE,
  SET_CONTRACT_ACCOUNT,
  ADD_EXTERNAL_ACCOUNT,
  SET_DEFAULT_EXTERNAL_ACCOUNT,
  REVEAL_EXTERNAL_ACCOUNT_ADDRESS,
  DELETE_EXTERNAL_ACCOUNT,
  REVEAL_CONTRACT_ADDRESS,
  GENERATING_MNEMONIC
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

const generatingMnemonic = bool => {
  return {
    type: GENERATING_MNEMONIC,
    payload: bool
  };
};

export const addPermissionedAccount = () => async (dispatch, getState) => {
  //dispatch(generatingMnemonic(true));
  let mnemonic = "";

  try {
    let response = await fetch("https://kenanoneal.com:8080/generateMnemonic", {
      mode: "no-cors",
      method: "POST",
      headers: {
        Accept: "application/json"
      }
    });
    const mnemonicObj = JSON.parse(response._bodyText);
    mnemonic = mnemonicObj.mnemonic;
  } catch (error) {
    console.error(error);
  }

  const account = await Wallet.fromMnemonic(mnemonic);

  const accountObj = {
    recoveryPhrase: account.mnemonic,
    address: account.address,
    balance: 0,
    linkedContract: "",
    default: false,
    revealedRecoveryPhrase: false
  };

  dispatch({
    type: ADD_PERMISSIONED_ACCOUNT,
    payload: [accountObj]
  });

  //dispatch(generatingMnemonic(false));
};

export const revealRecoveryPhrase = recoveryPhrase => {
  return {
    type: REVEAL_RECOVERY_PHRASE,
    payload: recoveryPhrase
  };
};

// action creators for contractAccountReducer
export const setContractAccount = () => async (dispatch, getState) => {
  let mnemonic = "";

  try {
    let response = await fetch("https://kenanoneal.com:8080/generateMnemonic", {
      mode: "no-cors",
      method: "POST",
      headers: {
        Accept: "application/json"
      }
    });
    const mnemonicObj = JSON.parse(response._bodyText);
    mnemonic = mnemonicObj.mnemonic;
  } catch (error) {
    console.error(error);
  }

  const account = await Wallet.fromMnemonic(mnemonic);

  const accountObj = {
    address: account.address,
    balance: 0,
    permissionedAddresses: ["0x123"],
    revealedAddress: false
  };

  dispatch({
    type: SET_CONTRACT_ACCOUNT,
    payload: accountObj
  });
};

export const revealContractAddress = account => {
  return {
    type: REVEAL_CONTRACT_ADDRESS,
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

export const revealExternalAccountAddress = accountName => {
  return {
    type: REVEAL_EXTERNAL_ACCOUNT_ADDRESS,
    payload: accountName
  };
};

export const deleteExternalAccount = accountName => {
  return {
    type: DELETE_EXTERNAL_ACCOUNT,
    payload: accountName
  };
};
