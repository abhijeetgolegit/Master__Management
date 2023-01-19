const express = require("express");
const {
  getRoles,
  postAddRoles,
  deleteRole,
  updateRole,
  getSearchRole,
  getRoleById,
  updateRoleIsAction,
  getRoleByRoleId,
  getAllRoles,
} = require("../controller/roleController");
const router = express.Router();

router.get("/all", getRoles);
router.get("/all-role", getAllRoles);
router.get("/", getSearchRole);
router.get("/:id", getRoleById);
router.get("/role-id/:id", getRoleByRoleId);
router.post("/", postAddRoles);
router.put("/:id", updateRole);
router.put("/isAction/:id", updateRoleIsAction);
router.delete("/:id", deleteRole);

module.exports = router;
