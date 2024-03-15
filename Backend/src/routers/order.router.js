import { Router } from 'express';
import handler from 'express-async-handler';
import auth from '../middleware/auth.mid.js';
import { BAD_REQUEST } from '../constants/httpStatus.js';
import { OrderModel } from '../models/order.model.js';
import { OrderStatus } from '../constants/orderStatus.js';

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

export default router;