require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/Web");
const configViewEngine = require("./config/ViewEngine");

const app = express();

const host = process.env.HOST;
const port = process.env.PORT;

configViewEngine(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);

app.listen(port, host, () => {
  console.log(`Server listening at http://${host}:${port}`);
});
