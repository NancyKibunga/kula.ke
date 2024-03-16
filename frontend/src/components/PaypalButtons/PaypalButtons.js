import {
    PayPalButtons,
    PayPalScriptProvider,
    usePayPalScriptReducer,
  } from '@paypal/react-paypal-js';
  import React, { useEffect } from 'react';
  import { useLoading } from '../../hooks/useLoading';
  import { pay } from '../../Services/orderService';
  import { useCart } from '../../hooks/useCart';
  import { toast } from 'react-toastify';
  import { useNavigate } from 'react-router-dom';
  
//   Loads the sripts from the paypal server into our website
  export default function PaypalButtons({ order }) {
    return (
      <PayPalScriptProvider
    //   parse an object that gets the client id that you get from the paypal server
        options={{
          clientId:
            'AUWcnaHjOUoXVI3IjLpMkM0Kk0Sigq1CUAWP-finHI950yQD2Qni8XPkRbs76Q-_JIT8hJFhKD8YVy3u',
        }}
      >
        <Buttons order={order} />
      </PayPalScriptProvider>
    );
  }
//   handling the buttons actions
  function Buttons({ order }) {
    const { clearCart } = useCart();
    const navigate = useNavigate();
    const [{ isPending }] = usePayPalScriptReducer();
    const { showLoading, hideLoading } = useLoading();
    // if the script is loading, you show loading, if complete hide loading
    useEffect(() => {
      isPending ? showLoading() : hideLoading();
    });
//   function that creates the order
    const createOrder = (data, actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: 'Ksh',
              value: order.totalPrice,
            },
          },
        ],
      });
    };
//   payment function
    const onApprove = async (data, actions) => {
      try {
        const payment = await actions.order.capture();
        const orderId = await pay(payment.id);
        // after payment is successful the cart is cleared
        clearCart();
        toast.success('Payment Completed Successfully', 'Success');
        navigate('/track/' + orderId);
      } catch (error) {
        toast.error('Payment Failed', 'Error');
      }
    };
  
    const onError = err => {
      toast.error('Payment Failed', 'Error');
    };
  
    return (
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    );
  }