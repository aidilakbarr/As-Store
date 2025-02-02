import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY;

interface User {
  id: string;
  name: string;
  email: string;
}

if (!secretKey) {
  throw new Error("Secret key tidak di temukan");
}

const createAccessToken = (user: User) => {
  const payload = {
    id: user.id,
    username: user.name,
    email: user.email,
  };
  const option = {
    expiresIn: 60,
  };
  return jwt.sign(payload, secretKey, option);
};

const verifyAccessToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error("token tidak valid", error);
    return null;
  }
};

export { createAccessToken, verifyAccessToken };
