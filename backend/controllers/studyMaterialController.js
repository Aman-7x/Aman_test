
// File: studyMaterialController.js (Controller)
import StudyMaterial from "../models/StudyMaterial.js";
import path from "path";
import fs from "fs";

// Add a New Study Material (PDF)
export const addStudyMaterial = async (req, res, next) => {
  const { title, description, user } = req.body;
  const pdf = req.file; // This will be the uploaded PDF file

  if (!pdf) {
    return res.status(400).json({ message: "PDF file is required." });
  }

  const filePath = path.join("uploads", pdf.filename); // Path where PDF is stored

  const studyMaterial = new StudyMaterial({
    title,
    description,
    pdf: filePath,
    user,
  });

  try {
    await studyMaterial.save();
    return res.status(201).json({ studyMaterial });
  } catch (err) {
    return res.status(500).json({ message: "Error creating study material." });
  }
};

// Get All Study Materials
export const getAllStudyMaterials = async (req, res, next) => {
  let studyMaterials;
  try {
    studyMaterials = await StudyMaterial.find().populate("user");
  } catch (err) {
    return res.status(500).json({ message: "Fetching study materials failed." });
  }
  if (!studyMaterials || studyMaterials.length === 0) {
    return res.status(404).json({ message: "No Study Materials Found." });
  }
  return res.status(200).json({ studyMaterials });
};

// Get Study Materials by User ID
export const getStudyMaterialByUserId = async (req, res, next) => {
  const userId = req.params.id;

  let studyMaterials;
  try {
    studyMaterials = await StudyMaterial.find({ user: userId }).populate("user");
  } catch (err) {
    return res.status(500).json({ message: "Error fetching study materials." });
  }

  if (!studyMaterials || studyMaterials.length === 0) {
    return res.status(404).json({ message: "No Study Materials Found for this User." });
  }

  return res.status(200).json({ studyMaterials });
};

// Update Study Material
export const updateStudyMaterial = async (req, res, next) => {
  const { title, description } = req.body;
  const materialId = req.params.id;

  let studyMaterial;
  try {
    studyMaterial = await StudyMaterial.findByIdAndUpdate(
      materialId,
      { title, description },
      { new: true }
    );
  } catch (err) {
    return res.status(500).json({ message: "Error updating study material." });
  }

  if (!studyMaterial) {
    return res.status(404).json({ message: "Study material not found." });
  }

  return res.status(200).json({ studyMaterial });
};

// Delete Study Material
export const deleteStudyMaterial = async (req, res, next) => {
  const materialId = req.params.id;

  let studyMaterial;
  try {
    studyMaterial = await StudyMaterial.findByIdAndDelete(materialId);
    if (studyMaterial && studyMaterial.pdf) {
      fs.unlinkSync(studyMaterial.pdf); // Delete the PDF file
    }
  } catch (err) {
    return res.status(500).json({ message: "Error deleting study material." });
  }

  if (!studyMaterial) {
    return res.status(404).json({ message: "Study material not found." });
  }

  return res.status(200).json({ message: "Successfully deleted study material." });
};
