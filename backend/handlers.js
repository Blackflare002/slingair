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
    ? res.status(200).json({
        status: 200,
        message: "This is the server response. All flight I.Ds.",
        data: flightIds,
      })
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
    ? res.status(200).json({
        status: 200,
        message: "This is the server response. Flight by I.D.",
        data: result,
      })
    : res.status(404).json({ status: 404, data: "Not Found" });
  client.close();
};

const addReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("SlingAir");
    let newRes = { ...req.body, _id: uuidv4() };
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
      await db.collection("reservations").insertOne(newRes);
      // await db.collection("reservations").insertMany(reservations2);
      let query = { _id: req.body.flight, "seats.id": req.body.seat };
      let newValues = { $set: { "seats.$.isAvailable": false } };
      await db.collection("flights").updateOne(query, newValues);
      res.status(201).json({
        status: 201,
        message: "This is the server response. Reservation added.",
        data: newRes,
      });
      //store in localstorage
      // sessionStorage.setItem("reservation", newRes);
      //
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
  result
    ? res.status(200).json({
        status: 200,
        message: "This is the server response. All reservations.",
        data: result,
      })
    : res.status(404).json({ status: 404, data: "Not Found" });
  client.close();
};

const getSingleReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  let _id = req.params._id;
  await client.connect();
  const db = client.db("SlingAir");
  const result = await db.collection("reservations").findOne({ _id });
  result
    ? res.status(200).json({
        status: 200,
        message: "This is the server response. Reservation by I.D.",
        data: result,
      })
    : res.status(404).json({ status: 404, data: "Not Found" });
  client.close();
};

const deleteReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("SlingAir");
  let reservation = await db
    .collection("reservations")
    .findOne({ _id: req.params._id });
  let result = null;
  if (reservation) {
    let reservationFlight = reservation.flight;
    let reservationSeat = reservation.seat;
    // console.log("RES FLIGHT: ", reservationFlight);
    // console.log("RES SEAT: ", reservationSeat);
    // let flight = await db
    //   .collection("flights")
    //   .findOne({ _id: reservationFlight });
    // console.log("FLIGHT: ", flight);
    let query = { _id: reservationFlight, "seats.id": reservationSeat };
    let newValues = { $set: { "seats.$.isAvailable": true } };
    // console.log("QUERY: ", query);
    // console.log("VALUES: ", newValues);
    await db.collection("flights").updateOne(query, newValues);
    let _id = req.params._id;
    result = await db.collection("reservations").deleteOne({ _id });
  }
  console.log(result);
  result
    ? res.status(204).json({
        status: 204,
        message: "This is the server response. Reservation deleted.",
        data: result,
      })
    : res.status(404).json({ status: 404, data: null, message: "Not Found" });
  client.close();
};

const updateReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("SlingAir");
  await db.collection("reservations");
  let reservation = await db
    .collection("reservations")
    .findOne({ _id: req.params._id });
  let flight = await db.collection("flights").findOne({ _id: req.body.flight });
  let result = null;
  if (reservation) {
    //get the seat in the reservation
    let resSeat = reservation.seat;
    console.log("RES SEAT: ", resSeat);
    //find the reservation's seat in the flight data
    //mark it as available
    let flightSeat = null;
    flightSeat = flight.seats.find((el) => {
      return el.id === resSeat;
    });
    flightSeat.isAvailable = true;
    console.log("FLIGHT SEAT: ", flightSeat);
    //get the seat in the req
    //find it in the flight data
    //mark it as unavailable
    console.log("REQ: ", req.body.seat);
    let reqSeat = req.body.seat;
    let flightSeat2 = null;
    flightSeat2 = flight.seats.find((el) => {
      return el.id === reqSeat;
    });
    flightSeat2.isAvailable = false;
    console.log("FLIGHT SEAT 2: ", flightSeat2);
    //actually update the flight data! This changes the daa in the flights doc,
    //the seat originally listed in the reservation is changed back to isAvailable true.
    let query0 = { _id: reservation.flight, "seats.id": reservation.seat };
    let newValues0 = { $set: { "seats.$.isAvailable": true } };
    await db.collection("flights").updateOne(query0, newValues0);
    //This changes the seat specified in the req to isAvailable false.
    let query = { _id: req.body.flight, "seats.id": req.body.seat };
    let newValues = { $set: { "seats.$.isAvailable": false } };
    await db.collection("flights").updateOne(query, newValues);
    //This changes the reservation doc to match the req data.
    let query2 = { _id: req.params._id };
    let newValues2 = { $set: { ...req.body } };
    await db.collection("reservations").updateOne(query2, newValues2);
    //////
    result = true;
    reservation = await db
      .collection("reservations")
      .findOne({ _id: req.params._id });
  }
  //store in localstorage
  // sessionStorage.setItem("reservation", reservation);
  //do this in the frontend
  //
  result
    ? res.status(200).json({
        status: 200,
        message: "This is the server response. Reservation updated.",
        data: reservation,
      })
    : res.status(404).json({ status: 404, data: null, message: "Not Found" });
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservation,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
