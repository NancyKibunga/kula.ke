import { Router } from "express";
import { sample_foods,sample_tags } from "../data.js";
import { route } from "express/lib/application.js";

const router = Router();
// food router in express
router.get('/', (req, res) => {
    res.send(sample_foods);
});

router.get('/tags', (req, res) => {
    res.send(sample_tags);
});

router.get('/search/:searchTerm', (req, res) => {
    const{ searchTerm } = req.params;
    const foods = sample_foods.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
);
res.send(foods);
});
router.get('/tag/:tag', (req, res) => {
    const {tag} = req.params;
    const foods = sample_foods.filter(item => 
        item.tags?.includes(tag));
        res.send(foods)
    });




export default router;