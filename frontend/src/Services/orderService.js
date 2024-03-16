import axios from 'axios';

// create order function
export const createOrder = async order => {
  try {
    const { data } = await axios.post('/api/orders/create', order);
    return data;
} catch (error) {}
};
// calling api for getting a new order from current user and returning the data
export const getNewOrderForCurrentUser = async () => {
  const { data } = await axios.get('/api/orders/newOrderForCurrentUser');
  return data;
};
// function to make the payment
export const pay = async paymentId => {
  try {
    const { data } = await axios.put('/api/orders/pay', { paymentId });
    return data;
  } catch (error) {}
};

// calling the order api 
export const trackOrderById = async orderId => {
  const { data } = await axios.get('/api/orders/track/' + orderId);
  return data;
};