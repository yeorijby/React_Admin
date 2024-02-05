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


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />    
    </BrowserRouter>
  </React.StrictMode>
);
