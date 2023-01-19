const Grade = require("../models/grade");

module.exports.getAllGrade = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;

  try {
    const totalItems = await Grade.find().countDocuments();
    const grades = await Grade.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: "getting all data",
      role: grades,
      totalItems,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.find();

    res.status(200).json({
      message: "getting all data",
      role: grades,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getGradeById = async (req, res) => {
  const id = req.params.id;
  try {
    const grade = await Grade.findById(id);

    res.status(200).json(grade);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getGrades = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;
  const gradeId = req.query.gradeId;
  const gradeName = req.query.gradeName;

  try {
    if (!gradeId && !gradeName) {
      return res
        .status(404)
        .json({ err: "Please Enter the Search Value" });
    }

    if (gradeId || gradeName) {
      const totalItems = await Grade.find({
        $or: [{ grade_id: gradeId }, { grade: gradeName }],
      }).countDocuments();

      const grade = await Grade.find({
        $or: [{ grade_id: gradeId }, { grade: gradeName }],
      })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
      return res.status(200).json({
        message: "Successfully Getting Roles",
        role: grade,
        totalItems,
      });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.postAddGrade = async (req, res) => {
  const grade_id = req.body.grade_id;
  const grade = req.body.grade;
  const roleData = req.role_data;
  const user = req.user;

  try {
    const grades = await Grade.find();

    if (!grade) {
      return res.status(404).json({ err: "Invalid Input" });
    }

    if (!user) {
      return res
        .status(403)
        .json({ err: "You cannot create a grade" });
    }

    if (roleData.role_name !== "practice head") {
      return res
        .status(403)
        .json({ err: "You cannot add Grades" });
    }

    if (grades.find((grd) => grd.grade === grade)) {
      return res
        .status(404)
        .json({ err: "Panel Level is already Exists" });
    }

    const newGrades = new Grade({
      grade,
      created_by: user.name,
      updated_by: "",
      deleted_by: "",
      is_deleted: true,
    });

    await newGrades.save();
    res.status(200).json(newGrades);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.updateGrade = async (req, res) => {
  const id = req.params.id;
  const updatedGrade = req.body.grade;

  try {
    const updateGrade = await Grade.findOne({
      grade_id: id,
    });

    updateGrade.grade = updatedGrade;
    updateGrade.is_deleted = updateGrade.is_deleted;

    updateGrade.save();

    res.status(200).json({
      message: "Successfully updated",
      updateGrade,
    });

    // panelLevel.remove();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateGradeIsAction = async (req, res) => {
  const id = req.params.id;

  try {
    const updateGrade = await Grade.findOne({
      grade_id: id,
    });

    console.log(updateGrade);

    updateGrade.grade = updateGrade.grade;
    updateGrade.is_deleted = !updateGrade.is_deleted;

    updateGrade.save();

    res.status(200).json({
      message: "Successfully updated",
      updateGrade,
    });

    // panelLevel.remove();
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteGrade = async (req, res) => {
  const id = req.params.id;
  try {
    await Grade.findOneAndDelete({
      grade_id: id,
    });

    res
      .status(200)
      .json({ message: "Successfully deleted" });

    // panelLevel.remove();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
