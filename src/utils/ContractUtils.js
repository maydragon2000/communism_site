import { CommunismContractAddress } from "../data/index";

import { communismAbi } from "../data/abi/communismAbi";

export const communismContractInstance = (library) => {
  const communism = new library.eth.Contract(
    communismAbi,
    CommunismContractAddress
  );
  return communism;
};
