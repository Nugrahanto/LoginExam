import Users from "../models/userModels.js";
import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.sendStatus(401);
    } else {
      const user = await Users.findAll({
        where: {
          refresh_token: refreshToken
        }
      });
      if (!user[0]) {
        return res.sendStatus(403);
      } else {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
          if (err) {
            return res.sendStatus(403);
          } else {
            const userId = user[0].id;
            const username = user[0].username;
            const email = user[0].email;
            const accessToken = jwt.sign({userId, username, email}, process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: '30s'
            });
            res.json({ accessToken });
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}