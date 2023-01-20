const express = require("express");
const {
  getPanelTypes,
  postAddPanelTypes,
  deletePanelType,
  updatePanelType,
  getPanelTypeById,
  getAllPanelTypes,
  updatePanelTypeIsAction,
  getAllPanelType,
} = require("../controller/panelTypeController");

const router = express.Router();

router.get("/all", getAllPanelType);
router.get("/all-panel-type", getAllPanelTypes);
router.get("/", getPanelTypes);
router.get("/:id", getPanelTypeById);
router.post("/", postAddPanelTypes);
router.put("/:id", updatePanelType);
router.put("/isAction/:id", updatePanelTypeIsAction);
router.delete("/:id", deletePanelType);

module.exports = router;
