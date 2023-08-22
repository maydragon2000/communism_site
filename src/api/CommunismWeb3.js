import { communismContractInstance } from "../utils/ContractUtils";

import { burnedAddress } from "../data/index";

export const getNextClaimDate = async (active, account, library) => {
  console.log(active, "active");
  if (!active) return undefined;
  const date = await communismContractInstance(library)
    .methods.nextAvailableClaimDate(account)
    .call();
  return date;
};

export const getTotalETHClaimed = async (active, account, library) => {
  if (!active) return undefined;
  const value = await communismContractInstance(library)
    .methods.totalETHClaimed()
    .call();
  return value;
};

export const getBalance = async (active, account, library) => {
  if (!active) return undefined;
  const balance = await communismContractInstance(library)
    .methods.balanceOf(account)
    .call();
  return balance;
};

export const getPersonalClaimedETH = async (active, account, library) => {
  if (!active) return undefined;
  const value = await communismContractInstance(library)
    .methods._ethClaimedByAddress(account)
    .call();

  return value;
};

export const getETHToBeClaimed = async (active, account, library) => {
  if (!active) return undefined;
  const value = await communismContractInstance(library)
    .methods.calculateETHReward(account)
    .call();
  return value;
};

export const getBurnedBalance = async (active, account, library) => {
  if (!active) return undefined;
  const value = await communismContractInstance(library)
    .methods.balanceOf(burnedAddress)
    .call();
  console.log(value, "burned eth");
  return value;
};
