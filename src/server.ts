// const express = require("express");
import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const app = express();

// for logs
app.use(morgan("dev"));
// client can send json instead of bits
app.use(express.json());
// encode query params into obj
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use((req, res, next) => {
//   req.somevalue = "doggy";
//   // now all apis next to it will have access to secret
//   next();
//   // or
//   // res.statusCode(401)
//   // res.json("Unauthenticated")
// });

app.get("/", (req, res) => {
  // throw new Error("Handled by express itself!");
  // next("this is error") // anything passed to next is error
  res.json({
    message: "Server running 🚀",
  });
});

// so all routes should perfix "/api"
app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signin);

// error handler (sync)
app.use((err, req, res, next) => {
  console.log(err?.message ?? err); // or err.toString()

  if (err.type === "auth") {
    res.status(401).json({
      message: "Unauthorized",
    });
  } else if (err.type === "input") {
    res.status(400).json({
      message: "Invalid input",
    });
  } else {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

export default app;
