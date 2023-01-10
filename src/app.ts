import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import swaggerDocs from "./utils/swagger";
import express, { Express, Request, Response } from "express";
import userRouter from "./routes/user.route";
import practitionerRouter from "./routes/practitioner.route";
import { DB_USERNAME, DB_PASSWORD, PORT } from "./apiConfig";

const app: Express = express();
const port: number = (PORT && parseInt(PORT)) || 8000;

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use("/users", userRouter);
app.use("/practitioner", practitionerRouter);

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

mongoose
  .connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.s4zjjod.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port, () => {
      swaggerDocs(app, port);
      console.log(`Connected successfully on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
