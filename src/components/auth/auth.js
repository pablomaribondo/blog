import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import firebase from "../../firebase/config";

const AuthContext = Component => {
  class Auth extends React.Component {
    componentDidMount = async () => {
      let userStatus = {};
      await firebase.getUserState().then(user => {
        if (user) {
          userStatus = user;
        }
      });

      if (
        Object.keys(this.props.loggedIn).length === 0 &&
        Object.keys(this.props.signedIn).length === 0 &&
        Object.keys(userStatus).length === 0
      ) {
        this.props.history.push("/login");
      }
    };

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return {
      loggedIn: state.login.user,
      signedIn: state.signin.user,
    };
  };

  return connect(mapStateToProps, "")(withRouter(Auth));
};

export default AuthContext;
