import express from "express";

import dotenv from "dotenv"


dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.static("client"));

import userRoutes from "./API/users/usersRoutes"
app.use("/api/users", userRoutes)


app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});



  