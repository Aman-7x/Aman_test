// File: StudyMaterial.js (Model)
import mongoose from "mongoose";

const studyMaterialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    pdf: { type: String, required: true }, // Path to the uploaded PDF
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who uploaded
  },
  { timestamps: true }
);

export default mongoose.model("StudyMaterial", studyMaterialSchema);
