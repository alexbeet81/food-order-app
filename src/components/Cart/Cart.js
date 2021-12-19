import React, { useContext, useState, Fragment } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const { sendRequest: sendOrderRequest } = useHttp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSumbit, setDidSubmit] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `£${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckingOut(true);
    console.log(cartCtx.items);
  };

  const sendOrderHandler = async (orderData) => {
    setIsSubmitting(true);
    await sendOrderRequest({
      url: "https://react-http-7b544-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        user: orderData,
        orderedItems: cartCtx.items,
      },
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      {!isCheckingOut && (
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
      )}
      {hasItems && !isCheckingOut && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckingOut && (
        <Checkout onSendOrder={sendOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckingOut && modalActions}
    </React.Fragment>
  );

  const submittingModal = (
    <React.Fragment>
      <p className={classes.total}>Submitting....</p>
    </React.Fragment>
  );

  const didSubmitContent = (
    <div className={classes.actions}>
      <p className={classes.total}>Your order was successful!</p>
      <button className={classes["button"]} onClick={props.onClose}>
        OK
      </button>
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSumbit && cartModalContent}
      {isSubmitting && submittingModal}
      {didSumbit && didSubmitContent}
    </Modal>
  );
};

export default Cart;
