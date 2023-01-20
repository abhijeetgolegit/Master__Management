const express = require("express");
const {
  getPanel,
  postAddPanel,
  deletePanel,
  updatePanelLevel,
  getPanelLevelById,
  getAllPanelLevels,
  updatePanelLevelIsAction,
  getAllPanelLevel,
} = require("../controller/panelLevelController");

const router = express.Router();

router.get("/all", getAllPanelLevel);
router.get("/all-panel-level", getAllPanelLevels);
router.get("/", getPanel);
router.get("/:id", getPanelLevelById);
router.post("/", postAddPanel);
router.put("/:id", updatePanelLevel);
router.put("/isAction/:id", updatePanelLevelIsAction);
router.delete("/:id", deletePanel);

module.exports = router;
