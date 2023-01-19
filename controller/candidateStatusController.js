const CandidateStatus = require("../models/candidateStatus");

module.exports.getAllCandidateStatus = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;

  try {
    const totalItems =
      await CandidateStatus.find().countDocuments();
    const candidateStatus = await CandidateStatus.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: "hi",
      role: candidateStatus,
      totalItems,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getAllCandidateStatuses = async (
  req,
  res,
) => {
  try {
    const candidateStatus = await CandidateStatus.find();

    res.status(200).json({
      message: "hi",
      role: candidateStatus,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getCandidateStatusById = async (
  req,
  res,
) => {
  const id = req.params.id;
  try {
    const candidateStatus = await CandidateStatus.findById(
      id,
    );

    res.status(200).json(candidateStatus);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getCandidateStatusByCandidateStatusId =
  async (req, res) => {
    const id = req.params.id;
    try {
      if (!id) {
        return res
          .status(404)
          .json({ err: "Please enter the id" });
      }
      console.log(+id);
      const candidateStatus = await CandidateStatus.findOne(
        {
          candidate_status_id: +id,
        },
      );

      res.status(200).json(candidateStatus);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  };

module.exports.getCandidateStatus = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 3;
  const candidateStatusId = req.query.candidateStatusId;
  const candidateStatusName = req.query.candidateStatusName;

  try {
    if (!candidateStatusId && !candidateStatusName) {
      return res
        .status(404)
        .json({ err: "Please Enter the Search Value" });
    }

    if (candidateStatusId || candidateStatusName) {
      const totalItems = await CandidateStatus.find({
        $or: [
          { candidate_status_id: candidateStatusId },
          { candidate_status: candidateStatusName },
        ],
      }).countDocuments();

      const candidateStatus = await CandidateStatus.find({
        $or: [
          { candidate_status_id: candidateStatusId },
          {
            candidate_status: candidateStatusName,
          },
        ],
      })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);

      return res.status(200).json({
        message: "Successfully Getting candidateStatuss",
        role: candidateStatus,
        totalItems,
      });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.postAddCandidateStatus = async (
  req,
  res,
) => {
  const candidate_status = req.body.candidate_status;
  const roleData = req.role_data;
  const user = req.user;

  try {
    const candidateStatus = await CandidateStatus.find();

    if (!candidate_status) {
      return res.status(404).json({ err: "Invalid Input" });
    }

    if (!user) {
      return res.status(403).json({
        err: "You cannot create a candidate Status",
      });
    }

    if (roleData.role_name !== "practice head") {
      return res
        .status(403)
        .json({ err: "You cannot add Roles" });
    }

    if (
      candidateStatus.find(
        (cs) =>
          cs.candidate_status.toLowerCase() ===
          candidate_status.toLowerCase(),
      )
    ) {
      return res.status(404).json({
        err: "Candidate Status is already Exists",
      });
    }

    const newCandidateStatus = new CandidateStatus({
      candidate_status,
      created_by: user.name,
      updated_by: "",
      deleted_by: "",
      is_deleted: true,
    });

    await newCandidateStatus.save();
    res.status(200).json(newCandidateStatus);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.updateCandidateStatus = async (req, res) => {
  const id = req.params.id;
  const updatedCandidateStatus = req.body.candidate_status;

  try {
    const updateCandidateStatus =
      await CandidateStatus.findOne({
        candidate_status_id: id,
      });

    if (!updateCandidateStatus) {
      throw new Error("Please Enter the Correct Data");
    }

    updateCandidateStatus.candidate_status =
      updatedCandidateStatus;
    updateCandidateStatus.is_deleted =
      updateCandidateStatus.is_deleted;

    updateCandidateStatus.save();

    return res.status(200).json({
      message: "Successfully updated",
      updateCandidateStatus,
    });

    // panelLevel.remove();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateCandidateStatusIsAction = async (
  req,
  res,
) => {
  const id = req.params.id;

  try {
    const updateCandidateStatus =
      await CandidateStatus.findOne({
        candidate_status_id: id,
      });

    if (!updateCandidateStatus) {
      throw new Error("Please Enter the Correct Data");
    }

    updateCandidateStatus.candidate_status =
      updateCandidateStatus.candidate_status;
    updateCandidateStatus.is_deleted =
      !updateCandidateStatus.is_deleted;

    updateCandidateStatus.save();

    res.status(200).json({
      message: "Successfully updated",
      updateCandidateStatus,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteCandidateStatus = async (req, res) => {
  const id = req.params.id;
  try {
    await CandidateStatus.findOneAndDelete({
      candidate_status_id: id,
    });

    res
      .status(200)
      .json({ message: "Successfully deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
