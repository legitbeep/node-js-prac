import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface IUserData {
  id: string;
  username: string;
}

export const createJwt = (user: IUserData) => {
  const token = jwt.sign(
    {
      ...user,
    },
    process.env.JWT_SECRET
  );

  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({
      message: "Unauthorized",
    });
    return;
  }

  const [, token] = bearer.split(" "); // Bearer token
  if (!token) {
    res.status(401);
    res.json({
      message: "Unauthorized",
    });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401);
    res.json({
      message: "Unauthorized",
    });
    return;
  }
};

export const comparePasswords = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};
