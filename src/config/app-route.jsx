import React from "react";
import App from "./../app.jsx";
import { Navigate } from "react-router-dom";

import Home from "./../pages/home/home.js";
import Manifesto from "../pages/manifesto/manifesto.js";
import Casino from "../pages/casino/casino.js";

const AppRoute = [
  {
    path: "*",
    element: <App />,
    children: [
      { path: "", element: <Navigate to="/home" /> },
      { path: "home", element: <Home /> },
      { path: "manifesto", element: <Manifesto /> },
      // { path: 'casino', element: <Casino />}
    ],
  },
];

export default AppRoute;
