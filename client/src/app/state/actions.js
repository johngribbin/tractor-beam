import {
  UPDATING_CONTRACT_BALANCE,
  GENERATING_MNEMONIC,
  DISPLAYING_PSEUDO_CONTRACT_BALANCE
} from "./constants";

/* -------------------- 
action creators for appReducer
-------------------- */
export const generatingMnemonic = bool => {
  return {
    type: GENERATING_MNEMONIC,
    payload: bool
  };
};

export const updatingContractBalance = bool => {
  return {
    type: UPDATING_CONTRACT_BALANCE,
    payload: bool
  };
};

export const displayingPseudoContractBalance = bool => {
  return {
    type: DISPLAYING_PSEUDO_CONTRACT_BALANCE,
    payload: bool
  };
};
