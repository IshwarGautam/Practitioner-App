import express from "express";
import { auth } from "../middlewares/auth";
import {
  get,
  add,
  getAll,
  remove,
  update,
} from "../controllers/practitioner.controller";
import { validation } from "../middlewares/validation";

const practitionerRouter = express.Router();

/**
 * @openapi
 * components:
 *  schemas:
 *    PractitionerInput:
 *      type: object
 *      required:
 *        - fullName
 *        - email
 *        - contact
 *        - dob
 *        - workingDays
 *        - startTime
 *        - endTime
 *      properties:
 *        fullName:
 *          type: string
 *          default: Martin Luthar
 *        email:
 *          type: string
 *          default: martin@example1.com
 *        contact:
 *          type: number
 *          default: 9811122233
 *        dob:
 *          type: string
 *          default: 2022-12-08
 *        workingDays:
 *          type: number
 *          default: 5
 *        startTime:
 *          type: string
 *          default:  09:00
 *        endTime:
 *          type: string
 *          default: 18:00
 *    PractitionerResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        fullName:
 *          type: string
 *        email:
 *          type: string
 *        contact:
 *          type: number
 *        dob:
 *          type: string
 *        workingDays:
 *          type: number
 *        startTime:
 *          type: string
 *        endTime:
 *          type: string
 */

/**
 * @openapi
 * /practitioner:
 *  get:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *    - Practitioner
 *    summary: Get all the practitioners details
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized User
 *      500:
 *        description: Internal Server Error
 */
practitionerRouter.get("/", auth, getAll);

/**
 * @openapi
 * /practitioner/form/{practitioner_id}:
 *  get:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *    - Practitioner
 *    summary: Get a single practitioner detail
 *    parameters:
 *      - name: practitioner_id
 *        in: path
 *        description: The id of the practitioner
 *        required: true
 *    responses:
 *      202:
 *        description: Success
 *      401:
 *        description: Unauthorized User
 *      500:
 *        description: Internal Server Error
 */
practitionerRouter.get("/form/:practitioner_id", auth, get);

/**
 * @openapi
 * /practitioner:
 *  post:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *    - Practitioner
 *    summary: Add a practitioner
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PractitionerInput'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PractitionerResponse'
 *      401:
 *        description: Unauthorized User
 *      409:
 *        description: Conflict - Practitioner already exist
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Internal Server Error
 */
practitionerRouter.post("/", auth, validation, add);

/**
 * @openapi
 * /practitioner/{practitioner_id}:
 *  delete:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *    - Practitioner
 *    summary: Delete a practitioner
 *    parameters:
 *      - name: practitioner_id
 *        in: path
 *        description: The id of the practitioner to be deleted
 *        required: true
 *    responses:
 *      202:
 *        description: Success
 *      401:
 *        description: Unauthorized User
 *      500:
 *        description: Internal Server Error
 */
practitionerRouter.delete("/:practitioner_id", auth, remove);

/**
 * @openapi
 * /practitioner/{practitioner_id}:
 *  put:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *    - Practitioner
 *    summary: Update a practitioner detail
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PractitionerInput'
 *    parameters:
 *      - name: practitioner_id
 *        in: path
 *        description: The id of the practitioner to be updated
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized User
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Internal Server Error
 */
practitionerRouter.put("/:practitioner_id", auth, validation, update);

export default practitionerRouter;
