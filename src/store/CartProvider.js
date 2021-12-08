import CartContext from "./cart-context";

const addItemToCartHandler = (item) => {};

const removeItemFromCartHandler = (id) => {};

const cartContext = {
  items: [],
  totalAmount: 0,
  addItem: addItemToCartHandler,
  removeItem: removeItemFromCartHandler 
};

const CartContext = (props) => {
  return <CartContext.Provider value={cartContext}>
    {props.children}
    </CartContext.Provider>;
};

export default CartContext;
