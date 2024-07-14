import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email:"",
            password:"",
            errorText:"",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        axios.post("https://api.devcamp.space/sessions",
        {
            client: {
                email: this.state.email,
                password: this.state.password,
            }
        },
        {withCredentials: true},
    )
    .then(response => {
        if (response.data.status === "created") {
            this.props.handleSuccessfulAuth();
        } else {
            this.setState({
                errorText:"Wrong email or password"
            });
            this.props.handleUnsuccessfulAuth();
        };
    })
    .catch(error => {
        this.setState({
            errorText:"An error occurred"
        });
        console.log(error)
        this.props.handleUnsuccessfulAuth();
    });

        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: "",
        })
    }

    render() {
        return (
          <div className="login-container-wrapper">
            <div className="login-title">
              <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>
              <div>{this.state.errorText}</div>
            </div>

            <div className="login-form-wrapper">
              <form onSubmit={this.handleSubmit}>
                <div className="login-input">
                  <FontAwesomeIcon icon={"fa-envelope"} size="2x" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="login-input">
                  <FontAwesomeIcon icon={"fa-lock"} size="2x" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="button">
                  <button className="btn" type="submit">Login</button>
                </div>
              </form>
            </div>
          </div>
        );
    }
}