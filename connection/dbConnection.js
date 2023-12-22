require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const dbURI = process.env.DB_URI;

const makeConnection = async () => {
  await mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

module.exports = {makeConnection}