// unauthorise invalid tokens
import { verify } from 'jsonwebtoken';
import { UNAUTHORIZED } from '../constants/httpStatus.js';

export default (req, res, next) => {
    // get the token and verift that its not null or undefined then send unauthorised status
  const token = req.headers.access_token;
  if (!token) return res.status(UNAUTHORIZED).send();
// verify if the token is valid or not
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    res.status(UNAUTHORIZED).send();
  }

  return next();
};