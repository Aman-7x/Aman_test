// File: studyMaterialRoutes.js (Routes)
import express from "express";
import {
  addStudyMaterial,
  deleteStudyMaterial,
  getAllStudyMaterials,
  getStudyMaterialByUserId,
  updateStudyMaterial,
} from "../controllers/studyMaterialController.js";
import upload from "../middlewares/fileupload.js";

const studyMaterialRouter = express.Router();

studyMaterialRouter.get("/", getAllStudyMaterials);
studyMaterialRouter.post("/add", upload.single("pdf"), addStudyMaterial); // Use multer for file upload
studyMaterialRouter.get("/user/:id", getStudyMaterialByUserId); // Fetch by user ID
studyMaterialRouter.put("/update/:id", updateStudyMaterial);
studyMaterialRouter.delete("/:id", deleteStudyMaterial);

export default studyMaterialRouter;
