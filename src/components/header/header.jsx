import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";

import { slideToggle } from "./../../composables/slideToggle.js";
import { injected } from "../../wallet/Connect";

function Header() {
  const { active, account, activate, deactivate } = useWeb3React();
  const [buttonValue, setButtonValue] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      if (!active) await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {/* <div className="menu-item dropdown">
          <a href="#/" onClick={toggleAppHeaderSearch} className="menu-link">
            <div className="menu-icon">
              <i className="bi bi-search nav-icon"></i>
            </div>
          </a>
        </div> */}
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
        {/* <div className="menu-item dropdown dropdown-mobile-full">
          <a
            href="#/"
            data-bs-toggle="dropdown"
            data-bs-display="static"
            className="menu-link"
          >
            <div className="menu-icon">
              <i className="bi bi-bell nav-icon"></i>
            </div>
            <div className="menu-badge bg-theme"></div>
          </a>
          <div className="dropdown-menu dropdown-menu-end mt-1 w-300px fs-11px pt-1">
            <h6 className="dropdown-header fs-10px mb-1">NOTIFICATIONS</h6>
            <div className="dropdown-divider mt-1"></div>
            {notificationData.length > 0 ? (
              notificationData.map((notification, index) => (
                <a
                  href="#/"
                  key={index}
                  className="d-flex align-items-center py-10px dropdown-item text-wrap fw-semibold"
                >
                  <div className="fs-20px">
                    <i className={notification.icon}></i>
                  </div>
                  <div className="flex-1 flex-wrap ps-3">
                    <div className="mb-1 text-inverse">
                      {notification.title}
                    </div>
                    <div className="small text-inverse text-opacity-50">
                      {notification.time}
                    </div>
                  </div>
                  <div className="ps-2 fs-16px">
                    <i className="bi bi-chevron-right"></i>
                  </div>
                </a>
              ))
            ) : (
              <div className="dropdown-notification-item p-3 text-center">
                No record found
              </div>
            )}
            <hr className="mb-0 mt-2" />
            <div className="py-10px mb-n2 text-center">
              <a href="#/" className="text-decoration-none fw-bold">
                SEE ALL
              </a>
            </div>
          </div>
        </div> */}
        {/* <div className="menu-item dropdown dropdown-mobile-full">
          <a
            href="#/"
            data-bs-toggle="dropdown"
            data-bs-display="static"
            className="menu-link"
          >
            <div className="menu-img online">
              <div className="d-flex align-items-center justify-content-center w-100 h-100 bg-inverse bg-opacity-25 text-inverse text-opacity-50 rounded-circle overflow-hidden">
                <i className="bi bi-person-fill fs-32px mb-n3"></i>
              </div>
            </div>
            <div className="menu-text d-sm-block d-none w-170px">
              username@account.com
            </div>
          </a>
          <div className="dropdown-menu dropdown-menu-end me-lg-3 fs-11px mt-1">
            <Link
              to="/profile"
              className="dropdown-item d-flex align-items-center"
            >
              PROFILE{" "}
              <i className="bi bi-person-circle ms-auto text-theme fs-16px my-n1"></i>
            </Link>
            <Link
              to="/email/inbox"
              className="dropdown-item d-flex align-items-center"
            >
              INBOX{" "}
              <i className="bi bi-envelope ms-auto text-theme fs-16px my-n1"></i>
            </Link>
            <Link
              to="/calendar"
              className="dropdown-item d-flex align-items-center"
            >
              CALENDAR{" "}
              <i className="bi bi-calendar ms-auto text-theme fs-16px my-n1"></i>
            </Link>
            <Link
              to="/settings"
              className="dropdown-item d-flex align-items-center"
            >
              SETTINGS{" "}
              <i className="bi bi-gear ms-auto text-theme fs-16px my-n1"></i>
            </Link>
            <div className="dropdown-divider"></div>
            <Link
              to="/pages/login"
              className="dropdown-item d-flex align-items-center"
            >
              LOGOUT{" "}
              <i className="bi bi-toggle-off ms-auto text-theme fs-16px my-n1"></i>
            </Link>
          </div>
        </div> */}
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
