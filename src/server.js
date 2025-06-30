require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/Web");
const configViewEngine = require("./config/ViewEngine");
const connection = require("./config/Database");
const User = require("./models/User");

const app = express();

const host = process.env.HOST;
const port = process.env.PORT;

configViewEngine(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);

(async () => {
  try {
    await connection();
    app.listen(port, host, () => {
      console.log(`Server listening at http://${host}:${port}`);
    });
  } catch (error) {
    console.log("Closed server because ", error);
  }
})();
