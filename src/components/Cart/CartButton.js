import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {

  const dispatch = useDispatch()
  const cartQuantity = useSelector(state => state.cart.totalQuantity)

  const cartToggleHnadle = () => {
    dispatch(uiActions.toggle())
  }



  return (
    <button className={classes.button} onClick={cartToggleHnadle}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity} items</span>
    </button>
  );
};

export default CartButton;
