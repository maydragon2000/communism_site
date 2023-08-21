import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  CardExpandToggler,
} from "./../../components/card/card.jsx";
import Countdown from "react-countdown";
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world.js";
import "jsvectormap/dist/css/jsvectormap.min.css";

function Home() {
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
        { name: "Canada", coords: [56.1304, -106.3468] },
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
        selectedRegions: ["US", "CA"],
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

  useEffect(() => {
    renderMap();

    document.addEventListener("theme-reload", () => {
      renderMap();
    });
  }, []);
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
                <Countdown
                  date={Date.now() + 1000000000}
                  renderer={(props) => (
                    <div className="is-countdown">
                      <div className="countdown-row countdown-show4">
                        <div className="countdown-section">
                          <div className="countdown-amount">{props.hours}</div>
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
                <p>Hoders</p>
                <label>5M+</label>
              </div>
              <div className="col-xl-3 col-lg-6 total_info">
                <p>Transactions</p>
                <label>12M+</label>
              </div>
              <div className="col-xl-3 col-lg-6 total_info">
                <p>Total Volume</p>
                <label>41,423,242 ETH</label>
              </div>
            </div>
          </CardBody>
        </Card>
        <div className="buy_sell_info mt-4">
          <Card>
            <CardBody>
              <div className="d-flex fw-bold small mb-3 justify-content-end">
                <CardExpandToggler />
              </div>
              <p>5% Buy and Sell Tax</p>
              <p>
                4% is pragmatically and proportionally redistributed to the
                holders in the form of ETH that you can claim whenever you want
                as it accumulates.
              </p>
              <p>1% Goes to Taking Over The World</p>
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
                <label>23,242 ETH</label>
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
                <label>220000 $communism</label>
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
                <label>220000 $communism</label>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="d-flex fw-bold small mb-3 justify-content-end">
                  <span className="flex-grow-1">Claimed ETH</span>
                  <CardExpandToggler />
                </div>
                <label>23,242 ETH</label>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="d-flex fw-bold small mb-3 justify-content-end">
                  <span className="flex-grow-1">ETH to be Claimed</span>
                  <CardExpandToggler />
                </div>
                <label>23,242 ETH</label>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="d-flex fw-bold small mb-3 justify-content-end">
                  <span className="flex-grow-1">
                    Must Hold at Least 10,000 Communism to be Eligible to Claim
                    ETH
                  </span>
                  <CardExpandToggler />
                </div>
                <label>23,242 ETH</label>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
