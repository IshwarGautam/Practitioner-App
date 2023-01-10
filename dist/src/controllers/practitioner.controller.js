"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.get = exports.remove = exports.update = exports.add = void 0;
const practitioner_service_1 = require("../services/practitioner.service");
/**
 * Function to handle add practitioner
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
const add = async (req, res) => {
    const response = await (0, practitioner_service_1.addPractitioner)(req.body);
    return res.status(response.status).json(response.data);
};
exports.add = add;
/**
 * Function to handle update practitioner
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
const update = async (req, res) => {
    const id = req.params.practitioner_id;
    const response = await (0, practitioner_service_1.updatePractitioner)(req.body, id);
    return res.status(response.status).json(response.data);
};
exports.update = update;
/**
 * Function to handle delete practitioner
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
const remove = async (req, res) => {
    const id = req.params.practitioner_id;
    const response = await (0, practitioner_service_1.deletePractitioner)(id);
    return res.status(response.status).json(response.data);
};
exports.remove = remove;
/**
 * Function to handle get practitioner
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
const get = async (req, res) => {
    const id = req.params.practitioner_id;
    const response = await (0, practitioner_service_1.getPractitioner)(id);
    return res.status(response.status).json(response.data);
};
exports.get = get;
/**
 * Function to handle get all practitioners
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
const getAll = async (req, res) => {
    const response = await (0, practitioner_service_1.getAllPractitioner)();
    return res.status(response.status).json(response.data);
};
exports.getAll = getAll;
//# sourceMappingURL=practitioner.controller.js.map