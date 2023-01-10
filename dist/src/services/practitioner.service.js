"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePractitioner = exports.updatePractitioner = exports.getAllPractitioner = exports.getPractitioner = exports.addPractitioner = void 0;
const error_1 = require("../utils/error");
const practitioner_model_1 = require("../models/practitioner.model");
/**
 * Service for handling add practitioner
 *
 * @param payload PractitionerType
 * @returns {object}
 */
const addPractitioner = async (payload) => {
    const { fullName, email, contact, dob, workingDays, startTime, endTime, assetUrl, } = payload;
    const newPractitioner = new practitioner_model_1.practitionerModel({
        fullName,
        email,
        contact,
        dob,
        workingDays,
        startTime,
        endTime,
        assetUrl,
    });
    try {
        const existingPractitioner = await practitioner_model_1.practitionerModel.findOne({ email });
        if (existingPractitioner) {
            return error_1.HttpError.Conflict("Practitioner already exists.");
        }
        await newPractitioner.save();
        return error_1.HttpSuccess.Created(newPractitioner);
    }
    catch (error) {
        return error_1.HttpError.BadRequest("Something went wrong.");
    }
};
exports.addPractitioner = addPractitioner;
/**
 * Service for handling get practitioner
 *
 * @param id string | number
 * @returns {object}
 */
const getPractitioner = async (id) => {
    try {
        const practitioner = await practitioner_model_1.practitionerModel.find({ _id: id });
        return error_1.HttpSuccess.Accepted(practitioner);
    }
    catch (error) {
        return error_1.HttpError.BadRequest("Something went wrong.");
    }
};
exports.getPractitioner = getPractitioner;
/**
 * Service for handling get all practitioners
 *
 * @returns {object}
 */
const getAllPractitioner = async () => {
    try {
        const practitioners = await practitioner_model_1.practitionerModel.find();
        return error_1.HttpSuccess.OK(practitioners);
    }
    catch (error) {
        return error_1.HttpError.BadRequest("Something went wrong.");
    }
};
exports.getAllPractitioner = getAllPractitioner;
/**
 * Service for handling update practitioner
 *
 * @param payload PractitionerType
 * @param id string | number
 * @returns {object}
 */
const updatePractitioner = async (payload, id) => {
    const { fullName, email, contact, dob, workingDays, startTime, endTime, icuSpecialist, assetUrl, } = payload;
    const newPractitioner = {
        fullName,
        email,
        contact,
        dob,
        workingDays,
        startTime,
        endTime,
        icuSpecialist,
        assetUrl,
    };
    try {
        const existingPractitioner = await practitioner_model_1.practitionerModel.find({ email });
        if (existingPractitioner.length &&
            (existingPractitioner.length === 2 ||
                existingPractitioner[0]._id.toString() !== id)) {
            return error_1.HttpError.Conflict("Practitioner already exists.");
        }
        await practitioner_model_1.practitionerModel.findByIdAndUpdate(id, newPractitioner, {
            new: true,
        });
        return error_1.HttpSuccess.OK(newPractitioner);
    }
    catch (error) {
        return error_1.HttpError.BadRequest("Something went wrong.");
    }
};
exports.updatePractitioner = updatePractitioner;
/**
 * Service for handling delete practitioner
 *
 * @param id string | number
 * @returns {object}
 */
const deletePractitioner = async (id) => {
    try {
        const practitioner = await practitioner_model_1.practitionerModel.findByIdAndRemove(id);
        return error_1.HttpSuccess.Accepted(practitioner);
    }
    catch {
        return error_1.HttpError.BadRequest("Something went wrong.");
    }
};
exports.deletePractitioner = deletePractitioner;
//# sourceMappingURL=practitioner.service.js.map