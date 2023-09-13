import React, { useEffect } from "react";
import { default as MUIDialog } from "@mui/material/Dialog";
import { useSelector, useDispatch } from "react-redux";
import { IS_ETH_CLAIMED } from "../../redux/constants";
import useSound from "use-sound";

import SuccessGif from "../../assets/success.gif";
import SuccessSound from "../../assets/sound/success.mp3";

const SuccessModal = () => {
  const [playSound] = useSound(SuccessSound);
  const { isETHClaimed, ethReceivedAmount } = useSelector(
    (state) => state.tokens
  );
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch({
      type: IS_ETH_CLAIMED,
      payload: {
        status: false,
        amount: 0,
      },
    });
  };
  useEffect(() => {
    if (isETHClaimed) playSound();
  }, [isETHClaimed]);
  return (
    <MUIDialog open={isETHClaimed} onClose={onClose} className="success_modal">
      <div className="content">
        <img src={SuccessGif} alt="success gif" loop={1} />
        <p>Congratulations comrade</p>
        <p> you have claimed {ethReceivedAmount} ETH</p>
      </div>
    </MUIDialog>
  );
};

export default SuccessModal;
