import mongoose from "mongoose";

const PractitionerSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export const practitionerModel = mongoose.model(
  "Practitioner",
  PractitionerSchema
);
