import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Auth from "./pages/auth";
import NavigationComponent from "./navigation/navigation-component";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import PortfolioDetail from "./portfolio/portfolio-detail";
import NoMatch from "./pages/no-match";
import Blog from "./pages/blog";
import BlogDetail from "./blog/blog-detail";
import PortfolioManager from "./pages/portfolio-manager";
import ParamsWrapper from "./functional_component/params-wrapper";
import IconHelper from "./functional_component/icon-helper";

export default class App extends Component {
  constructor(props) {
    super(props);

    IconHelper();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN",
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
    });
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
    });
  }

  checkLoginStatus() {
    return axios
      .get("https://api.devcamp.space/logged_in", {
        withCredentials: true,
      })
      .then((response) => {
        const loggedIn = response.data.logged_in;
        const loggedInStatus = this.state.loggedInStatus;

        if (loggedIn && loggedInStatus === "LOGGED_IN") {
          return loggedIn;
        } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN",
          });
        } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
          });
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  authorizedPages() {
    return [
      <Route
        key="portfolio-manager"
        path="/portfolio-manager"
        element={<PortfolioManager />}
      />,
    ];
  }

  render() {
    return (
      <div className="app">
        <NavigationComponent
          loggedInStatus={this.state.loggedInStatus}
          handleSuccessfulLogout={this.handleSuccessfulLogout}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/auth"
            element={
              <Auth
                handleSuccessfulLogin={this.handleSuccessfulLogin}
                handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/blog"
            element={<Blog loggedInStatus={this.state.loggedInStatus} />}
          />
          <Route
            path="/b/:slug"
            element={
              <ParamsWrapper
                component={BlogDetail}
                loggedInStatus={this.state.loggedInStatus}
              />
            }
          />
          {this.state.loggedInStatus === "LOGGED_IN"
            ? this.authorizedPages()
            : null}
          <Route
            path="/portfolio/:slug"
            element={<ParamsWrapper component={PortfolioDetail} />}
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    );
  }
}
