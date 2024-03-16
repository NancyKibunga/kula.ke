import React, { useState, useEffect } from 'react';
import classes from './paymentPage.module.css';
import { getNewOrderForCurrentUser } from '../../Services/orderService';
import Title from '../../components/Title/Title';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList';
import Map from '../../components/Map/Map';
import PaypalButtons from '../../components/PaypalButtons/PaypalButtons';

export default function PaymentPage() {
  const [order, setOrder] = useState();

//   imports the new order data from the server and set it in the payment page
  useEffect(() => {
    getNewOrderForCurrentUser().then(data => setOrder(data));
  }, []);

//   if the order is not available, return

  if (!order) return;
// output for when you click to pay
  return (
    <>
      <div className={classes.container}>
        <div className={classes.content}>
          <Title title="Your Order" fontSize="1.6rem" />
          <div className={classes.summary}>
            <div>
              <h3>Name:</h3>
              <span>{order.name}</span>
            </div>
            <div>
              <h3>Address:</h3>
              <span>{order.address}</span>
            </div>
          </div>
          {/* shows the items in your order */}
          <OrderItemsList order={order} />
        </div>
{/* shows your location */}
        <div className={classes.map}>
          <Title title="Your Location" fontSize="1.6rem" />
          <Map readonly={true} location={order.addressLatLng} />
        </div>
{/* buttons for paypal payment */}
        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
            <PaypalButtons order={order} />
          </div>
        </div>
      </div>
    </>
  );
}