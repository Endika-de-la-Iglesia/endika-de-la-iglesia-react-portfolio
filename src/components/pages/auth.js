import React, { Component } from "react";
import loginImg from "../../../static/assets/images/auth/login.jpg"
import Login from "../auth/login";
import NavigateHelper from "../functional_component/navigate-helper";

class Auth extends Component {

    constructor(props) {
        super(props);

        this.state = {
            shouldNavigate: false, // Add a state to control navigation
        }

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
    }

        handleSuccessfulAuth() {
            this.props.handleSuccessfulLogin();
            this.setState({ shouldNavigate: true }); // Trigger navigation        
        }

        handleUnsuccessfulAuth() {
            this.props.handleUnsuccessfulLogin();
        }

    render() {

        return (
            <div className="auth-page-wrapper">

            {this.state.shouldNavigate && <NavigateHelper shouldNavigate={this.state.shouldNavigate} path="/" />}

                <div 
                    className="left-column" 
                    style={{
                        backgroundImage: `url(${loginImg})`
                    }}
                />


                <div className="right-column">
                    <Login 
                        handleSuccessfulAuth={this.handleSuccessfulAuth}
                        handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
                    />
                </div>
            </div>
        );
    }
}

// Higher-order component to use navigate
// function withRouter(Component) {
//     function ComponentWithRouterProp(props) {
//         let navigate = useNavigate();
//         return <Component {...props} navigate={navigate} />;
//     }

//     return ComponentWithRouterProp;
// }

export default Auth;
