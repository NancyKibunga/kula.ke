import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { trackOrderById } from '../../Services/orderService';
import NotFound from '../../components/NotFound/NotFound';
import classes from './orderTrackPage.module.css';
import DateTime from '../../components/DateTime/DateTime';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList';
import Title from '../../components/Title/Title';
import Map from '../../components/Map/Map';


// getting the order id from the params
export default function OrderTrackPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState();
// check if the order id has value, get the order state and set it
  useEffect(() => {
    orderId &&
      trackOrderById(orderId).then(order => {
        setOrder(order);
      });
  }, []);
// if the order id has no value, order id is not available
  if (!orderId)
    return <NotFound message="Order Not Found" linkText="Go To Home Page" />;

    // if the order is valid, show the contents details
  return (
    order && (
      <div className={classes.container}>
        <div className={classes.content}>
          <h1>Order #{order.id}</h1>
          <div className={classes.header}>
            <div>
              <strong>Date</strong>
              {/* calling the datetime component */}
              <DateTime date={order.createdAt} />
            </div>
            <div>
              <strong>Name</strong>
              {order.name}
            </div>
            <div>
              <strong>Address</strong>
              {order.address}
            </div>
            <div>
              <strong>State</strong>
              {order.status}
            </div>
            {order.paymentId && (
              <div>
                <strong>Payment ID</strong>
                {order.paymentId}
              </div>
            )}
          </div>
{/* components to display on the order track page */}
          <OrderItemsList order={order} />
        </div>

        <div>
          <Title title="Your Location" fontSize="1.6rem" />
          <Map location={order.addressLatLng} readonly={true} />
        </div>
{/* check the order status and link to payment page if new */}
        {order.status === 'NEW' && (
          <div className={classes.payment}>
            <Link to="/payment">Go To Payment</Link>
          </div>
        )}
      </div>
    )
  );
}