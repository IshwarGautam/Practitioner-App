"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePractitioner = exports.validateAdmin = exports.validateSignin = exports.validateSignup = void 0;
const joi_1 = __importDefault(require("joi"));
const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });
const signupSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(5).required(),
});
const signinSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(5).required(),
});
const practitionerSchema = joi_1.default.object({
    fullName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    contact: joi_1.default.number().min(10).required(),
    dob: joi_1.default.date().required(),
    workingDays: joi_1.default.number().min(1).max(7).required(),
    startTime: joi_1.default.string()
        .regex(/^([0-9]{2})\:([0-9]{2})$/)
        .required(),
    endTime: joi_1.default.string()
        .regex(/^([0-9]{2})\:([0-9]{2})$/)
        .required(),
    icuSpecialist: joi_1.default.boolean(),
    assetUrl: joi_1.default.string(),
});
const adminSchema = joi_1.default.object({
    userid: joi_1.default.string().required(),
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.validateSignup = validator(signupSchema);
exports.validateSignin = validator(signinSchema);
exports.validateAdmin = validator(adminSchema);
exports.validatePractitioner = validator(practitionerSchema);
//# sourceMappingURL=validator.js.map