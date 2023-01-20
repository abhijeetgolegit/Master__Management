const express = require("express");
const {
  getSkillGroupAll,
  getSearchSkillGroup,
  getSkillGroupBySkillId,
  postAddSkillGroup,
  updateSkillGroup,
  updateSkillGroupIsAction,
  deleteSkillGroup,
  getSkillGroupById,
  getAllSkillGroups,
} = require("../controller/skillGroupController");

const router = express.Router();

router.get("/all", getSkillGroupAll);
router.get("/allskill", getAllSkillGroups);
router.get("/", getSearchSkillGroup);
router.get("/:id", getSkillGroupBySkillId);
router.get("/role-id/:id", getSkillGroupBySkillId);
router.post("/", postAddSkillGroup);
router.put("/:id", updateSkillGroup);
router.put("/isAction/:id", updateSkillGroupIsAction);
router.delete("/:id", deleteSkillGroup);

module.exports = router;
