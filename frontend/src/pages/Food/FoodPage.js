import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Price from '../../components/Price/Price';
import StarRating from '../../components/StarRating/StarRating';
import Tags from '../../components/Tags/Tags';
import classes from './foodPage.module.css';
import { getById } from '../../Services/foodService';
import { useCart } from '../../hooks/useCart';
import NotFound from '../../components/NotFound/NotFound';

export default function FoodPage() {
  const [food, setFood] = useState({});
  const { id } = useParams();
  const{ addToCart } = useCart();
const navigate = useNavigate();

// adds the item to the cart and opens the cartpage
  const handleAddToCart = () => {
    addToCart(food);
    navigate('/cart');
  };

  useEffect(() => {
    getById(id).then(setFood);
  }, [id]);
  return (
    <>
    {/* foodname */}
      {!food? (<NotFound message="Food Not Found!" linkText="Return to HomePage"/>) : (
        <div className={classes.container}>
          <img
            className={classes.image}
            src={`${food.imageUrl}`}
            alt={food.name}
          />
{/* favorite */}
          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>{food.name}</span>
              <span
                className={`${classes.favorite} ${
                  food.favorite ? '' : classes.not
                }`}
              >
                ❤
              </span>
            </div>
            {/* starrating */}
            <div className={classes.rating}>
              <StarRating stars={food.stars} size={25} />
            </div>
{/* food vendor */}
            <div className={classes.vendors}>
              {food.vendor?.map(vendor => (
                <span key={vendor}>{vendor}</span>
              ))}
            </div>
{/* food tags */}
            <div className={classes.tags}>
              {food.tags && (
                <Tags
                  tags={food.tags.map(tag => ({ name: tag }))}
                  forFoodPage={true}
                />
              )}
            </div>
{/* food cooktime */}
            <div className={classes.cook_time}>
              <span>
                Cook Time is about <strong>{food.cookTime}</strong> minutes
              </span>
            </div>
{/* food price */}
            <div className={classes.price}>
              <Price price={food.price} />
            </div>
{/* button to add food item to cart */}
            <button onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
      )}
    </>
  );
}