import {
  CommunismContract,
  communismContractInstance,
} from "../utils/ContractUtils";

import { burnedAddress } from "../data/index";

import {
  IS_ETH_CLAIMED,
  Is_ETH_GAMBLE_CLAIMED,
  is_ETH_CLAIM_FAILED,
} from "../redux/constants";

export const getNextClaimDate = async (active, account, library) => {
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
    .methods.personalETHClaimed(account)
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
  return value;
};

export const claimETH = async (active, account, library, callback) => {
  if (!active) {
    callback(false);
    return;
  }
  try {
    await communismContractInstance(library)
      .methods.claimETHReward()
      .send({ from: account })
      .on("receipt", function (receipt) {
        callback(true);
      })
      .on("error", function (error) {
        callback(false);
      });
  } catch (err) {
    console.log(err);
    callback(false);
  }
};

export const claimGambleETH = async (active, account, library, callback) => {
  if (!active) {
    callback(false);
    return;
  }
  try {
    await communismContractInstance(library)
      .methods.claimETHRewardGamble()
      .send({ from: account })
      .on("receipt", function (receipt) {
        callback(true);
      })
      .on("error", function (error) {
        callback(false);
      });
  } catch (err) {
    console.log(err);
    callback(false);
  }
};

export const listenToClaimETHEvent = (active, account) => {
  console.log(account, "account");
  return (dispatch) => {
    if (!active) return;
    CommunismContract.events
      .ClaimETHSuccessfully()
      .on("data", (event) => {
        console.log("eth claimed successfully", event);
        if (event.returnValues.recipient === account)
          dispatch({
            type: IS_ETH_CLAIMED,
            payload: {
              status: true,
              amount: event.returnValues.ethReceived,
            },
          });
      })
      .on("error", (error) => {
        console.log("ETH Claim Error", error);
      });
  };
};

export const listenToClaimGambleETHEvent = (active, account) => {
  return (dispatch) => {
    if (!active) return;
    CommunismContract.events
      .ClaimETHGambleSuccessfully()
      .on("data", (event) => {
        console.log("eth claimed successfully", event);
        if (event.returnValues.recipient === account)
          if (
            parseFloat(event.returnValues.ethReceived) > 0 &&
            event.returnValues.isLotteryWon === true
          ) {
            dispatch({
              type: Is_ETH_GAMBLE_CLAIMED,
              payload: {
                status: true,
                amount: event.returnValues.ethReceived,
              },
            });
          } else {
            dispatch({
              type: is_ETH_CLAIM_FAILED,
              payload: true,
            });
          }
      })
      .on("error", (error) => {
        console.log("ETH Claim Error", error);
      });
  };
};
