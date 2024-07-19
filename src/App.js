import { Fragment, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);

  const notification = useSelector((state) => state.ui.notification);

  console.log(notification)

  const dispatch = useDispatch();

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "Pending request",
          message: "Request Pending",
          title: "Pending notification",
        })
      );

      const response = await fetch(
        "https://shopping-cart-2f412-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error("Failed sending data.");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          message: "Cart data sent successfully",
          title: "data sent",
        })
      );
    };

    if(isInitial){
      isInitial = false
      return
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: "Error occured",
          title: "error",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      <Layout>
        {notification && <Notification status={notification.status} message={notification.message} title={notification.title}/>}
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
