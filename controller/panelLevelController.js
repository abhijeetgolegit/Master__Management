const { request } = require("express");
const PanelLevel = require("../models/panelLevel");

module.exports.getAllPanelLevel = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 3;

  try {
    const totalItems =
      await PanelLevel.find().countDocuments();

    const panelLevels = await PanelLevel.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: "get all the panel level",
      role: panelLevels,
      totalItems,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getAllPanelLevels = async (req, res) => {
  try {
    const panelLevels = await PanelLevel.find();

    res.status(200).json({
      message: "get all the panel level",
      role: panelLevels,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getPanelLevelById = async (req, res) => {
  const id = req.params.id;
  try {
    const panelLevel = await PanelLevel.findById(id);

    res.status(200).json(panelLevel);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getPanel = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 3;
  const panelLevelId = req.query.panelLevelId;
  const panelLevelName = req.query.panelLevelName;

  try {
    if (!panelLevelId && !panelLevelName) {
      return res
        .status(404)
        .json({ err: "Please Enter the Search Value" });
    }

    if (panelLevelId || panelLevelName) {
      const totalItems = await PanelLevel.find({
        $or: [
          { panel_level_id: panelLevelId },
          { panel_level: panelLevelName },
        ],
      }).countDocuments();

      const panelLevel = await PanelLevel.find({
        $or: [
          { panel_level_id: panelLevelId },
          { panel_level: panelLevelName },
        ],
      })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
      return res.status(200).json({
        message: "Successfully Getting Panel Level",
        role: panelLevel,
        totalItems,
        user: req.user,
      });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.postAddPanel = async (req, res) => {
  const panel_level = req.body.panel_level;
  const roleData = req.role_data;
  const user = req.user;

  try {
    const panelLevels = await PanelLevel.find();

    if (!panel_level) {
      return res.status(404).json({ err: "Invalid Input" });
    }

    if (!user) {
      return res
        .status(403)
        .json({ err: "You cannot create a role" });
    }

    if (roleData.role_name !== "practice head") {
      return res
        .status(403)
        .json({ err: "You cannot add Roles" });
    }

    if (
      panelLevels.find(
        (panelLevel) =>
          panelLevel.panel_level === panel_level,
      )
    ) {
      return res
        .status(404)
        .json({ err: "Panel Level is already Exists" });
    }

    const newPanelLevel = new PanelLevel({
      panel_level,
      created_by: user.name,
      updated_by: "",
      deleted_by: "",
      is_deleted: true,
    });

    // admins.push(demoPanel);
    await newPanelLevel.save();
    res.status(200).json(newPanelLevel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updatePanelLevel = async (req, res) => {
  const id = req.params.id;
  const updatedPanelLevel = req.body.panel_level;

  try {
    const updatePanelLevel = await PanelLevel.findOne({
      panel_level_id: id,
    });

    updatePanelLevel.panel_level = updatedPanelLevel;
    updatePanelLevel.is_deleted =
      updatePanelLevel.is_deleted;

    updatePanelLevel.save();

    res.status(200).json({
      message: "Successfully updated",
      updatePanelLevel,
    });

    // panelLevel.remove();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updatePanelLevelIsAction = async (
  req,
  res,
) => {
  const id = req.params.id;

  try {
    const updatePanelLevel = await PanelLevel.findOne({
      panel_level_id: id,
    });

    updatePanelLevel.panel_level =
      updatePanelLevel.panel_level;
    updatePanelLevel.is_deleted =
      !updatePanelLevel.is_deleted;

    console.log("hi");

    updatePanelLevel.save();

    res.status(200).json({
      message: "Successfully updated",
      updatePanelLevel,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deletePanel = async (req, res) => {
  const id = req.params.id;
  try {
    await PanelLevel.findOneAndDelete({
      panel_level_id: id,
    });

    res
      .status(200)
      .json({ message: "Successfully deleted" });

    // panelLevel.remove();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
