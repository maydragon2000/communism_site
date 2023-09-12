import React from "react";
import {
  Card,
  CardBody,
  CardExpandToggler,
} from "./../../components/card/card.jsx";

import AMBCryptoImage from "../../assets/amb-crypto.png";
import BitCoinistImage from "../../assets/bitcoinist.png";
import CoinSpeakerImage from "../../assets/Coinspeaker.png";
import CoinTelegraphImage from "../../assets/cointelegraph.png";
import CoinNatureImage from "../../assets/cryptonature.png";
import CoinCiergeImage from "../../assets/coincierge.png";
import FinanzenImage from "../../assets/finanzen.png";
import CryptoNewsImage from "../../assets/cryptonews.png";
import KryptoszeneImage from "../../assets/kryptoszene.png";
import NewsBTCImage from "../../assets/newsbtc.png";
import NewsBitImage from "../../assets/newsbit.png";
import CityPaperImage from "../../assets/citypaper.png";
import SecureImage from "../../assets/secure/secure.png";
import SpImage from "../../assets/secure/sp.png";
import VerifyImage from "../../assets/secure/verified.png";
import CasinoBetaImage from "../../assets/beta.png";
import BuySecImage from "../../assets/buysec.png";
import WorksImage from "../../assets/works.png";

const FaqItem = ({ title, description, id }) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingThree">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${id}`}
        >
          {title}
        </button>
      </h2>
      <div
        id={id}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">{description}</div>
      </div>
    </div>
  );
};

const Casino = () => {
  const features = [
    {
      image: AMBCryptoImage,
    },
    {
      image: BitCoinistImage,
    },
    {
      image: CoinSpeakerImage,
    },
    {
      image: CoinTelegraphImage,
    },
    {
      image: CoinNatureImage,
    },
    {
      image: CoinCiergeImage,
    },
    {
      image: FinanzenImage,
    },
    {
      image: CryptoNewsImage,
    },
    {
      image: KryptoszeneImage,
    },
    {
      image: NewsBTCImage,
    },
    {
      image: NewsBitImage,
    },
    {
      image: CityPaperImage,
    },
  ];
  const works = [
    {
      id: "collapseOne",
      title: "Buy-Back System",
      description:
        "Scorpion Casino uses a smart contract to purchase $SCORP tokens from public exchanges on a daily basis. These purchases are financed through a portion of the Casino and Betting revenue. During this buying process the $SCORP price goes automatically up.",
    },
    {
      id: "collapseTwo",
      title: "Automatic Token Burn",
      description:
        "The smart contract automatically burns half of the purchased $SCORP tokens each day. This process reduces the circulating $SCORP supply, which makes the remaining tokens more valuable.",
    },
    {
      id: "collapseThree",
      title: "Daily Profits",
      description:
        "The other half of the tokens obtained through the buyback process will be automatically transferred to the Scorpion Staking Pool. This staking pool then distributes rewards daily to $SCORP holders based on the number of tokens they hold, generating daily profits for them.",
    },
  ];
  return (
    <div>
      <h1>Casino</h1>
      <div className="featured_in">
        <Card>
          <CardBody>
            <div className="d-flex fw-bold small mb-3 justify-content-end">
              <span className="flex-grow-1">FEATURED IN</span>
              <CardExpandToggler />
            </div>
            <div className="feature_list">
              {features.map((item, index) => (
                <div key={index}>
                  <img src={item.image} alt="feature" />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="secure">
        <h2>100% SECURE</h2>
        <div className="secure_inner">
          <Card>
            <CardBody>
              <div className="secure_filed">
                <img src={SecureImage} alt="secure" />
                <p>Secured Licensed Platform</p>
                <label>
                  The SCORPION platform is regulated and licensed by the Curacao
                  EGaming Authority.
                </label>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="secure_filed">
                <img src={VerifyImage} alt="verify" />
                <p>Team is KYC Verified</p>
                <label>
                  The Scorpion Team has been successfully verified by Assure
                  DeFi the KYC Gold Standard.
                </label>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="secure_filed">
                <img src={SpImage} alt="sp" />
                <p>Audited by Solidproof</p>
                <label>
                  Scorpion Casino has been fully audited by Solidproof and shown
                  to be 100% secure.
                </label>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="beta">
        <Card>
          <CardBody>
            <div className="beta_inner">
              <div className="text">
                <h2>$SCORP IS THE FUTURE LEADING GAMBLING CRYPTOCURRENCY</h2>
                <p>
                  The $SCORP token is empowering the SCORPION ecosystem,
                  providing more than 30,000 betting opportunities monthly, 210
                  casino games, and 160 live games with a licensed, transparent,
                  and provable fair platform. Don't wait - come check us out
                  now!
                </p>
                <button>CASINO BETA IS LIVE NOW</button>
              </div>
              <div className="image_wrap">
                <img src={CasinoBetaImage} alt="beta" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="buy_sec">
        <h2>$SCORP IS THE FUTURE LEADING GAMBLING CRYPTOCURRENCY</h2>
        <Card>
          <CardBody>
            <div className="buy_sec_inner">
              <div className="text">
                <span>Step 1</span>
                <p>Connect your Wallet</p>
                <label>
                  Use Metamask or Trust Wallet to connect your wallet in
                  seconds.
                </label>
                <span>Step 2</span>
                <p>Confirm Transaction</p>
                <label>You can buy $SCORP with USDT, ETH and BNB.</label>
                <span>Step 3</span>
                <p>Claim Tokens</p>
                <label>
                  Congratulations! You can claim your $SCORP after the pre-sale
                  ends.
                </label>
                <div className="button_wrap">
                  <button className="buy_button">BUY $SCORP NOW</button>
                  <button className="help_button">NEED HELP?</button>
                </div>
              </div>
              <div className="image_wrap">
                <img src={BuySecImage} alt="buy" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="how_it_works">
        <Card>
          <CardBody>
            <div className="works_inner">
              <h2>HOW DOES IT WORK?</h2>
              <p>
                Curious about how the Scorpion Casino ecosystem works? Here’s a
                simplified explanation.
              </p>
              <p>
                Scorpion Casino is a global Crypto Casino and Sports Betting
                platform generating daily revenue. This income drives the growth
                of the $SCORP Token through an integrated daily Buy-Back, Burn
                and Reward System.
              </p>
              <div className="main">
                <div className="works">
                  <div className="accordion" id="accordionExample">
                    {works.map((item) => (
                      <FaqItem
                        title={item.title}
                        description={item.description}
                        id={item.id}
                        key={item.id}
                      />
                    ))}
                  </div>
                </div>
                <div className="image_wrap">
                  <img src={WorksImage} alt="work" />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Casino;
