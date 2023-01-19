const PanelType = require("../models/panelType");

module.exports.getAllPanelType = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 3;

  console.log("Hi");

  try {
    const totalItems =
      await PanelType.find().countDocuments();
    const panelType = await PanelType.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    console.log(totalItems);

    res
      .status(200)
      .json({ message: "", role: panelType, totalItems });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
};

module.exports.getAllPanelTypes = async (req, res) => {
  try {
    const panelType = await PanelType.find();

    res.status(200).json({ message: "", role: panelType });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getPanelTypeById = async (req, res) => {
  const id = req.params.id;
  try {
    const panelType = await PanelType.findById(id);

    res.status(200).json(panelType);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getPanelTypes = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 3;
  const panelTypeId = req.query.panelTypeId;
  const panelTypeName = req.query.panelTypeName;

  try {
    if (!panelTypeId && !panelTypeName) {
      return res
        .status(404)
        .json({ err: "Please Enter the Search Value" });
    }

    if (panelTypeId || panelTypeName) {
      const totalItems = await PanelType.find({
        $or: [
          { panel_type_id: panelTypeId },
          { panel_type_name: panelTypeName },
        ],
      }).countDocuments();

      const panelType = await PanelType.find({
        $or: [
          {
            panel_type_id: panelTypeId,
          },
          { panel_type_name: panelTypeName },
        ],
      })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);

      return res.status(200).json({
        message: "Successfully Getting PanelType",
        role: panelType,
        totalItems,
      });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.postAddPanelTypes = async (req, res) => {
  const panel_type_id = req.body.panel_type_id;
  const panel_type = req.body.panel_type;
  const roleData = req.role_data;
  const user = req.user;

  try {
    const panelTypes = await PanelType.find();

    if (!panel_type_id && !panel_type) {
      return res.status(404).json({ err: "Invalid Input" });
    }

    if (!user) {
      return res
        .status(403)
        .json({ err: "You cannot create a panel type" });
    }

    if (roleData.role_name !== "practice head") {
      return res
        .status(403)
        .json({ err: "You cannot add Panel types" });
    }

    if (panel_type_id.length !== 4) {
      return res
        .status(404)
        .json({ err: "Please Enter 4 Digit Id" });
    }

    if (
      panelTypes.find(
        (panelType) =>
          panelType.panel_type_id === panel_type_id,
      )
    ) {
      return res
        .status(404)
        .json({ err: "Id already exists" });
    }

    const newPanelType = new PanelType({
      panel_type_id,
      panel_type,
      created_by: user.name,
      updated_by: "",
      deleted_by: "",
      is_deleted: true,
    });

    await newPanelType.save();
    res.status(200).json(newPanelType);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ err: err.message });
  }
};

module.exports.updatePanelType = async (req, res) => {
  const id = req.params.id;
  const updatedPanelType = req.body.panel_type;

  try {
    const updatePanelType = await PanelType.findOne({
      panel_type_id: id,
    });

    updatePanelType.panel_type = updatedPanelType;
    updatePanelType.is_deleted = updatePanelType.is_deleted;

    updatePanelType.save();

    res.status(200).json({
      message: "Successfully updated",
      updatePanelType,
    });

    // panelLevel.remove();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updatePanelTypeIsAction = async (
  req,
  res,
) => {
  const id = req.params.id;

  try {
    const updatePanelType = await PanelType.findOne({
      panel_type_id: id,
    });

    updatePanelType.panel_type = updatePanelType.panel_type;
    updatePanelType.is_deleted =
      !updatePanelType.is_deleted;

    updatePanelType.save();

    res.status(200).json({
      message: "Successfully updated",
      updatePanelType,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deletePanelType = async (req, res) => {
  const id = req.params.id;
  try {
    await PanelType.findOneAndDelete({
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
