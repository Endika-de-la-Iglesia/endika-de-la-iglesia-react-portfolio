import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { NavLink } from "react-router-dom";
import NavigateHelper from "../functional_component/navigate-helper";

export default class NavigationComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldNavigate: false,
      path: "/",
    };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link">
        <NavLink to={route} className={this.classIsActive}>
          {linkText}
        </NavLink>
      </div>
    );
  };

  classIsActive = ({ isActive }) =>
    isActive ? "nav-link-active" : "nav-link-inactive";

  handleSignOut = () => {
    axios
      .delete("https://api.devcamp.space/logout", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          this.props.handleSuccessfulLogout();
          this.setState({ shouldNavigate: true });
        }
        return response.data;
      })
      .catch((error) => {
        console.log("Error signing out", error);
      });
  };

  handleSignIn = () => {
    this.setState({
      shouldNavigate: true,
      path: "/auth",
    });
  };

  componentDidUpdate() {
    if (this.state.shouldNavigate) {
      this.setState({ shouldNavigate: false });
    }
  }

  render() {
    return (
      <div className="nav-wrapper">
        {this.state.shouldNavigate && (
          <NavigateHelper
            shouldNavigate={this.state.shouldNavigate}
            path={this.state.path}
          />
        )}

        <div className="left-side">
          <div className="nav-link">
            <NavLink to="/" className={this.classIsActive}>
              Home
            </NavLink>
          </div>

          <div className="nav-link">
            <NavLink to="/about" className={this.classIsActive}>
              About
            </NavLink>
          </div>

          <div className="nav-link">
            <NavLink to="/contact" className={this.classIsActive}>
              Contact
            </NavLink>
          </div>

          <div className="nav-link">
            <NavLink to="/blog" className={this.classIsActive}>
              Blog
            </NavLink>
          </div>

          {this.props.loggedInStatus === "LOGGED_IN"
            ? this.dynamicLink("/portfolio-manager", "Portfolio Manager")
            : null}
        </div>

        <div className="right-side">
          <h2>Endika de la Iglesia</h2>
          {this.props.loggedInStatus === "LOGGED_IN" ? (
            <a className="logout-icon" onClick={this.handleSignOut}>
              <FontAwesomeIcon icon="fa-right-from-bracket" size="xl" />
            </a>
          ) : (
            <a className="login-icon" onClick={this.handleSignIn}>
              <FontAwesomeIcon icon="fa-right-to-bracket" size="xl" />
            </a>
          )}
        </div>

        {false ? <button>Add blog</button> : null}
      </div>
    );
  }
}
