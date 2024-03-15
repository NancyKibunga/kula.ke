import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

import { BAD_REQUEST } from '../constants/httpStatus.js';
// for handling async data 
import handler from 'express-async-handler';
import { UserModel } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
const PASSWORD_HASH_SALT_ROUNDS = 10;

// checks whether the user is available by matching the email and password from the database
router.post(
  '/login',
  handler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
// generating encoded pattern using json web token that compares the user password and the hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.send(generateTokenResponse(user));
    return;
  }
// for an invalid user or details do not match
  res.status(BAD_REQUEST).send('Invalid Username or Password!');
})
);

// cretaing the register api 
router.post(
  '/register',
  handler(async (req, res) => {
    // get the user inputs from the request and check whether email already exists
    const { name, email, password, address } = req.body;
    const user = await UserModel.findOne({ email });
// checks if user already exists and outputs bad request directing the user to log in
if (user) {
  res.status(BAD_REQUEST).send('User already exists, please login!');
  return;
}
// hash the user password if user does not exist
const hashedPassword = await bcrypt.hash(password, PASSWORD_HASH_SALT_ROUNDS);
// create a new user object
const newUser = {
  name,
  email: email.toLowerCase(),
  password: hashedPassword,
  address,
};
// create new user by parsing new user object
const result = await UserModel.create(newUser);
res.send(generateTokenResponse(result));
})
);

const generateTokenResponse = user => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '15d',
    }
  );

//   data being sent to the user in frontend
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token,
  };
};

export default router;