import express from "express";

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server is running in ${process.env.PORT}`);
});

export default app;
