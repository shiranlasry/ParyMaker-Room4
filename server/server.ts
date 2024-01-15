//server.ts

import express from "express";

import dotenv from "dotenv"
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();


const port = process.env.PORT;
app.use(cookieParser());

app.use(express.json());


import userRoutes from "./API/users/usersRoutes"
app.use("/api/users", userRoutes)
import partyRoutes from "./API/parties/partyRouters"
app.use("/api/parties", partyRoutes)


app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});



  