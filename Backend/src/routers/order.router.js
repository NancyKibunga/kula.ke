import { Router } from 'express';
import handler from 'express-async-handler';
import auth from '../middleware/auth.mid.js';
import { BAD_REQUEST } from '../constants/httpStatus.js';
import { OrderModel } from '../models/order.model.js';
import { OrderStatus } from '../constants/orderStatus.js';
import { UserModel } from '../models/user.model.js';


const router = Router();
router.use(auth);

router.post(
  '/create',
  handler(async (req, res) => {
    const order = req.body;
// verify the order items length i.e if its empty then nothing to be purchased
    if (order.items.length <= 0) res.status(BAD_REQUEST).send('Cart Is Empty!');
// find the existing order and deletes it
    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });
// create a new order
    const newOrder = new OrderModel({ ...order, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
  })
);

// getting the new order and creating a function for it 
// put for updating existing data
router.put(
  '/pay',
  handler(async (req, res) => {
    const { paymentId } = req.body;
    const order = await getNewOrderForCurrentUser(req);
    // if order is not available
    if (!order) {
      res.status(BAD_REQUEST).send('Order Not Found!');
      return;
    }
// if order is available
    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
  })
);
// get the order id from request params and get the user from the database using the user id
router.get(
  '/track/:orderId',
  handler(async (req, res) => {
    const { orderId } = req.params;
    const user = await UserModel.findById(req.user.id);

    const filter = {
      _id: orderId,
    };
// for admin users to enable them to view all orders
    if (!user.isAdmin) {
      filter.user = user._id;
    }

    const order = await OrderModel.findOne(filter);

    if (!order) return res.send(UNAUTHORIZED);

    return res.send(order);
  })
);

// new order for current user
router.get(
  '/newOrderForCurrentUser',
  handler(async (req, res) => {
    const order = await getNewOrderForCurrentUser(req);
    if (order) res.send(order);
    else res.status(BAD_REQUEST).send();
  })
);
const getNewOrderForCurrentUser = async req =>
  await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });


  export default router;