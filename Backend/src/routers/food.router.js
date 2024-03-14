import { Router } from "express";
import { sample_foods, sample_tags } from "../data.js";

const router = Router();
// the root api for this router, when calles, it outputs the sample foods
router.get('/', (req, res) => {
    res.send(sample_foods);
});
// gets the food tags
router.get('/tags', (req, res) => {
    res.send(sample_tags);
});
// search api for when we serach for food
router.get('/search/:searchTerm', (req, res) => {
    const {searchTerm } = req.params;
    const foods = sample_foods.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    res.send(foods);
});

// finding foods based on the tags
router.get('/tag/:tag', (req, res) => {
    const { tag } = req.params;
    const foods = sample_foods.filter(item => item.tags?.includes(tag));
    res.send(foods);
  });
// finding foods based on the foodId
router.get('/:foodId', (req, res) => {
    const { foodId } = req.params;
    const food = sample_foods.find(item => item.id === foodId);
    res.send(food);
});

export default router;