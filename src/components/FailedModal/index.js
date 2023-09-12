import React, { useEffect } from "react";
import { default as MUIDialog } from "@mui/material/Dialog";
import { useSelector, useDispatch } from "react-redux";
import { is_ETH_CLAIM_FAILED } from "../../redux/constants";
import useSound from "use-sound";

import FailedSound from "../../assets/sound/failed.wav";

const FailedModal = () => {
  const [playSound] = useSound(FailedSound);
  const { isETHClaimFailed, ethReceivedAmount } = useSelector(
    (state) => state.tokens
  );
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch({
      type: is_ETH_CLAIM_FAILED,
      payload: false,
    });
  };
  useEffect(() => {
    if (isETHClaimFailed) playSound();
  }, [isETHClaimFailed]);
  return (
    <MUIDialog
      open={isETHClaimFailed}
      onClose={onClose}
      className="failed_modal"
    >
      <div className="content">
        <p>Your claim was unsuccessful comrade</p>
        <p>you receive 0 ETH</p>
      </div>
    </MUIDialog>
  );
};

export default FailedModal;
