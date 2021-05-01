import { connect } from "mongoose";

export const DBINIT = async () => {
  try {
    await connect(
      `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  } catch (err) {
    console.log("Error connecting to mongodb");
    console.log(err);
  }
};
