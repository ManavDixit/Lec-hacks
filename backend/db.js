import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const url =process.env.DATABASE_URL;
const ConnectToDb = () => {
  mongoose
    .connect(url)
    .then(() => console.log("connected to db"))
    .catch((error) => console.log(error));
};
export default ConnectToDb;