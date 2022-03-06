import prisma from '../prisma';

const createUser = async (email, hashedPw, nickname) => {
  return await prisma.$queryRaw(`
    INSERT INTO users (email, password, nickname) VALUES ('${email}, ${hashedPw}, ${nickname}')
  `);
};

const findUserByEmail = async (email) => {
  return await prisma.$queryRaw(`
    SELECT email FROM users WHERE email='${email}'
  `);
};

const findUserByNickname = async (nickname) => {
  return await prisma.$queryRaw(`
    SELECT email FROM users WHERE nickname='${nickname}'
  `);
}

export default { createUser, findUserByEmail, findUserByNickname };