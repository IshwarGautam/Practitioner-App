import {
  addPractitioner,
  getPractitioner,
  updatePractitioner,
  deletePractitioner,
  getAllPractitioner,
} from "../services/practitioner.service";
import { Request, Response } from "express";

/**
 * Function to handle add practitioner
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const add = async (req: Request, res: Response) => {
  const response = await addPractitioner(req.body);

  return res.status(response.status).json(response.data);
};

/**
 * Function to handle update practitioner
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const update = async (req: Request, res: Response) => {
  const id = req.params.practitioner_id;

  const response = await updatePractitioner(req.body, id);

  return res.status(response.status).json(response.data);
};

/**
 * Function to handle delete practitioner
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const remove = async (req: Request, res: Response) => {
  const id = req.params.practitioner_id;

  const response = await deletePractitioner(id);

  return res.status(response.status).json(response.data);
};

/**
 * Function to handle get practitioner
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const get = async (req: Request, res: Response) => {
  const id = req.params.practitioner_id;

  const response = await getPractitioner(id);

  return res.status(response.status).json(response.data);
};

/**
 * Function to handle get all practitioners
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const getAll = async (req: Request, res: Response) => {
  const response = await getAllPractitioner();

  return res.status(response.status).json(response.data);
};
