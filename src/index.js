import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useRoutes, useLocation } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import AppRoute from "./config/app-route.jsx";
import { slideToggle } from "./composables/slideToggle.js";
import { Provider } from "react-redux";
import store from "./redux/store";

// bootstrap
import "bootstrap";

// css
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./index.css";
import "./scss/styles.scss";

function getLibrary(provider) {
  return new Web3(provider);
}

const container = document.getElementById("root");
const root = createRoot(container);
function App() {
  let element = useRoutes(AppRoute);
  let location = useLocation();

  // on every route change
  React.useEffect(() => {
    var elm = document.querySelector(".app");
    if (elm) {
      elm.classList.remove("app-sidebar-mobile-toggled");
    }
    var elm2 = document.querySelector(".app-top-nav");
    if (elm2 && elm2.style.display === "block") {
      slideToggle(document.querySelector(".app-top-nav"));
    }
  }, [location]);

  return element;
}

root.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Web3ReactProvider>
);
