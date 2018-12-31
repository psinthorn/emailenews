import React from "react";
import { connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";

import { fetchUser } from "./../actions";

import Header from "./../layouts/Header";
import { LandingPage } from "./../pages/LandingPage";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import { NotFound } from "./../pages/NotFound.js";
import history from "./history";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    console.log(this.props.auth);
    return (
      <Router history={history}>
        <div>
          <Header />
          <div>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/surveys/new" component={SurveyNew} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(App);

// #Extra options#

//#Import all actions
//import * as actions from "./../actions";

// #if you use import * as actions then you need to pass action like below as props
// export default connect(
//     mapStateToProps,
//     { actions }
// )(App);
