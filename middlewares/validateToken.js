// import jwt from 'jsonwebtoken';
// import { UserDao } from '../models';

// const { JWT_SECRET_KEY } = process.env;

// const validateToken = async (req, res, next) => {
//   try {
//     let token;
//     const bearerHeader = req.headers.authorization;

//     if (bearerHeader) {
//       [_, token] = req.headers.authorization.split(' ');
//     } else {
//       const err = new Error('TOKEN_REQUIRED');
//       err.statusCode = 401;
//       throw err;
//     }

//     const { id } = jwt.verify(token, JWT_SECRET_KEY);
//     const foundUser = await UserDao.findUserById(id);

//     if (!foundUser.length) {
//       const err = new Error('INVALID_USER');
//       err.statusCode = 400;
//       throw err;
//     }

//     req.foundUser = foundUser;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'INVALID_TOKEN' });
//   }
// };

// export default validateToken;
