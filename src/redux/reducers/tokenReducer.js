import {
  NEXT_CLAIM_DATE,
  TOTAL_ETH_CLAIMED,
  WALLET_BALANCE,
  PERSONAL_CLAIMED_ETH,
  ETH_TO_BE_CLAIMED,
  BURNED_BALANCE,
  IS_ETH_CLAIMED,
  Is_ETH_GAMBLE_CLAIMED,
  is_ETH_CLAIM_FAILED,
} from "../constants";

const initialState = {
  nextAvailableDate: 0,
  totalETHClaimed: 0,
  balance: 0,
  personalClaimedETH: 0,
  ethToBeClaimed: 0,
  burnedBalance: 0,
  isETHClaimed: false,
  isETHClaimFailed: false,
  ethReceivedAmount: 0,
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_CLAIM_DATE: {
      return {
        ...state,
        nextAvailableDate: action.payload,
      };
    }
    case TOTAL_ETH_CLAIMED: {
      return {
        ...state,
        totalETHClaimed: action.payload,
      };
    }
    case WALLET_BALANCE: {
      return {
        ...state,
        balance: action.payload,
      };
    }
    case PERSONAL_CLAIMED_ETH: {
      return {
        ...state,
        personalClaimedETH: action.payload,
      };
    }
    case ETH_TO_BE_CLAIMED: {
      return {
        ...state,
        ethToBeClaimed: action.payload,
      };
    }
    case BURNED_BALANCE: {
      return {
        ...state,
        burnedBalance: action.payload,
      };
    }
    case IS_ETH_CLAIMED: {
      return {
        ...state,
        isETHClaimed: action.payload.status,
        ethReceivedAmount: action.payload.amount,
      };
    }
    case Is_ETH_GAMBLE_CLAIMED: {
      return {
        ...state,
        isETHClaimed: action.payload.status,
        ethReceivedAmount: action.payload.amount,
      };
    }
    case is_ETH_CLAIM_FAILED: {
      return {
        ...state,
        isETHClaimFailed: action.payload,
        ethReceivedAmount: 0,
      };
    }
    default:
      return state;
  }
};

export default tokenReducer;
