"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const validation_1 = require("../middlewares/validation");
const token_controller_1 = require("../controllers/token.controller");
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
/**
 * @openapi
 * components:
 *  schemas:
 *    UserSignInInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: martin@example1.com
 *        password:
 *          type: string
 *          default: your-password
 *    UserResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        token:
 *          type: string
 */
/**
 * @openapi
 * components:
 *  schemas:
 *    UserSignUpInput:
 *      type: object
 *      required:
 *        - username
 *        - email
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: Martin Luthar
 *        email:
 *          type: string
 *          default: martin@example1.com
 *        password:
 *          type: string
 *          default: your-password
 */
/**
 * @openapi
 * /users/signup:
 *  post:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *    - User
 *    summary: Register a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSignUpInput'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserResponse'
 *      409:
 *        description: User already exist
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Internal Server Error
 */
userRouter.post("/signup", validation_1.validation, user_controller_1.signup);
/**
 * @openapi
 * /users/signin:
 *  post:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *    - User
 *    summary: Login user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSignInInput'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserResponse'
 *      400:
 *        description: Invalid credentials
 *      404:
 *        description: User not found
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Internal Server Error
 */
userRouter.post("/signin", validation_1.validation, user_controller_1.signin);
/**
 * @openapi
 * /users:
 *  get:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *    - User
 *    summary: Get all the Users
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized User
 *      500:
 *        description: Internal Server Error
 */
userRouter.get("/", auth_1.auth, user_controller_1.get);
/**
 * @openapi
 * /users/delete:
 *  delete:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *    - User
 *    summary: Delete a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - userid
 *              - username
 *              - password
 *            properties:
 *              userid:
 *                type: string
 *                default: '123456'
 *              username:
 *                type: string
 *                default: 'ADMIN-UserName'
 *              password:
 *                type: string
 *                default: 'ADMIN-Password'
 *    responses:
 *      202:
 *        description: Success
 *      400:
 *        description: Invalid (Username or password incorrect)
 *      401:
 *        description: Unauthorized User
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Internal Server Error
 */
userRouter.delete("/delete", auth_1.auth, validation_1.validation, user_controller_1.unpublish);
/**
 * @openapi
 * /users/refreshToken:
 *  get:
 *    tags:
 *    - Token
 *    summary: Get a new access token
 *    description: Note- Refresh token should be there in the cookie
 *    responses:
 *      200:
 *        description: Success
 *      403:
 *        description: Invalid refresh token (or, Cookie is not set)
 */
userRouter.get("/refreshToken", token_controller_1.refresh);
/**
 * @openapi
 * /users/removeToken:
 *  get:
 *    tags:
 *    - Token
 *    summary: Clear a cookie
 *    responses:
 *      200:
 *        description: Success
 *      500:
 *        description: Bad request
 */
userRouter.get("/removeToken", token_controller_1.remove);
/**
 * @openapi
 * /users/forgetPassword:
 *  post:
 *    tags:
 *    - User
 *    summary: Send a reset password link in the mail
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              email:
 *                type: string
 *                default: 'jonedoe@gmail.com'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Email doesn't exist in the database
 *      500:
 *        description: Internal Server Error
 */
userRouter.post("/forgetPassword", user_controller_1.forgetPassword);
/**
 * @openapi
 * /users/resetPassword:
 *  post:
 *    tags:
 *    - User
 *    summary: Change a password
 *    parameters:
 *      - name: token
 *        in: query
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - password
 *            properties:
 *              password:
 *                type: string
 *                default: 'newPassword'
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Invalid token
 *      500:
 *        description: Internal Server Error
 */
userRouter.post("/resetPassword", user_controller_1.resetPassword);
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map