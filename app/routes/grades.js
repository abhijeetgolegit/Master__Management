const express = require("express");
const {
  postAddGrade,
  getGrades,
  deleteGrade,
  updateGrade,
  getGradeById,
  getAllGrades,
  updateGradeIsAction,
  getAllGrade,
} = require("../controller/gradeController");

const router = express.Router();

router.get("/all", getAllGrade);
router.get("/all-grade", getAllGrades);
router.get("/", getGrades);
router.get("/:id", getGradeById);
router.post("/", postAddGrade);
router.put("/:id", updateGrade);
router.put("/isAction/:id", updateGradeIsAction);
router.delete("/:id", deleteGrade);

module.exports = router;
