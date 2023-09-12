import Web3 from "web3";

import { CommunismContractAddress } from "../data/index";

import { communismAbi } from "../data/abi/communismAbi";

export const communismContractInstance = (library) => {
  const communism = new library.eth.Contract(
    communismAbi,
    CommunismContractAddress
  );
  return communism;
};

const web3ETH = new Web3(
  "wss://goerli.infura.io/ws/v3/8317eb6afdaf43bea9e28449fd9183ef"
);

export const CommunismContract = new web3ETH.eth.Contract(
  communismAbi,
  CommunismContractAddress
);
