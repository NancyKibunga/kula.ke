import React, { useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAll, getAllStatus } from '../../Services/orderService';
import classes from './ordersPage.module.css';
import Title from '../../components/Title/Title';
import DateTime from '../../components/DateTime/DateTime';
import Price from '../../components/Price/Price';
import NotFound from '../../components/NotFound/NotFound';

const initialState = {};
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'ALL_STATUS_FETCHED':
      return { ...state, allStatus: payload };
    case 'ORDERS_FETCHED':
      return { ...state, orders: payload };
    default:
      return state;
  }
};
// two reducers, one for all status another one for orders
export default function OrdersPage() {
  const [{ allStatus, orders }, dispatch] = useReducer(reducer, initialState);
// filtering orders
  const { filter } = useParams();

  useEffect(() => {
    // gets the status and dispatch an action
    getAllStatus().then(status => {
      dispatch({ type: 'ALL_STATUS_FETCHED', payload: status });
    });
    // gets the orders
    getAll(filter).then(orders => {
      dispatch({ type: 'ORDERS_FETCHED', payload: orders });
    });
  }, [filter]);

  return (
    <div className={classes.container}>
      <Title title="Orders" margin="1.5rem 0 0 .2rem" fontSize="1.9rem" />
{/* if the order state has value, we show the content */}
{/* if all status has value then it shows all the items that are equal to the requested state */}
      {allStatus && (
        <div className={classes.all_status}>
          <Link to="/orders" className={!filter ? classes.selected : ''}>
            All
          </Link>
          {allStatus.map(state => (
            <Link
              key={state}
              className={state === filter ? classes.selected : ''}
              to={`/orders/${state}`}
            >
              {state}
            </Link>
          ))}
        </div>
      )}
{/* not found display and action to follow for states with no items */}
      {orders?.length === 0 && (
        <NotFound
          linkRoute={filter ? '/orders' : '/'}
          linkText={filter ? 'Show All Orders' : 'Go To Home Page'}
        />
      )}

      {orders &&
        orders.map(order => (
          <div key={order.id} className={classes.order_summary}>
            <div className={classes.header}>
              <span>{order.id}</span>
              <span>
                <DateTime date={order.createdAt} />
              </span>
              <span>{order.status}</span>
            </div>
            {/* mapping the items into links and images */}
            <div className={classes.items}>
              {order.items.map(item => (
                <Link key={item.food.id} to={`/food/${item.food.id}`}>
                  <img src={item.food.imageUrl} alt={item.food.name} />
                </Link>
              ))}
            </div>
            {/* link to track your order */}
            <div className={classes.footer}>
              <div>
                <Link to={`/track/${order.id}`}>Show Order</Link>
              </div>
              <div>
                <span className={classes.price}>
                  <Price price={order.totalPrice} />
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}