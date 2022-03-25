"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../.env" });
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// use this data. Changes will persist until the server (backend) restarts.
const { flights, reservations } = require("./data");
// const { reservations2 } = require("./batchImport");

const getFlights = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("SlingAir");
  const result = await db.collection("flights").find().toArray();
  let flightIds = result.map((el) => {
    return el._id;
  });
  console.log(result);
  result
    ? res.status(200).json({ status: 200, data: flightIds })
    : res.status(404).json({ status: 404, data: "Not Found" });
  client.close();
};

const getFlight = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  let _id = req.params._id;
  await client.connect();
  const db = client.db("SlingAir");
  const result = await db.collection("flights").findOne({ _id });
  //   console.log(result);
  //   console.log(result.seats);

  result
    ? res.status(200).json({ status: 200, data: result })
    : res.status(404).json({ status: 404, data: "Not Found" });
  client.close();
};

const addReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("SlingAir");
    // let newRes = { ...req.body, id: uuidv4() };
    let flight = await db
      .collection("flights")
      .findOne({ _id: req.body.flight });
    //the flight property in the req.body contains the flight's ID, like "SA456"
    //the .findOne() looks in the DB for an "_id" property that matches req.body.flight, then returns that
    let check = flight.seats.find((el) => {
      return el.id === req.body.seat;
    }).isAvailable;
    //"flight" var is the relevant document in the DB with the "_id" property that matches req.body.flight
    //"check" var accesses the seats array within that doc, finds all elements inside that match el.id === req.body.seat,
    //that's the DB doc's id and the req.body's seat id, stored within the "seat" property,
    //then accesses the isAvailable property, a boolean, and returns that.
    if (check) {
      await db.collection("reservations").insertOne(req.body);
    // await db.collection("reservations").insertMany(reservations2);
    let query = { _id: req.body.flight, "seats.id": req.body.seat };
    let newValues = { $set: { "seats.$.isAvailable": false } };
    await db.collection("flights").updateOne(query, newValues);
    res.status(201).json({
      status: 201,
      message: "This is the server response.",
      // data: newRes,
    });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

const getReservations = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("SlingAir");
  const result = await db.collection("reservations").find().toArray();
  //   let ids = result.map((el) => {
  //     return el.id;
  //   });
  //   console.log(ids);
  result
    ? res.status(200).json({ status: 200, data: result })
    : res.status(404).json({ status: 404, data: "Not Found" });
  client.close();
};

const getSingleReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  let id = req.params.id;
  await client.connect();
  const db = client.db("SlingAir");
  const result = await db.collection("reservations").findOne({ id });
  result
    ? res.status(200).json({ status: 200, data: result })
    : res.status(404).json({ status: 404, data: "Not Found" });
  client.close();
};

const deleteReservation = (req, res) => {};

const updateReservation = (req, res) => {};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservation,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
