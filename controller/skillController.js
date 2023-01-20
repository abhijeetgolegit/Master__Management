const Skill = require("../models/skills");

module.exports.getSkillAll = async (req, res) => {
  try {
    const skill = await Skill.find();

    res.status(200).json(skill);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getSkillById = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res
        .status(404)
        .json({ err: "Please enter the id" });
    }
    const skill = await Skill.findById(id);

    res.status(200).json(skill);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getSkillBySkillId = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res
        .status(404)
        .json({ err: "Please enter the id" });
    }
    const skill = await Skill.findOne({
      role_id: id,
    });

    res.status(200).json(skill);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.postAddSkill = async (req, res) => {
  const skill_id = req.body.skill_id;
  const skill_name = req.body.skill_name;
  const skill_group_id = req.body.skill_group_id;

  try {
    const skill = await Skill.find();

    if (!skill_id && !skill_name) {
      return res.status(404).json({ err: "Invalid Input" });
    }

    if (skill_group_id.length !== 4) {
      return res
        .status(404)
        .json({ err: "Please Enter 4 Digit Id" });
    }

    if (
      skill.find((skill) => skill.skill_id === +skill_id)
    ) {
      return res
        .status(404)
        .json({ err: "Id already exists" });
    }
    const newSkill = Skill({
      skill_id,
      skill_name,
      skill_group_id,
      created_by: "darshan",
      updated_by: "",
      is_deleted: false,
      deleted_by: "",
    });

    await newSkill.save();
    res.status(200).json(newSkill);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
