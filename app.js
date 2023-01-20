const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const panelLevelRouter = require("./routes/panelLevels");
const roleRouter = require("./routes/roles");
const panelTypeRouter = require("./routes/panelTypes");
const gradeRouter = require("./routes/grades");
const candidateStatusRouter = require("./routes/candidateStatus");
const skillGroupRouter = require("./routes/skillGroup");
const auth = require("./middleware/auth");

const app = express();
const port = process.env.PORT || 8004;
const url =
  "mongodb+srv://avinash:jVzfWkq29eTIaUvJ@panelcluster.fvymwmx.mongodb.net/Panel_Management";

app.use(express.json());
app.use(cors());

mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to the Database"))
  .catch((err) => console.log(err));

app.use("/panel-level", auth, panelLevelRouter);
app.use("/role", auth, roleRouter);
app.use("/panel-type", auth, panelTypeRouter);
app.use("/grade", auth, gradeRouter);
app.use("/candidate-status", candidateStatusRouter);
app.use("/candidate-role", auth, skillGroupRouter);

app.listen(port, () => {
  console.log("listening on port " + port);
});
