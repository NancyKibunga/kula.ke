import React from 'react';
// loading items from the cart
import { useCart } from '../../hooks/useCart';
// assign the items to a user
import { useAuth } from '../../hooks/useAuth';
// navigating the user to the payment page after submitting data at the checkout
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// getting the user data
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createOrder } from'../../Services/orderService.js';
import classes from './checkoutPage.module.css';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList';
import Map from '../../components/Map/Map';


export default function CheckoutPage() {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState({ ...cart });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
// submit function
  const submit = async data => {
    // if the user did not select an address
    if (!order.addressLatLng) {
      toast.warning('Please select your location on the map');
      return;
    }
// creating a successfull order, navigate the user to the payment
    await createOrder({ ...order, name: data.name, address: data.address });
    navigate('/payment');
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className={classes.container}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />
          <div className={classes.inputs}>
            <Input
              defaultValue={user.name}
              label="Name"
              {...register('name')}
              error={errors.name}
            />
            <Input
              defaultValue={user.address}
              label="Address"
              {...register('address')}
              error={errors.address}
            />
          </div>
          {/* order items parsed to the checkout */}
          <OrderItemsList order={order} />
        </div>
        {/* choosing location on the map */}
        <div>
          <Title title="Choose Your Location" fontSize="1.6rem" />
          {/* implementing map on the checkout page */}
          <Map
            location={order.addressLatLng}
            onChange={latlng => {
              console.log(latlng);
              setOrder({ ...order, addressLatLng: latlng });
            }}
          />
        </div>
{/* button container */}
        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
            <Button
              type="submit"
              text="Proceed to Payment"
              width="100%"
              height="3rem"
            />
          </div>
        </div>
      </form>
    </>
  );
}