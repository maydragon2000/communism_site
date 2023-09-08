import React, { useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world.js";
import "jsvectormap/dist/css/jsvectormap.min.css";
import { useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";

import {
  Card,
  CardBody,
  CardExpandToggler,
} from "./../../components/card/card.jsx";

import LoloVideo from "../../assets/lolol2.mp4";
import VideoStartImgae from "../../assets/video-start.png";

function Home() {
  const {
    nextAvailableDate,
    totalETHClaimed,
    balance,
    personalClaimedETH,
    ethToBeClaimed,
    burnedBalance,
  } = useSelector((state) => state.tokens);

  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalVolume, setTotalVolume] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

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
        'query MyQuery {\n  ethereum(network: goerli) {\n    smartContractEvents(\n      smartContractAddress: {is: "0x6ea07e94b6e0921298f0193B0f9E11F2593e67a3"}\n      smartContractEvent: {is: "Transfer"}\n    ) {\n      count\n    }\n  }\n}\n',
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
        'query MyQuery {\n  EVM(network: eth, dataset: combined) {\n    BalanceUpdates(\n      where: {Currency: {SmartContract: {is: "0xdAC17F958D2ee523a2206206994597C13D831ec7"}}}\n    ){\n      No_Holders: count(distinct: BalanceUpdate_Address)\n    }\n  }\n}\n',
      variables: "{}",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://streaming.bitquery.io/graphql", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result, "result"))
      .catch((error) => console.log("error", error));
  };

  const getTotalVolume = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-API-KEY", "BQYWk4roYCgJJdkq6Ului01dWlHJ5P9z");

    var raw = JSON.stringify({
      query:
        'query MyQuery {\n  ethereum(network: goerli) {\n    dexTrades(\n      baseCurrency: {is: "0x6ea07e94b6e0921298f0193B0f9E11F2593e67a3"}\n    ) {\n      quoteAmount(in: ETH)\n    }\n  }\n}\n',
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
        'query MyQuery {\n  ethereum(network: goerli) {\n    dexTrades(\n      baseCurrency: {is: "0x6ea07e94b6e0921298f0193B0f9E11F2593e67a3"}\n      buyCurrency: {is: "0x6ea07e94b6e0921298f0193B0f9E11F2593e67a3"}\n      options: {desc: ["tradeAmount"], limit: 10}\n    ) {\n      transaction {\n        hash\n      }\n      tradeAmount(in: USD)\n      buyAmount\n    }\n  }\n}\n',
      variables: "{}",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://graphql.bitquery.io", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const getBiggestClaims = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-API-KEY", "BQYWk4roYCgJJdkq6Ului01dWlHJ5P9z");

    var raw = JSON.stringify({
      query:
        'query MyQuery {\n  ethereum(network: goerli) {\n    arguments(\n      options: {desc: ["value.value"]}\n      smartContractAddress: {in: "0x6ea07e94b6e0921298f0193B0f9E11F2593e67a3"}\n      smartContractEvent: {is: "ClaimETHSuccessfully"}\n      argument: {is: "ethReceived"}\n    ){\n      block {\n        height\n      }\n      argument{\n        name\n      }\n      value{\n        value\n      }\n      transaction {\n        hash\n      }\n    }\n  }\n}\n',
      variables: "{}",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://graphql.bitquery.io", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result, "result"))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    renderMap();
    document.addEventListener("theme-reload", () => {
      renderMap();
    });
    // getTotalTransactions();
    // getTotalHolders();
    // getTotalVolume();
    // getBiggestClaims();
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

      <div>
        <Card>
          <CardBody>
            <div className="d-flex fw-bold small mb-3 justify-content-end">
              <CardExpandToggler />
            </div>
            <div className="row mb-2 d-flex flex-wrap top_info">
              <div className="col-xl-3 col-lg-6 coming-soon-timer text-center">
                <span>Next Claim Available</span>
                <Countdown
                  date={
                    nextAvailableDate
                      ? parseInt(nextAvailableDate) * 1000
                      : Date.now()
                  }
                  ref={countdownRef}
                  renderer={(props) => (
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
                  )}
                />
              </div>
              <div className="col-xl-3 col-lg-6 total_info">
                <p>Holders</p>
                <label>5M+</label>
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
        <div className="video_info mt-4">
          <Card>
            <CardBody>
              {/* {videoLoaded ? (
                <div className="d-flex justify-content-center">
                  <video autoPlay muted loop>
                    <source src={LoloVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className="d-flex justify-content-center audio_group">
                  <img src={VideoStartImgae} alt="video start" />
                  <Oval
                    height={80}
                    width={80}
                    color="#e9f0e4"
                    wrapperStyle={{}}
                    wrapperClass="spinner"
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#e9f0e4"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                  <video autoPlay muted loop onLoadedData={handleVideoLoaded}>
                    <source src={LoloVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )} */}
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
                allocation of the taxes and will be voted on by the people to
                raise or lower before the contract is renounced.
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
                <a href="https://etherscan.io/tx/0xabbe75919aee5bbeff0dbba6bf7957d26dd75eb55ecf153368c94437fc5e8033">
                  0xabbe75919aee5bbeff0dbba6bf7957d26dd75eb55ecf153368c94437fc5e8033
                </a>
                <a href="https://etherscan.io/tx/0xabbe75919aee5bbeff0dbba6bf7957d26dd75eb55ecf153368c94437fc5e8033">
                  0xabbe75919aee5bbeff0dbba6bf7957d26dd75eb55ecf153368c94437fc5e8033
                </a>
                <a href="https://etherscan.io/tx/0xabbe75919aee5bbeff0dbba6bf7957d26dd75eb55ecf153368c94437fc5e8033">
                  0xabbe75919aee5bbeff0dbba6bf7957d26dd75eb55ecf153368c94437fc5e8033
                </a>
                <a href="https://etherscan.io/tx/0xabbe75919aee5bbeff0dbba6bf7957d26dd75eb55ecf153368c94437fc5e8033">
                  0xabbe75919aee5bbeff0dbba6bf7957d26dd75eb55ecf153368c94437fc5e8033
                </a>
                <a href="https://etherscan.io/tx/0xabbe75919aee5bbeff0dbba6bf7957d26dd75eb55ecf153368c94437fc5e8033">
                  0xabbe75919aee5bbeff0dbba6bf7957d26dd75eb55ecf153368c94437fc5e8033
                </a>
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
                <a href="https://etherscan.io/tx/0xabbe75919aee5bbeff0dbba6bf7957d26dd75eb55ecf153368c94437fc5e8033">
                  0xabbe75919aee5bbeff0dbba6bf7957d26dd75eb55ecf153368c94437fc5e8033
                </a>
                <a href="https://etherscan.io/tx/0xabbe75919aee5bbeff0dbba6bf7957d26dd75eb55ecf153368c94437fc5e8033">
                  0xabbe75919aee5bbeff0dbba6bf7957d26dd75eb55ecf153368c94437fc5e8033
                </a>
                <a href="https://etherscan.io/tx/0xabbe75919aee5bbeff0dbba6bf7957d26dd75eb55ecf153368c94437fc5e8033">
                  0xabbe75919aee5bbeff0dbba6bf7957d26dd75eb55ecf153368c94437fc5e8033
                </a>
                <a href="https://etherscan.io/tx/0xabbe75919aee5bbeff0dbba6bf7957d26dd75eb55ecf153368c94437fc5e8033">
                  0xabbe75919aee5bbeff0dbba6bf7957d26dd75eb55ecf153368c94437fc5e8033
                </a>
                <a href="https://etherscan.io/tx/0xabbe75919aee5bbeff0dbba6bf7957d26dd75eb55ecf153368c94437fc5e8033">
                  0xabbe75919aee5bbeff0dbba6bf7957d26dd75eb55ecf153368c94437fc5e8033
                </a>
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
                <label>{burnedBalance} $communism</label>
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
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                  dolor sit amet, consectetur, adipisci velit, sed quia non
                  numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                  nostrum exercitationem ullam corporis suscipit laboriosam,
                  nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
                  iure reprehenderit qui in ea voluptate velit esse quam nihil
                  molestiae consequatur, vel illum qui dolorem eum fugiat quo
                  voluptas nulla pariatur?
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
                <label>{balance} $communism</label>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="d-flex fw-bold small mb-3 justify-content-end">
                  <span className="flex-grow-1">Claimed ETH</span>
                  <CardExpandToggler />
                </div>
                <label>{personalClaimedETH} ETH</label>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="d-flex fw-bold small mb-3 justify-content-end">
                  <span className="flex-grow-1">ETH to be Claimed</span>
                  <CardExpandToggler />
                </div>
                <label>{ethToBeClaimed} ETH</label>
              </CardBody>
            </Card>
            {/* <Card>
              <CardBody>
                <div className="d-flex fw-bold small mb-3 justify-content-end">
                  <span className="flex-grow-1">Next available claim</span>
                  <CardExpandToggler />
                </div>
                <div className="coming-soon-timer text-center">
                  <Countdown
                    date={
                      nextAvailableDate
                        ? parseInt(nextAvailableDate) * 1000
                        : Date.now()
                    }
                    ref={countdownRef}
                    renderer={(props) => (
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
                    )}
                  />
                </div>
              </CardBody>
            </Card> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
