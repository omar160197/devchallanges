// const express = require('express')
const { ApolloServer }  = require('apollo-server');
const mongoose= require('mongoose')
const typeDefs=require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers');



const multer = require("multer");
const path = require("path");
require("dotenv").config();


  /*------------------------------- Images-------------------------------*/
//image variable
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(path.join(__dirname,"images"));
      cb(null, path.join(__dirname, "images"));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        new Date().toLocaleDateString().replace(/\//g, "-") +
          "-" +
          file.originalname
      )
    }
  })
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png"
    )
      cb(null, true);
    else cb(null, false);
  };
  
  /*-------------------------------- create server --------------------------*/
const server = new ApolloServer({
  typeDefs,
  resolvers  
})

/*------------------------------- connect to DB-------------------------------*/
mongoose.connect(process.env.DB_URI)    
         .then(()=>{
            console.log("conneted to mySecondData");
  //listening on port
  const port = process.env.PORT || 5000;
  return server.listen({port: port});
})
.then((res) => {
    console.log(`Server running at ${res.url}`)
});

