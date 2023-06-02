import prisma from "../db";
import { comparePasswords, createJwt, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  try {
    const hashValue = await hashPassword(req.body.password);
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashValue,
      },
    });
    const token = createJwt(user);

    res.json({ token });
  } catch (e) {
    e.type = "input";
    next(e);
    // console.error("Create User Error:", e.message);
    // res.status(500);
    // res.json({
    //   message: "Server Error",
    // });
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    const isValid = await comparePasswords(req.body.password, user.password);
    if (!isValid) {
      res.status(401);
      res.json({ message: "Invalid Credentials" });
      return;
    }
    const token = createJwt({
      id: user.id,
      username: user.username,
    });
    res.json({
      token,
    });
  } catch (e) {
    console.error("Signin Error:", e.message);
    next(e);
  }
};
