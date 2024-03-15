import { Router } from "express";
import { FoodModel } from "../models/food.model";
import handler from "express-async-handler";

const router = Router();
// the root api for this router, when calles, it outputs the food model
router.get('/', handler(async (req, res) => {
    const foods = await FoodModel.find({});
    res.send(foods);
  })
);
// gets the food tags
router.get('/tags', handler(async (req, res) => {
    const tags = await FoodModel.aggregate([
      {
        // make the foods flat
        $unwind: '$tags',
      },
      {
        // group the tags with a tag id and gives the count of foods with a tad
        $group: {
          _id: '$tags',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: '$count',
        },
      },
    //  sorts the tags based on the count
    ]).sort({ count: -1 });

    // outputs all foods
    const all = {
      name: 'All',
      count: await FoodModel.countDocuments(),
    };
// unshift adds the item to the beginning of the array
    tags.unshift(all);

    res.send(tags);
  })
);

// search api for when we serach for food
router.get('/search/:searchTerm',handler(async (req, res) => {
    const { searchTerm } = req.params;
    // case insesitive
    const searchRegex = new RegExp(searchTerm, 'i');

    const foods = await FoodModel.find({ name: { $regex: searchRegex } });
    res.send(foods);
  })
);

// finding foods based on the tags
router.get('/tag/:tag', handler(async (req, res) => {
    const { tag } = req.params;
    const foods = await FoodModel.find({ tags: tag });
    res.send(foods);
  })
);
// finding foods based on the foodId
router.get('/:foodId', handler(async (req, res) => {
    const { foodId } = req.params;
    const food = await FoodModel.findById(foodId);
    res.send(food);
  })
);

export default router;