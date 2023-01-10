"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.practitionerModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PractitionerSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    workingDays: {
        type: Number,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    icuSpecialist: {
        type: Boolean,
    },
    assetUrl: {
        type: String,
    },
}, { timestamps: true });
exports.practitionerModel = mongoose_1.default.model("Practitioner", PractitionerSchema);
//# sourceMappingURL=practitioner.model.js.map