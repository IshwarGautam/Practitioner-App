"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiConfig_1 = require("../apiConfig");
const ACCESS_TOKEN = apiConfig_1.ACCESS_TOKEN_SECRET_KEY;
const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            jsonwebtoken_1.default.verify(token, ACCESS_TOKEN, (err) => {
                if (!err) {
                    next();
                }
                else if (err.message === "jwt expired") {
                    return res.status(401).json({ message: "Access Token expired." });
                }
                else {
                    return res.status(500).json({ message: err });
                }
            });
        }
        else {
            return res.status(401).json({ message: "Unauthorized User" });
        }
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized User" });
    }
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map