import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { handlerToken } from "./../../actions";

class StripePayment extends React.Component {
  render() {
    return (
      <StripeCheckout
        name="EmailEnews"
        description="Pay 10$ for get 12Credits"
        amount={500}
        token={token => this.props.handlerToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  { handlerToken }
)(StripePayment);
