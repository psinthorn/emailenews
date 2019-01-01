import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StripePayment from "./../components/payments/StripePayment";

class Header extends React.Component {
  renderHeader() {
    //console.log("auth status", typeof this.props.auth._id);
    switch (this.props.auth._id) {
      case null:
        return <div>Loading...</div>;
      case undefined:
        return (
          <li>
            {" "}
            <a className="btn red" href="/auth/google">
              Sign In With Google
            </a>
          </li>
        );
      case false:
        return (
          <li>
            {" "}
            <a href="/auth/google">Sign In With Google</a>
          </li>
        );
      default:
        return (
          <React.Fragment>
            <li key="1">
              <StripePayment />
            </li>

            <li key="2">
              <div style={{ margin: "0 5px" }}>
                Credits: {this.props.auth.credits}{" "}
              </div>
            </li>

            <li key="3">
              <a href="/api/signout">Sign Out -></a>
            </li>
          </React.Fragment>
        );

      // return [
      //   <li key="1">
      //     <StripePayment />
      //   </li>,
      //   <li key="2">
      //     <div style={{ margin: "0 5px" }}>
      //       Credits: {this.props.auth.credits}{" "}
      //     </div>
      //   </li>,
      //   <li key="3">
      //     <a href="/api/signout">Sign Out -></a>
      //   </li>
      // ];
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <nav>
          <div className="container nav-wrapper">
            <Link
              to={this.props.auth_id ? "/dashboard" : "/"}
              className="brand-logo"
            >
              EmailEnews
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.renderHeader()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

//Use destructuring to pull out the variable and value
const mapStateToProps = ({ auth }) => {
  return { auth };
};
export default connect(mapStateToProps)(Header);
