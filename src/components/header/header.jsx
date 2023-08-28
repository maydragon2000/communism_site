import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";

import { slideToggle } from "./../../composables/slideToggle.js";
import { injected } from "../../wallet/Connect";
import { BURNED_BALANCE, ETH_TO_BE_CLAIMED, NEXT_CLAIM_DATE, PERSONAL_CLAIMED_ETH, TOTAL_ETH_CLAIMED, WALLET_BALANCE } from "../../redux/constants/index.js";
import { getBalance, getBurnedBalance, getETHToBeClaimed, getNextClaimDate, getPersonalClaimedETH, getTotalETHClaimed } from "../../api/CommunismWeb3.js";

function Header({ appSidebarCollapsed, setAppSidebarCollapsed }) {
  const { active, account,library, activate, deactivate } = useWeb3React();
  const [buttonValue, setButtonValue] = useState("");

  const dispatch = useDispatch();

  const checkIfWalletIsConnected = async () => {
    try {
      if (!active) await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  };

  const getDefaultValue = async () => {
    const claimDate = await getNextClaimDate(active, account, library);
    const toTalETHClaimed = await getTotalETHClaimed(active, account, library);
    const balance = await getBalance(active, account, library);
    const personalClaimedETH = await getPersonalClaimedETH(active, account, library);
    const ethToBeClaimed = await getETHToBeClaimed(active, account, library);
    const burnedBalance = await getBurnedBalance(active, account, library);
    dispatch({type: NEXT_CLAIM_DATE, payload: claimDate});
    dispatch({type: TOTAL_ETH_CLAIMED, payload: toTalETHClaimed});
    dispatch({type: WALLET_BALANCE, payload: balance});
    dispatch({type: PERSONAL_CLAIMED_ETH, payload: personalClaimedETH});
    dispatch({type: ETH_TO_BE_CLAIMED, payload: ethToBeClaimed});
    dispatch({type: BURNED_BALANCE, payload: burnedBalance})
  }

  useEffect(() => {
    // checkIfWalletIsConnected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getDefaultValue();
  }, []);

  useEffect(() => {
    if (active) {
      let firstPart = account?.slice(0, 6);
      let endPart = account?.slice(account.length - 4);
      setButtonValue(firstPart + "..." + endPart);
    } else {
      setButtonValue("Connect Wallet");
    }
  }, [active, account]);

  useEffect(() => {
    getDefaultValue();
  },[active])

  const onClickConnect = async () => {
    try {
      if (!active) await activate(injected);
      else deactivate();
    } catch (ex) {
      console.log(ex);
    }
  };

  const notificationData = [];

  const toggleAppSidebarDesktop = () => {
    var elm = document.querySelector(".app");
    if (elm) {
      if (
        !(
          elm.classList.contains("app-with-top-nav") &&
          elm.classList.contains("app-without-sidebar")
        )
      ) {
        setAppSidebarCollapsed(!appSidebarCollapsed)
        elm.classList.toggle("app-sidebar-collapsed");
      }
    }
  };

  const toggleAppSidebarMobile = () => {
    var elm = document.querySelector(".app");
    if (elm) {
      if (
        !(
          elm.classList.contains("app-with-top-nav") &&
          elm.classList.contains("app-without-sidebar")
        )
      ) {
        elm.classList.toggle("app-sidebar-mobile-toggled");
      } else {
        slideToggle(document.querySelector(".app-top-nav"));
      }
    }
  };

  const toggleAppHeaderSearch = () => {
    var elm = document.querySelector(".app");
    elm.classList.toggle("app-header-menu-search-toggled");
  };

  return (
    <div id="header" className="app-header">
      <div className="desktop-toggler">
        <button
          type="button"
          className="menu-toggler"
          onClick={toggleAppSidebarDesktop}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      <div className="mobile-toggler">
        <button
          type="button"
          className="menu-toggler"
          onClick={toggleAppSidebarMobile}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      <div className="brand">
        <Link to="/" className="brand-logo">
          <span className="brand-img">
            <span className="brand-img-text text-theme">C</span>
          </span>
          <span className="brand-text">COMMUNISM</span>
        </Link>
      </div>

      <div className="menu">
        <div className="menu-item dropdown dropdown-mobile-full">
          <a
            href="#/"
            data-bs-toggle="dropdown"
            data-bs-display="static"
            className="menu-link"
          >
            <div className="menu-icon">
              <i className="bi bi-grid-3x3-gap nav-icon"></i>
            </div>
          </a>
          <div className="dropdown-menu fade dropdown-menu-end w-300px text-center p-0 mt-1">
            <div className="row row-grid gx-0">
              <div className="col-4">
                <a
                  href="https://twitter.com/purecommunism"
                  className="dropdown-item text-decoration-none p-3 bg-none"
                >
                  <div className="position-relative">
                    <i className="bi bi-twitter h2 opacity-5 d-block my-1"></i>
                  </div>
                  <div className="fw-500 fs-10px text-inverse">TWITTER</div>
                </a>
              </div>
              <div className="col-4">
                <a
                  href="https://t.me/portaltocommunism"
                  className="dropdown-item text-decoration-none p-3 bg-none"
                >
                  <div>
                    <i className="bi bi-telegram h2 opacity-5 d-block my-1"></i>
                  </div>
                  <div className="fw-500 fs-10px text-inverse">TELEGRAM</div>
                </a>
              </div>
              <div className="col-4">
                <Link
                  to="/calendar"
                  className="dropdown-item text-decoration-none p-3 bg-none"
                >
                  <div>
                    <i className="fa fa-chart-line h2 opacity-5 d-block my-1"></i>
                  </div>
                  <div className="fw-500 fs-10px text-inverse">DEXTOOLS</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 pt-0 pb-0 pl-0">
          <a
            href="#/"
            onClick={onClickConnect}
            className="btn btn-outline-theme btn-lg active"
          >
            {buttonValue}
          </a>
        </div>
      </div>

      <form className="menu-search" method="POST" name="header_search_form">
        <div className="menu-search-container">
          <div className="menu-search-icon">
            <i className="bi bi-search"></i>
          </div>
          <div className="menu-search-input">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search menu..."
            />
          </div>
          <div className="menu-search-icon">
            <a href="#/" onClick={toggleAppHeaderSearch}>
              <i className="bi bi-x-lg"></i>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Header;
