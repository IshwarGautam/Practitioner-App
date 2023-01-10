"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_service_1 = require("../services/token.service");
jest.mock("jsonwebtoken");
describe("Refresh token", () => {
    it("should return status code of 403 on invalid refresh token.", () => {
        jsonwebtoken_1.default.verify.mockReturnValue({ err: true, user: {} });
        const invalidToken = "hdf87f";
        const response = (0, token_service_1.updateToken)(invalidToken);
        expect(response.status).toBe(403);
        expect(response.data.message).toBe("Invalid refresh token");
    });
    it("should return status code of 200 when refresh token is found.", () => {
        jsonwebtoken_1.default.verify.mockReturnValue({ err: false, user: {} });
        const validToken = "vfgf56";
        jsonwebtoken_1.default.sign.mockReturnValue("some_token");
        const response = (0, token_service_1.updateToken)(validToken);
        expect(response.status).toBe(200);
        expect(response.data.token).toBe("some_token");
    });
});
//# sourceMappingURL=refreshToken.test.js.map