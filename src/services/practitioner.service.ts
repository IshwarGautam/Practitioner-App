import { HttpError, HttpSuccess } from "../utils/error";
import { practitionerModel } from "../models/practitioner.model";

type PractitionerType = {
  fullName: string;
  email: string;
  contact: Number;
  dob: string;
  workingDays: Number;
  startTime: string;
  endTime: string;
  icuSpecialist: boolean;
  assetUrl: string;
};

/**
 * Service for handling add practitioner
 *
 * @param payload PractitionerType
 * @returns {object}
 */
export const addPractitioner = async (payload: PractitionerType) => {
  const {
    fullName,
    email,
    contact,
    dob,
    workingDays,
    startTime,
    endTime,
    assetUrl,
  } = payload;

  const newPractitioner = new practitionerModel({
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
    const existingPractitioner = await practitionerModel.findOne({ email });

    if (existingPractitioner) {
      return HttpError.Conflict("Practitioner already exists.");
    }

    await newPractitioner.save();

    return HttpSuccess.Created(newPractitioner);
  } catch (error) {
    return HttpError.BadRequest("Something went wrong.");
  }
};

/**
 * Service for handling get practitioner
 *
 * @param id string | number
 * @returns {object}
 */
export const getPractitioner = async (id: string | number) => {
  try {
    const practitioner = await practitionerModel.find({ _id: id });

    return HttpSuccess.Accepted(practitioner);
  } catch (error) {
    return HttpError.BadRequest("Something went wrong.");
  }
};

/**
 * Service for handling get all practitioners
 *
 * @returns {object}
 */
export const getAllPractitioner = async () => {
  try {
    const practitioners = await practitionerModel.find();

    return HttpSuccess.OK(practitioners);
  } catch (error) {
    return HttpError.BadRequest("Something went wrong.");
  }
};

/**
 * Service for handling update practitioner
 *
 * @param payload PractitionerType
 * @param id string | number
 * @returns {object}
 */
export const updatePractitioner = async (
  payload: PractitionerType,
  id: string | number
) => {
  const {
    fullName,
    email,
    contact,
    dob,
    workingDays,
    startTime,
    endTime,
    icuSpecialist,
    assetUrl,
  } = payload;

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
    const existingPractitioner = await practitionerModel.find({ email });

    if (
      existingPractitioner.length &&
      (existingPractitioner.length === 2 ||
        existingPractitioner[0]._id.toString() !== id)
    ) {
      return HttpError.Conflict("Practitioner already exists.");
    }

    await practitionerModel.findByIdAndUpdate(id, newPractitioner, {
      new: true,
    });

    return HttpSuccess.OK(newPractitioner);
  } catch (error) {
    return HttpError.BadRequest("Something went wrong.");
  }
};

/**
 * Service for handling delete practitioner
 *
 * @param id string | number
 * @returns {object}
 */
export const deletePractitioner = async (id: string | number) => {
  try {
    const practitioner = await practitionerModel.findByIdAndRemove(id);

    return HttpSuccess.Accepted(practitioner!);
  } catch {
    return HttpError.BadRequest("Something went wrong.");
  }
};
