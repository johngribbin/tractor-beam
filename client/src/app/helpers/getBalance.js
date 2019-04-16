import "ethers/dist/shims.js";
import { ethers } from "ethers";
let provider = ethers.getDefaultProvider("rinkeby");

export const getBalance = async address => {
  await provider.getBalance(address).then(bigNumber => {
    // balance is a BigNumber (in wei); format is as a string (in ether)
    return ethers.utils.formatEther(bigNumber);
  });
};
