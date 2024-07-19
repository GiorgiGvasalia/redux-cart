import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {

    const sendCartData = async () => {
      const response = await fetch(
        "https://shopping-cart-2f412-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );

      if(!response.ok){
        throw new Error('Failed sending data.')
      }

      const responseData = await response.json()

    }

  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
