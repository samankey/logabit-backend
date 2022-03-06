import prisma from '../prisma';

const createUser = async (nickname, email, hashedPw) => {
  return await prisma.user.create({
    data: {
      nickname,
      email,
      password: `${hashedPw}`
    }
  });
};

const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email
    }
  });
};

const findUserByNickname = async (nickname) => {
  return await prisma.user.findUnique({
    where: {
      nickname
    }
  })
}

export default { createUser, findUserByEmail, findUserByNickname };