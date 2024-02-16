import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./user/routes.js";
import exploreRoutes from "./explore/routes.js";
import Hello from "./hello.js";
import FollowsRoute from "./followPost/routes.js";
import LikeDislikeRoute from "./likeDislike/routes.js";
import session from "express-session";
import "dotenv/config.js";
import userFollows from "./followUser/routes.js";
// import mongodb from "mongoose";
// import Hello from './hello';
//mongodb.connect("mongodb://localhost:27017/project");

// const FRONTEND_URL = "http://localhost:3000";
const FRONTEND_URL = "https://fluffy-blini-c4e220.netlify.app";
const DB_CONNECTION_STRING =
  "mongodb+srv://user-jae:jae123@cluster-myecologist.vnj6wrp.mongodb.net/flora-fauna?retryWrites=true&w=majority";

const CONNECTION_STRING = DB_CONNECTION_STRING;
mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
    console.log("Connection String: " + CONNECTION_STRING);
  })
  .catch((err) => {
    console.log("Connection failed");
    console.log(err);
  });

const app = express();

app.use(
  cors({
    credentials: true, //    cookie
    origin: FRONTEND_URL, // this needs to be replaced if we are deploying frontend and backend separately. set to localhost.
  })
);
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));
app.use(express.json()); // for parsing application/json

Hello(app);
userRoutes(app);
FollowsRoute(app);
exploreRoutes(app);
userFollows(app);

LikeDislikeRoute(app);

app.listen(4000);
