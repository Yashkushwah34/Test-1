import * as dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

mongoose
  .connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connection successfull"))
  .catch((err) => {
    console.log(err);
    return console.log("DB NOT CONNECTED PLEASE CHECK !!!");
  });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
