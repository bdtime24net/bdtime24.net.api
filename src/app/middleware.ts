import express, { urlencoded } from "express";
import cookieParser from "express";
import morgan from "morgan";
import cors from "cors";
import { corsOrigin } from "../config";
import rateLimitMiddleware from '../middlewares/rateLimitMiddleware'
import session from 'express-session';


const middleware = [
  morgan("dev"),
  cors({
    origin: corsOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
  cookieParser(),
  // express.static("docs"),
  express.json({ limit: "50mb" }),
  urlencoded({ extended: true }),
  // rateLimitMiddleware,
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
];
export default middleware;
