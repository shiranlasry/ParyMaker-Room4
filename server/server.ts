import express from "express";
import connection from "./DB/database";
import dotenv from "dotenv"

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.static("client"));

import userRoutes from "./API/users/usersRoutes"
app.use("/api/users", userRoutes)


app.get("/api/check", (req, res) => {
  try {
    console.log("test")
    res.send({ ok: true, message: "hello" })
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message });
  }
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});



  