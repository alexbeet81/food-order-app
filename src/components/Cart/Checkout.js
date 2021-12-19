import { useState } from 'react';
import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const Checkout = (props) => {
  const [userOrder, setUserOrder] = useState({})

  const isValidValue = (value) => value.trim() !== "";

  const {
    value: nameValue,
    hasError: nameHasError,
    isValid: nameIsValid,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(isValidValue);

  const {
    value: addressValue,
    hasError: addressHasError,
    isValid: addressIsValid,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
  } = useInput(isValidValue);

  const {
    value: cityValue,
    hasError: cityHasError,
    isValid: cityIsValid,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
  } = useInput(isValidValue);

  const {
    value: postcodeValue,
    hasError: postcodeHasError,
    isValid: postcodeIsValid,
    valueChangeHandler: postcodeChangeHandler,
    inputBlurHandler: postcodeBlurHandler,
  } = useInput(isValidValue);

  //write a custom input to check validation

  const confirmHandler = (event) => {
    event.preventDefault();
    console.log("submitted!");

    if (!formIsValid) {
      return;
    }

    console.log("form is valid!");
    props.onSendOrder({ name: nameValue, address: addressValue, city: cityValue, postcode: postcodeValue});
    setUserOrder(userOrder)
  };

  // form is valid
  let formIsValid = false;

  if (nameIsValid && addressIsValid && cityIsValid && postcodeIsValid) {
    formIsValid = true;
  }
  // submit form handler

  const nameInputClass = nameHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  const addressInputClass = addressHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  const cityInputClass = cityHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  const postcodeInputClass = postcodeHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  return (
    <form onSubmit={confirmHandler}>
      <div className={nameInputClass}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={nameValue}
        />
        {nameHasError && (
          <p className={classes.invalidMessage}>must have a name</p>
        )}
      </div>
      <div className={addressInputClass}>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler}
          value={addressValue}
        />
        {addressHasError && (
          <p className={classes.invalidMessage}>must have a valid address</p>
        )}
      </div>
      <div className={cityInputClass}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          value={cityValue}
        />
        {cityHasError && (
          <p className={classes.invalidMessage}>must have a valid city</p>
        )}
      </div>
      <div className={postcodeInputClass}>
        <label htmlFor="postcode">Post Code</label>
        <input
          type="text"
          id="postcode"
          onChange={postcodeChangeHandler}
          onBlur={postcodeBlurHandler}
          value={postcodeValue}
        />
        {postcodeHasError && (
          <p className={classes.invalidMessage}>must have a valid postcode</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button
          className={classes.submit}
          type="submit"
          disabled={!formIsValid}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
