import { UserDao } from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { JWT_SECRET_KEY } = process.env;

const signUp = async (email, password, nickname) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPw = await bcrypt.hash(password, salt);

  const existingUserByEmail = await UserDao.findUserByEmail(email);
  const existingUserByNickname = await UserDao.findUserByNickname(nickname);

  if (existingUserByEmail) {
    const error = new Error('EMAIL_ALREADY_IN_USE_EMAIL');
    error.statusCode = 409;
    throw error;
  } else if (existingUserByNickname) {
    const error = new Error('EMAIL_ALREADY_IN_USE_NICKNAME');
    error.statusCode = 409;
    throw error;
  }

  return await UserDao.createUser(email, hashedPw, nickname);
};

const logIn = async (email, password) => {
  const userInfo = await UserDao.findUserByEmail(email);
  let err;

  if (userInfo === null) {
    err = new Error('INVALID_USER');
    err.statusCode = 400;
    throw err;
  }

  const { id, password: hashedPassword} = userInfo;
  const isMatch = await bcrypt.compare(password, hashedPassword);

  if (!isMatch) {
    err = new Error('INVALID_USER');
    err.statusCode = 400;
    throw err;
  }

  const accessToken = jwt.sign({ id }, JWT_SECRET_KEY, {
    expiresIn: '1h'
  });

  return accessToken;
};

export default { signUp, logIn };