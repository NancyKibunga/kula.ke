import React from 'react';
import classes from './cartPage.module.css';
import { useCart } from '../../hooks/useCart';
import Title from '../../components/Title/Title';
import { Link } from 'react-router-dom';
import Price from '../../components/Price/Price';

export default function CartPage() {
    const{ cart, removeFromCart, changeQuantity } = useCart();
  return (
  
  <>
  {/* display the cart page title */}
  <Title title="Cart Page" margin="1.5rem 0 0 2.5rem"/>
    {/* checks and display the cart page contents */}
  {cart && cart.items.length > 0 && (
    <div className={classes.container}>
        <ul className={classes.list}>
            {/* shows all cart items */}
            {cart.items.map(item => (
                <li key ={item.food.id}>
                    {/* shows the food image */}
                    <div> 
                        <img
                        src={`/foods/${item.food.imageUrl}`}
                        alt={item.food.name}/>
                        </div>
{/* foodname that leads to foodpage when clicked */}
                        <div>
                        <Link to={`/food/${item.food.id}`}>{item.food.name}</Link>
                        </div>
{/* select box that changes the quantity of the food */}
                        <div>
                            <select value={item.quantity} onChange={e => changeQuantity(item, Number(e.target.value))}>
                            
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>

                        </select>

                        </div>
{/* shows the food price */}
                        <div>
                            <Price price={item.price} />
                        </div>
{/* to remove items from cart button */}
<div>
    <button className={classes.remove_button} onClick={() => removeFromCart(item.food.id)}>Remove</button>
</div>
                </li>
            ))}
        </ul>

        <div className={classes.checkout}>
            <div>
                <div className={classes.foods_count}>{cart.totalCount}</div>
         <div className={classes.totalPrice}>
            <Price price={cart.totalPrice} />

            </div>       
            </div>

            <Link to="/checkout">Proceed to Checkout</Link>
        </div>
    </div>
  )}


  </>
);
}
  

