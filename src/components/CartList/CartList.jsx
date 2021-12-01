import React, { useContext } from "react";
import { ShopContext } from "../../context/context";
import StripeCheckout from "react-stripe-checkout";
import { STRIPE_KEY } from "../../config";
import CartItem from "../CartItem/CartItem";
import "./CartList.css";

export default function CartList() {
  const { order = [], toggleCartDisplay = Function.prototype } =
    useContext(ShopContext);

  const totalPrice = order
    .reduce((sum, el) => {
      return sum + +el.price.slice(1) * +el.quantity;
    }, 0)
    .toFixed(2);

  const handleToken = (token, addresses) => {
    console.log({ token, addresses });
  };

  return (
    <div className="cartContainer">
      <h4 className="collection-item">Your Order: </h4>
      <ul className="collection">
        {order.length ? (
          order.map((item) => <CartItem key={item.id} {...item} />)
        ) : (
          <li className="collection-item">Your cart is empty</li>
        )}
        <li className="collection-item">
          <b>
            Total price:{" "}
            <span className="secondary-content" style={{ color: "#000" }}>
              {totalPrice}$
            </span>
          </b>
        </li>
      </ul>

      <StripeCheckout
        stripeKey={STRIPE_KEY}
        token={handleToken}
        locale="en"
        billingAddress
        shippingAddress
        bitcoin
      >
        <button className="secondary-content btn deep-purple darken-2">
          Delivery address and payment
        </button>
      </StripeCheckout>
      <i
        className="material-icons cart-close"
        onClick={toggleCartDisplay}
        title="close cart"
      >
        close
      </i>
    </div>
  );
}
