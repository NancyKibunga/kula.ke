import { Router } from 'express';
import { sample_users } from '../data.js';
import jwt from 'jsonwebtoken';

const router = Router();

import { BAD_REQUEST } from '../constants/httpStatus.js';

// checks whether the user is available by matching the email and password from the database
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = sample_users.find(
    user => user.email === email && user.password === password
  );
// generating encoded pattern using json web token
  if (user) {
    res.send(generateTokenResponse(user));
    return;
  }
// for an invalid user
  res.status(BAD_REQUEST).send('Username or password is invalid');
});

const generateTokenResponse = user => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    'arandomtext',
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