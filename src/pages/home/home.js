import React, { useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world.js";
import "jsvectormap/dist/css/jsvectormap.min.css";
import { useWeb3React } from "@web3-react/core";
import { useSelector, useDispatch } from "react-redux";
import { Oval } from "react-loader-spinner";
import { claimETH, claimGambleETH } from "../../api/CommunismWeb3.js";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  Card,
  CardBody,
  CardExpandToggler,
} from "./../../components/card/card.jsx";

import LoloVideo from "../../assets/lolol2.mp4";

function Home() {
  const {
    nextAvailableDate,
    totalETHClaimed,
    balance,
    personalClaimedETH,
    ethToBeClaimed,
    burnedBalance,
  } = useSelector((state) => state.tokens);
  const dispatch = useDispatch();
  const { active, account, library } = useWeb3React();

  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalVolume, setTotalVolume] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isETHClaimLoading, setIsETHClaimLoading] = useState(false);
  const [isETHGambleClaimLoading, setIsETHGambleClaimLoading] = useState(false);
  const [totalHolders, setTotalHolders] = useState(0);
  const [biggestBuys, setBiggestBuys] = useState([]);
  const [biggestClaims, setBiggestClaims] = useState([]);

  const countdownRef = useRef(null);
  function renderMap() {
    var theme = getComputedStyle(document.body)
      .getPropertyValue("--bs-theme")
      .trim();
    var inverse = getComputedStyle(document.body)
      .getPropertyValue("--bs-inverse")
      .trim();
    var inverseRgb = getComputedStyle(document.body)
      .getPropertyValue("--bs-inverse-rgb")
      .trim();
    var bodyFontFamily = getComputedStyle(document.body)
      .getPropertyValue("--bs-body-font-family")
      .trim();
    const map = document.getElementById("jvectorMap");
    const mapElm = document.querySelectorAll(".jvm-tooltip");

    if (map) {
      for (let i = 0; i < mapElm.length; i++) {
        mapElm[i].remove();
      }
      map.innerHTML = "";

      var markers = [
        { name: "Egypt", coords: [26.8206, 30.8025] },
        { name: "Russia", coords: [61.524, 105.3188] },
        // { name: "Canada", coords: [56.1304, -106.3468] },
        { name: "United States", coords: [37.0902, -95.7129] },
        { name: "Greenland", coords: [71.7069, -42.6043] },
        { name: "Brazil", coords: [-14.235, -51.9253] },
      ];
      new jsVectorMap({
        selector: "#jvectorMap",
        map: "world",
        zoomButtons: true,
        normalizeFunction: "polynomial",
        hoverOpacity: 0.5,
        hoverColor: false,
        zoomOnScroll: false,
        selectedRegions: ["LA", "RU", "CN", "KP"],
        // regionsSelectable: true,
        series: {
          regions: [
            {
              normalizeFunction: "polynomial",
            },
          ],
        },
        labels: {
          markers: {
            render: (marker) => marker.name,
          },
        },
        focusOn: {
          x: 0.5,
          y: 0.5,
          scale: 1,
        },
        markers: markers,
        markerStyle: {
          initial: {
            fill: theme,
            stroke: "none",
            r: 5,
          },
          hover: {
            fill: theme,
          },
        },
        markerLabelStyle: {
          initial: {
            fontFamily: bodyFontFamily,
            fontSize: "12px",
            fill: "rgba(" + inverseRgb + ", .75)",
          },
        },
        regionStyle: {
          initial: {
            fill: inverse,
            fillOpacity: 0.15,
            stroke: "none",
            strokeWidth: 0.4,
            strokeOpacity: 1,
          },
          hover: {
            fillOpacity: 0.5,
          },
          selected: {
            fill: "red",
            fillOpacity: 0.5,
          },
          selectedHover: {
            fillOpacity: 1,
          },
        },
        backgroundColor: "transparent",
      });
    }
  }

  const handleVideoLoaded = () => {
    setVideoLoaded(false);
  };

  const getTotalTransactions = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-API-KEY", "BQYWk4roYCgJJdkq6Ului01dWlHJ5P9z");

    var raw = JSON.stringify({
      query:
        'query MyQuery {\n  ethereum(network: ethereum){\n    smartContractEvents(smartContractAddress: {is: "0xD3FD49a874124ba9cE7aBF73d1cb3fFe92aCCb72"}\n    smartContractEvent: {is: "Transfer"}\n    )\n    {\n      count\n    }\n  }\n}\n',
      variables: "{}",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("https://graphql.bitquery.io", requestOptions)
      .then(async (res) => {
        const { data } = await res.json();
        console.log(data, "data");
        setTotalTransactions(data.ethereum?.smartContractEvents[0].count);
      })
      .catch((error) => console.log("error", error));
  };

  const getTotalHolders = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-API-KEY", "BQYWk4roYCgJJdkq6Ului01dWlHJ5P9z");

    var raw = JSON.stringify({
      query:
        'query MyQuery {\n  EVM(network: eth, dataset: combined) {\n    BalanceUpdates(\n      where: {Currency: {SmartContract: {is: "0xD3FD49a874124ba9cE7aBF73d1cb3fFe92aCCb72"}}}\n    ){\n      No_Holders: count(distinct: BalanceUpdate_Address)\n    }\n  }\n}\n',
      variables: "{}",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://streaming.bitquery.io/graphql", requestOptions).then(
      async (res) => {
        const { data } = await res.json();
        // console.log(data, "result total holder");
        setTotalHolders(data.EVM.BalanceUpdates[0].No_Holders);
      }
    );
  };

  const getTotalVolume = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-API-KEY", "BQYWk4roYCgJJdkq6Ului01dWlHJ5P9z");

    var raw = JSON.stringify({
      query:
        'query MyQuery {\n  ethereum(network: ethereum){\n    dexTrades(\n      baseCurrency: {is: "0xD3FD49a874124ba9cE7aBF73d1cb3fFe92aCCb72"}\n    )\n    {\n      quoteAmount(in: ETH)\n    }\n  }\n}\n',
      variables: "{}",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://graphql.bitquery.io", requestOptions)
      .then(async (res) => {
        const { data } = await res.json();
        console.log(data, "data");
        setTotalVolume(data.ethereum?.dexTrades[0].quoteAmount);
      })
      .catch((error) => console.log("error", error));
  };

  const getBiggestBuys = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-API-KEY", "BQYWk4roYCgJJdkq6Ului01dWlHJ5P9z");

    var raw = JSON.stringify({
      query:
        'query MyQuery {\n  ethereum(network: ethereum){\n    dexTrades(\n      baseCurrency: {is: "0xD3FD49a874124ba9cE7aBF73d1cb3fFe92aCCb72"}\n      buyCurrency: {is: "0xD3FD49a874124ba9cE7aBF73d1cb3fFe92aCCb72"}\n      options: {desc: ["tradeAmount"], limit: 5}\n    )\n    {\n      transaction{hash}\n      tradeAmount(in: USD)\n      buyAmount\n    }\n  }\n}\n',
      variables: "{}",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://graphql.bitquery.io", requestOptions)
      .then(async (res) => {
        const { data } = await res.json();
        // console.log(data, " biggest buy data");
        setBiggestBuys(data.ethereum.dexTrades);
      })
      .catch((error) => console.log("error", error));
  };

  const getBiggestClaims = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-API-KEY", "BQYWk4roYCgJJdkq6Ului01dWlHJ5P9z");

    var raw = JSON.stringify({
      query:
        'query MyQuery {\n  ethereum(network: ethereum){\n    arguments(\n      options: {desc: ["value.value"], limit: 5}\n      smartContractAddress: {in: "0xD3FD49a874124ba9cE7aBF73d1cb3fFe92aCCb72"}\n      smartContractEvent: {is: "ClaimETHSuccessfully"}\n      argument: {is: "ethReceived"}\n    )\n    {\n      block {\n        height\n      }\n      argument{\n        name\n      }\n      value{\n        value\n      }\n      transaction{\n        hash\n      }\n    }\n  }\n}\n',
      variables: "{}",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://graphql.bitquery.io", requestOptions)
      .then(async (res) => {
        const { data } = await res.json();
        console.log(data, " biggest claim data");
        setBiggestClaims(data.ethereum.arguments);
        // setBiggestBuys(data.ethereum.dexTrades);
      })
      .catch((error) => console.log("error", error));
  };

  const onClickClaimETH = async () => {
    if (!active) {
      toast.error("Please connet Wallet!", {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
      return;
    }
    setIsETHClaimLoading(true);
    await claimETH(active, account, library, (status) => {
      setIsETHClaimLoading(false);
    });
  };

  const onClickClaimGambleETH = async () => {
    if (!active) {
      toast.error("Please connet Wallet!", {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
      return;
    }
    setIsETHGambleClaimLoading(true);
    await claimGambleETH(active, account, library, (status) => {
      setIsETHGambleClaimLoading(false);
    });
  };

  const openUniswap = () => {
    window.open(
      "https://app.uniswap.org/#/swap?outputCurrency=0xD3FD49a874124ba9cE7aBF73d1cb3fFe92aCCb72"
    );
  };

  useEffect(() => {
    renderMap();
    document.addEventListener("theme-reload", () => {
      renderMap();
    });
    getTotalTransactions();
    getTotalHolders();
    getTotalVolume();
    getBiggestClaims();
    getBiggestBuys();
  }, []);

  useEffect(() => {
    if (countdownRef.current) {
      countdownRef.current.start();
    }
  }, [nextAvailableDate]);

  return (
    <div className="home">
      <ul className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#/">HOME</a>
        </li>
        <li className="breadcrumb-item active">DASHBOARD</li>
      </ul>

      <h1 className="page-header header">Communism</h1>
      <ToastContainer
        limit={3}
        autoClose={5000}
        hideProgressBar={true}
        theme="colored"
      />
      <Countdown
        date={
          nextAvailableDate ? parseInt(nextAvailableDate) * 1000 : Date.now()
        }
        ref={countdownRef}
        renderer={(props) => (
          <div>
            <Card>
              <CardBody>
                <div className="d-flex fw-bold small mb-3 justify-content-end">
                  <CardExpandToggler />
                </div>
                <div className="row mb-2 d-flex flex-wrap top_info">
                  <div className="col-xl-3 col-lg-6 coming-soon-timer text-center">
                    <span>Next Claim Available</span>
                    <div className="is-countdown">
                      <div className="countdown-row countdown-show4">
                        <div className="countdown-section">
                          <div className="countdown-amount">
                            {props.days * 24 + props.hours}
                          </div>
                          <div className="countdown-period">Hours</div>
                        </div>
                        <div className="countdown-section">
                          <div className="countdown-amount">
                            {props.minutes}
                          </div>
                          <div className="countdown-period">Minutes</div>
                        </div>
                        <div className="countdown-section">
                          <div className="countdown-amount">
                            {props.seconds}
                          </div>
                          <div className="countdown-period">Seconds</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 total_info">
                    <p>Holders</p>
                    <label>{totalHolders}</label>
                  </div>
                  <div className="col-xl-3 col-lg-6 total_info">
                    <p>Transactions</p>
                    <label>{totalTransactions}</label>
                  </div>
                  <div className="col-xl-3 col-lg-6 total_info">
                    <p>Total Volume</p>
                    <label>{totalVolume} ETH</label>
                  </div>
                </div>
              </CardBody>
            </Card>
            <div className="claim_buttons mt-4">
              <Card>
                <CardBody>
                  <div className="d-flex fw-bold small mb-3 justify-content-end">
                    <span className="flex-grow-1">Claim ETH</span>
                    <CardExpandToggler />
                  </div>
                  <div className="main">
                    <p>
                      Comrades, you may select this option if you wish to
                      receive your allocated rations this amount is visible at
                      the bottom of the screen in the “Eth to be claimed”
                      section
                    </p>
                    <button
                      disabled={
                        props.days +
                          props.hours +
                          props.minutes +
                          props.seconds !==
                        0
                          ? true
                          : isETHClaimLoading || isETHGambleClaimLoading
                          ? true
                          : false
                      }
                      onClick={onClickClaimETH}
                    >
                      {isETHClaimLoading ? (
                        <CircularProgress className="circle" />
                      ) : (
                        "Claim ETH"
                      )}
                    </button>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <div className="d-flex fw-bold small mb-3 justify-content-end">
                    <span className="flex-grow-1">Claim Gamble ETH</span>
                    <CardExpandToggler />
                  </div>
                  <div className="main">
                    <p>
                      So you aren’t satisfied with the fruits of your labor ?
                      Chance(50%) to seize the means of production and receive
                      2X your allocated portion of rations. Chance(50%) of being
                      caught insulting the current regime - receive 0 eth.
                    </p>
                    <button
                      disabled={
                        props.days +
                          props.hours +
                          props.minutes +
                          props.seconds !==
                        0
                          ? true
                          : isETHClaimLoading || isETHGambleClaimLoading
                          ? true
                          : false
                      }
                      onClick={onClickClaimGambleETH}
                    >
                      {isETHGambleClaimLoading ? (
                        <CircularProgress className="circle" />
                      ) : (
                        "Claim Gamble ETH"
                      )}
                    </button>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="video_info mt-4">
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-center">
                    <video controls>
                      <source src={LoloVideo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div className="buy_sell_info mt-4">
              <Card>
                <CardBody>
                  <div className="d-flex fw-bold small mb-3 justify-content-end">
                    <CardExpandToggler />
                  </div>
                  <p>13% Buy and Sell Tax</p>
                  <p>
                    8% is pragmatically and proportionally redistributed to the
                    holders in the form of ETH that you can claim whenever your
                    claim timer reaches 0. This will rise to become the full
                    allocation of the taxes and will be voted on by the people
                    to raise or lower before the contract is renounced.
                  </p>
                  <p>
                    5% Goes to Taking Over The World, and will be lowered to 1%
                    before we renounce the contract.
                  </p>
                </CardBody>
              </Card>
            </div>
            <div className="detail_info mt-4">
              <Card>
                <CardBody>
                  <div className="d-flex fw-bold small mb-3 justify-content-end">
                    <span className="flex-grow-1">ETH Claimed</span>
                    <CardExpandToggler />
                  </div>
                  <div className="info_list">
                    <label>{totalETHClaimed} ETH</label>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <div className="d-flex fw-bold small mb-3 justify-content-end">
                    <span className="flex-grow-1">Biggest Claims</span>
                    <CardExpandToggler />
                  </div>
                  <div className="info_list">
                    {biggestClaims.length === 0 ? (
                      <></>
                    ) : (
                      biggestClaims.map((item, index) => (
                        <a
                          href={`https://etherscan.io/tx/${item.transaction.hash}`}
                          key={index}
                        >
                          {item.transaction.hash}
                        </a>
                      ))
                    )}
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <div className="d-flex fw-bold small mb-3 justify-content-end">
                    <span className="flex-grow-1">Biggest Buys</span>
                    <CardExpandToggler />
                  </div>
                  <div className="info_list">
                    {biggestBuys.length === 0 ? (
                      <></>
                    ) : (
                      biggestBuys.map((item, index) => (
                        <a
                          href={`https://etherscan.io/tx/${item.transaction.hash}`}
                          key={index}
                        >
                          {item.transaction.hash}
                        </a>
                      ))
                    )}
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <div className="d-flex fw-bold small mb-3 justify-content-end">
                    <span className="flex-grow-1">Total Burned</span>
                    <CardExpandToggler />
                  </div>
                  <div className="info_list">
                    <label>{burnedBalance} $COMMUNISM</label>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div id="jsVectorMap" className="map_spread mt-4">
              <h2>Map-Spread Communism</h2>
              <Card>
                <CardBody className="group_body">
                  <div className="d-flex fw-bold small mb-3 justify-content-end map_wrap">
                    <div id="jvectorMap" style={{ height: "300px" }}></div>
                  </div>
                  <div className="text_box">
                    <p>
                      In the early days, communism found its origins in Russia,
                      paving the way for subsequent unsuccessful trials in
                      China. It is from these very foundations that we embarked
                      upon the dissemination of our unwavering communist
                      ideology. Grand conquests will be accompanied by burns and
                      or strategic acquisitions of $COMMUNSIM by our team,
                      serving as triumphant manifestations of our victory over
                      enemy regimes.
                    </p>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div className="personal_hoding mt-4">
              <h2>Personal Holding</h2>
              <div className="card_group">
                <Card>
                  <CardBody>
                    <div className="d-flex fw-bold small mb-3 justify-content-end">
                      <span className="flex-grow-1">Total Communism</span>
                      <CardExpandToggler />
                    </div>
                    <label>
                      {balance ? balance / 1000000000000000000 : ""} $COMMUNISM
                    </label>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <div className="d-flex fw-bold small mb-3 justify-content-end">
                      <span className="flex-grow-1">Claimed ETH</span>
                      <CardExpandToggler />
                    </div>
                    <label>
                      {personalClaimedETH
                        ? personalClaimedETH / 1000000000000000000
                        : ""}
                      ETH
                    </label>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <div className="d-flex fw-bold small mb-3 justify-content-end">
                      <span className="flex-grow-1">ETH to be Claimed</span>
                      <CardExpandToggler />
                    </div>
                    <label>
                      {ethToBeClaimed
                        ? ethToBeClaimed / 1000000000000000000
                        : ""}
                      ETH
                    </label>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className="chart_info mt-4">
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-center">
                    <div id="dexscreener-embed">
                      <iframe
                        src="https://dexscreener.com/ethereum/0x4Ebdb272A1B0D042210ac5AE39bb556e596228C6?embed=1&theme=dark&trades=0&info=0"
                        title="chart"
                      ></iframe>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-4">
                    <button onClick={openUniswap}>Buy On Uniswap</button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        )}
      />
    </div>
  );
}

export default Home;
