import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';



// //===============================================================================================
// // 몽고디비 사용하기 위해서 
// //===============================================================================================
// const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient;

// require('dotenv/config');

// let DB_RA;
// let RA_ClassKind ;
// let RA_Dues      ;
// let RA_HolyDay   ;
// let RA_Lecture   ;
// let RA_Member    ;
// let RA_WeekDay   ;


// //let Evaluate_Counter;
// // // env 파일 적용하는 몽고DB 접속 구문
// MongoClient.connect(process.env.DB_URL, function(err, client){
//   if (err) 
//     return console.log(err);
    
//   console.log('접속 성공혔슈');    

//   DB_RA = client.db('ReactAdmin');
  
//   RA_ClassKind  = DB_RA.collection('ClassKind');
//   RA_Dues       = DB_RA.collection('Dues');
//   RA_HolyDay    = DB_RA.collection('HolyDay');
//   RA_Lecture    = DB_RA.collection('Lecture');
//   RA_Member     = DB_RA.collection('Member');
//   RA_WeekDay    = DB_RA.collection('WeekDay');
// }) 
// //-----------------------------------------------------------------------------------------------

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
// import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
// import postRoutes from "./routes/posts.js";
// import { register } from "./controllers/auth.js";
// import { createPost } from "./controllers/posts.js";
// import { verifyToken } from "./middleware/auth.js";
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from "./data/index.js";

import {mockDataContacts} from "./data/mockData.js";      // 실제 데이타
import Members from "./schema/Members.js";

/* CONFIGURATIONS */
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors());
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/assets");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage });

/* ROUTES WITH FILES */
// app.post("/auth/register", upload.single("picture"), register);
// app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
// app.use("/auth", authRoutes);
// app.use("/users", userRoutes);
// app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    Members.insertMany(mockDataContacts);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));



// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />    
//     </BrowserRouter>
//   </React.StrictMode>
// );
