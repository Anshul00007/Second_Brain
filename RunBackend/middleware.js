import { JWT_PASSWORD } from "./secrets.js";
import jwt from "jsonwebtoken";
export default function Userauth(req, res, next) {
    const token = req.headers["token"];
    if (!token) {
        res.status(400).json({
            message: "token is empty!!"
        });
    }
    const decode = jwt.verify(token, JWT_PASSWORD);
    try {
        if (decode) {
            req.userId = decode.id;
            next();
        }
    }
    catch (e) {
        return res.status(403).json({
            message: "You are not signed in!!"
        });
    }
}
