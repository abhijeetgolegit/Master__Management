const jwt = require("jsonwebtoken");
const Role = require("../models/role");

const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(403)
      .send({ err: "Token is required" });
  }
  try {
    const user = await jwt.verify(
      token,
      "panel_management",
    );

    const userRoleData = await Role.findOne({
      role_id: user.role_id,
    });

    console.log(userRoleData);
    console.log(user);

    req.user = user;
    req.role_data = userRoleData;

    return next();
  } catch (err) {
    if (err.message === "jwt expired") {
      return res.status(401).send({ err: "Token Expired" });
    }
    if (err.message === "invalid signature") {
      return res.status(401).send({ err: "Invalid token" });
    }
  }
};

module.exports = verifyToken;
