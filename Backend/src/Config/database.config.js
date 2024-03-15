import { connect, set } from 'mongoose';
import { UserModel } from '../models/user.model.js';
import { FoodModel } from '../models/food.model.js';
import { sample_users } from '../data.js';
import { sample_foods } from '../data.js';

import bcrypt from 'bcryptjs';
// hashing data and the number of rounds of hashing argument constants
const PASSWORD_HASH_SALT_ROUNDS = 10;
// to allow mongoose to use the schema of the models strictly
set('strictQuery', true);
// dbconnect function
export const dbconnect = async () => {
  try {
    connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // calling seeduser and seed food functions
    await seedUsers();
    await seedFoods();
    console.log('connect successfully---');
  } catch (error) {
    console.log(error);
  }
};

//function for seeding the users 
async function seedUsers() {
  const usersCount = await UserModel.countDocuments();
//   if there is already data in the user model then the seed has already been done
  if (usersCount > 0) {
    console.log('Users seed is already done!');
    return;
  }
// look through all users and parsing the requested user
  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await UserModel.create(user);
  }
// output message
  console.log('Users seed is done!');
}
// food seeding function
async function seedFoods() {
  const foods = await FoodModel.countDocuments();
  if (foods > 0) {
    console.log('Foods seed is already done!');
    return;
  }

  for (const food of sample_foods) {
    food.imageUrl = `/foods/${food.imageUrl}`;
    await FoodModel.create(food);
  }

  console.log('Foods seed Is Done!');
}