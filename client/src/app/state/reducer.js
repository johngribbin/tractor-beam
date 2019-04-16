import {
  UPDATING_CONTRACT_BALANCE,
  GENERATING_MNEMONIC,
  DISPLAYING_PSEUDO_CONTRACT_BALANCE
} from "./constants";

const initialState = {
  isGeneratingMnemonic: false,
  isUpdatingContractBalance: false,
  isDisplayingPseudoContractBalance: false
};

const appReducer = (state = initialState, action) => {
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

export default appReducer;
