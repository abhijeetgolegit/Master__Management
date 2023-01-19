const SkillGroup = require("../models/skillGroup");

module.exports.getSkillGroupAll = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;
  try {
    const totalItems = await SkillGroup.find(
      {},
    ).countDocuments();

    const skillGroup = await SkillGroup.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: "getting all roles",
      role: skillGroup,
      totalItems,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getAllSkillGroups = async (req, res) => {
  try {
    const roles = await SkillGroup.find();

    res.status(200).json({
      message: "getting all roles",
      role: roles,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getSkillGroupById = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res
        .status(404)
        .json({ err: "Please enter the id" });
    }
    const skillGroup = await SkillGroup.findById(id);

    res.status(200).json(skillGroup);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getSkillGroupBySkillId = async (
  req,
  res,
) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res
        .status(404)
        .json({ err: "Please enter the id" });
    }
    console.log(+id);
    const skillGroup = await SkillGroup.find({
      candidate_role_id: +id,
    });

    console.log(skillGroup);

    res.status(200).json(skillGroup);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getSearchSkillGroup = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 3;
  const skillGroupId = req.query.candidateRoleId;
  const skillGroupName = req.query.candidateRoleName;

  try {
    if (!skillGroupId && !skillGroupName) {
      return res
        .status(404)
        .json({ err: "Please Enter the Search Value" });
    }

    if (skillGroupId || skillGroupName) {
      const totalItems = await SkillGroup.find({
        $or: [
          { candidate_role_id: skillGroupId },
          { candidate_roles: skillGroupName },
        ],
      }).countDocuments();

      const skillGroup = await SkillGroup.find({
        $or: [
          { candidate_role_id: skillGroupId },
          { candidate_roles: skillGroupName },
        ],
      })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);

      // console.log("OR", role);

      return res.status(200).json({
        message: "Successfully Created the Role",
        role: skillGroup,
        totalItems,
      });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.postAddSkillGroup = async (req, res) => {
  const candidate_role_id = req.body.candidate_role_id;
  const candidate_roles = req.body.candidate_roles;
  const user = req.user;
  const roleData = req.role_data;

  try {
    const skillGroup = await SkillGroup.find();

    if (!candidate_roles) {
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
      skillGroup.find(
        (skill) =>
          skill.candidate_roles.toLowerCase() ===
          candidate_roles.toLowerCase(),
      )
    ) {
      return res
        .status(404)
        .json({ err: "Candidate Role already exists" });
    }
    const newSkillGroup = new SkillGroup({
      candidate_roles,
      created_by: user.name,
      updated_by: "",
      deleted_by: "",
      is_deleted: true,
    });

    await newSkillGroup.save();
    res.status(200).json(newSkillGroup);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.updateSkillGroup = async (req, res) => {
  const id = req.params.id;
  const updatedSkillGroup = req.body.candidate_roles;

  try {
    const updateSkillGroup = await SkillGroup.findOne({
      candidate_role_id: id,
    });

    updateSkillGroup.candidate_roles = updatedSkillGroup;
    updateSkillGroup.deleted_by = updateSkill.deleted_by;

    updateSkillGroup.save();

    res.status(200).json({
      message: "Successfully updated",
      updateSkillGroup,
    });

    // panelLevel.remove();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateSkillGroupIsAction = async (
  req,
  res,
) => {
  const id = req.params.id;

  try {
    const updateSkillGroup = await SkillGroup.findOne({
      candidate_role_id: id,
    });

    updateSkillGroup.candidate_roles =
      updateSkillGroup.candidate_roles;
    updateSkillGroup.deleted_by =
      !updateSkillGroup.deleted_by;

    updateSkillGroup.save();

    res.status(200).json({
      message: "Successfully updated",
      updateSkillGroup,
    });

    // panelLevel.remove();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteSkillGroup = async (req, res) => {
  const id = req.params.id;
  try {
    const skillGroup = await SkillGroup.findById(id);

    skillGroup.remove();

    res
      .status(200)
      .json({ message: "Successfully deleted" });

    // panelLevel.remove();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
