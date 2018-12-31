import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends React.Component {
  renderHeader() {
    switch (this.props.auth.userId) {
      case null:
        return <div>Loading...</div>;
      case false:
        return (
          <React.Fragment>
            <li>
              <Link to="/auth/google">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>;
            </li>
            <li>
              <a href="/auth/google">Sign In With Google</a>;
            </li>
          </React.Fragment>
        );

      default:
        return (
          <React.Fragment>
            <li>
              <a href="sass.html">Add Credits</a>
            </li>
            <li>
              <a href="badges.html">Credits</a>
            </li>
            <li>
              <a href="/api/signout">Sign Out</a>
            </li>
          </React.Fragment>
        );
    }
  }
  render() {
    console.log(this.props);
    return (
      <div className="container-fluid">
        <nav>
          <div className="container nav-wrapper">
            <Link
              to={this.props.auth.userId ? "/dashboard" : "/"}
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
export default connect(
  mapStateToProps,
  {}
)(Header);
