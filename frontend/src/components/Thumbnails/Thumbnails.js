import React from 'react'
import { Link } from 'react-router-dom'
import classes from './thumbnails.module.css'
import StarRating from '../StarRating/StarRating'
import Price from '../Price/Price'

export default function Thumbnails({foods}) {
  //food image insertion 
  return (
    <ul className={classes.list}>
        {foods.map(food => (
            <li key ={food.id}>
                <Link to={`/food/${food.id}`}>
                    <img
                    className={classes.image}
                    src={`/foods/${food.imageUrl}`}
                    alt={food.name}
                    />
                    {/* favorite foods */}
                <div className={classes.content}>
                    <div className={classes.name}>{food.name}</div>
                    <span
                    className={`${classes.favorite} ${
                        food.favorite ? '' : classes.not
                      }`}
                    >
                      ❤
                    </span>
                    {/* star rating */}
                    <div className={classes.stars}>
                        <StarRating stars= {food.stars} />
                    </div>
                    <div className={classes.product_item_footer}>
{/* the food vendor */}
                <div className={classes.vendor}>
                  {food.vendor.map(vendor => (
                    <span key={vendor}>{vendor}</span>
                  ))}
                </div>
{/* cooktime */}
                <div className={classes.cook_time}>
                  <span>🕒</span>
                  {food.cookTime}
                </div>
              </div>
{/* price */}

              <div className={classes.price}>
                <Price price={food.price} />
              </div>
                </div>
                </Link>
            </li>
        ))}
    </ul>
  )
}
