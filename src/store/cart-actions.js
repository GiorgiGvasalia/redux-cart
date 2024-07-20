import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

// frtching cart data
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://shopping-cart-2f412-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
      );

      if (!response.ok) {
       throw new Error('Failed getting data.')
      }

      const data = await response.json();
      return data
    };

    try {
        const cartData = await fetchData()
        dispatch(cartActions.replaceCart({
            items: cartData.items || [],
            totalQuantity: cartData.totalQuantity
        }))
        
    } catch (error) {
        dispatch(
            uiActions.showNotification({
              status: "Getting data",
              message: "Fetching data",
              title: "Waiting cart items...",
            })
          );
    }
};
};

// sending cart data
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "Pending request",
        message: "Request Pending",
        title: "Pending notification",
      })
    );

    // sending request && hanndling notifications
    const sendRequest = async () => {
      const response = await fetch(
        "https://shopping-cart-2f412-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity
        }) }
      );

      if (!response.ok) {
        throw new Error("Failed sending data.");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          message: "Cart data sent successfully",
          title: "data sent",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: "Error occured",
          title: "error",
        })
      );
    }
  };
};
