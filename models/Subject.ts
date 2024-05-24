// models/Document.ts
import { Schema, model, models } from "mongoose";

export interface ISubject {
  document_name: string;
  file_link: string;
  subject_name: string;
}

const SubjectSchema = new Schema<ISubject>(
  {
    document_name: {
      type: String,
      required: true,
    },
    file_link: {
      type: String,
      required: true,
    },
    subject_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
        versionKey: false,
        virtuals: true,
        transform: (_, ret) => {
            delete ret._id;
        },
    },
},
);

export default models.Subject || model<ISubject>("Subject", SubjectSchema);
