const Role = require("../models/role");

module.exports.getRoles = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;

  try {
    const totalItems = await Role.find({}).countDocuments();
    const roles = await Role.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: "getting all roles",
      role: roles,
      totalItems,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();

    res.status(200).json({
      message: "getting all roles",
      role: roles,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getRoleById = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res
        .status(404)
        .json({ err: "Please enter the id" });
    }
    const roles = await Role.findById(id);

    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getRoleByRoleId = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res
        .status(404)
        .json({ err: "Please enter the id" });
    }
    const roles = await Role.findOne({ role_id: id });

    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getSearchRole = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;
  const roleId = req.query.roleId;
  const roleName = req.query.roleName;

  try {
    if (!roleId && !roleName) {
      return res
        .status(404)
        .json({ err: "Please Enter the Search Value" });
    }

    if (roleId || roleName) {
      const totalItems = await Role.find({
        $or: [
          { role_id: roleId },
          {
            role_name: {
              $regex: roleName,
              $options: "i",
            },
          },
        ],
      }).countDocuments();

      const role = await Role.find({
        $or: [
          { role_id: roleId },
          {
            role_name: {
              $regex: roleName,
              $options: "i",
            },
          },
        ],
      })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);

      // console.log("OR", role);

      return res.status(200).json({
        message: "Successfully Created the Role",
        role: role,
        totalItems,
      });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.postAddRoles = async (req, res) => {
  // const role_id = req.body.role_id;
  const role_name = req.body.role_name;
  const roleData = req.role_data;
  const user = req.user;
  console.log(user);

  try {
    const roles = await Role.find();

    if (!role_name) {
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
      roles.find((role) => role.role_name === role_name)
    ) {
      return res
        .status(404)
        .json({ err: "role name already exists" });
    }
    const newRole = new Role({
      role_name,
      created_by: user.name,
      updated_by: "",
      deleted_by: "",
      is_deleted: true,
    });

    await newRole.save();
    res.status(200).json(newRole);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ err: err.message });
  }
};

module.exports.updateRole = async (req, res) => {
  const id = req.params.id;
  const updatedRole = req.body.role_name;

  try {
    const updateRole = await Role.findOne({
      role_id: id,
    });

    updateRole.role_name = updatedRole;
    updateRole.is_deleted = updateRole.is_deleted;

    updateRole.save();

    res.status(200).json({
      message: "Successfully updated",
      updateRole,
    });

    // panelLevel.remove();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateRoleIsAction = async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const roleData = req.role_data;

  try {
    const updateRole = await Role.findOne({
      role_id: id,
    });

    if (updateRole.role_name === "practice head") {
      return res
        .status(400)
        .json({ err: "You cannot disable practice head" });
    }

    console.log(updateRole.role_name);

    updateRole.role_name = updateRole.role_name;
    updateRole.is_deleted = !updateRole.is_deleted;

    updateRole.save();

    res.status(200).json({
      message: "Successfully updated",
      updateRole,
    });

    // panelLevel.remove();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteRole = async (req, res) => {
  const id = req.params.id;
  try {
    const role = await Role.findById(id);

    role.remove();

    res
      .status(200)
      .json({ message: "Successfully deleted" });

    // panelLevel.remove();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
