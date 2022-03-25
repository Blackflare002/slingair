const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const flights = [
  {
    _id: "SA231",
    seats: [
      { id: "1A", isAvailable: true },
      { id: "1B", isAvailable: true },
      { id: "1C", isAvailable: true },
      { id: "1D", isAvailable: true },
      { id: "1E", isAvailable: true },
      { id: "1F", isAvailable: true },
      { id: "2A", isAvailable: true },
      { id: "2B", isAvailable: true },
      { id: "2C", isAvailable: true },
      { id: "2D", isAvailable: true },
      { id: "2E", isAvailable: true },
      { id: "2F", isAvailable: true },
      { id: "3A", isAvailable: true },
      { id: "3B", isAvailable: true },
      { id: "3C", isAvailable: true },
      { id: "3D", isAvailable: true },
      { id: "3E", isAvailable: true },
      { id: "3F", isAvailable: true },
      { id: "4A", isAvailable: true },
      { id: "4B", isAvailable: true },
      { id: "4C", isAvailable: true },
      { id: "4D", isAvailable: false },
      { id: "4E", isAvailable: true },
      { id: "4F", isAvailable: true },
      { id: "5A", isAvailable: true },
      { id: "5B", isAvailable: true },
      { id: "5C", isAvailable: true },
      { id: "5D", isAvailable: true },
      { id: "5E", isAvailable: true },
      { id: "5F", isAvailable: true },
      { id: "6A", isAvailable: true },
      { id: "6B", isAvailable: true },
      { id: "6C", isAvailable: true },
      { id: "6D", isAvailable: true },
      { id: "6E", isAvailable: true },
      { id: "6F", isAvailable: true },
      { id: "7A", isAvailable: true },
      { id: "7B", isAvailable: true },
      { id: "7C", isAvailable: true },
      { id: "7D", isAvailable: true },
      { id: "7E", isAvailable: true },
      { id: "7F", isAvailable: true },
      { id: "8A", isAvailable: true },
      { id: "8B", isAvailable: true },
      { id: "8C", isAvailable: true },
      { id: "8D", isAvailable: true },
      { id: "8E", isAvailable: true },
      { id: "8F", isAvailable: true },
      { id: "9A", isAvailable: true },
      { id: "9B", isAvailable: true },
      { id: "9C", isAvailable: true },
      { id: "9D", isAvailable: true },
      { id: "9E", isAvailable: true },
      { id: "9F", isAvailable: true },
      { id: "10A", isAvailable: true },
      { id: "10B", isAvailable: true },
      { id: "10C", isAvailable: true },
      { id: "10D", isAvailable: true },
      { id: "10E", isAvailable: true },
      { id: "10F", isAvailable: true },
    ],
  },
  {
    _id: "SA456",
    seats: [
      { id: "1A", isAvailable: true },
      { id: "1B", isAvailable: true },
      { id: "1C", isAvailable: true },
      { id: "1D", isAvailable: true },
      { id: "1E", isAvailable: true },
      { id: "1F", isAvailable: true },
      { id: "2A", isAvailable: true },
      { id: "2B", isAvailable: true },
      { id: "2C", isAvailable: true },
      { id: "2D", isAvailable: true },
      { id: "2E", isAvailable: true },
      { id: "2F", isAvailable: true },
      { id: "3A", isAvailable: true },
      { id: "3B", isAvailable: true },
      { id: "3C", isAvailable: true },
      { id: "3D", isAvailable: true },
      { id: "3E", isAvailable: true },
      { id: "3F", isAvailable: true },
      { id: "4A", isAvailable: true },
      { id: "4B", isAvailable: true },
      { id: "4C", isAvailable: true },
      { id: "4D", isAvailable: false },
      { id: "4E", isAvailable: true },
      { id: "4F", isAvailable: true },
      { id: "5A", isAvailable: true },
      { id: "5B", isAvailable: true },
      { id: "5C", isAvailable: true },
      { id: "5D", isAvailable: true },
      { id: "5E", isAvailable: true },
      { id: "5F", isAvailable: true },
      { id: "6A", isAvailable: true },
      { id: "6B", isAvailable: true },
      { id: "6C", isAvailable: true },
      { id: "6D", isAvailable: true },
      { id: "6E", isAvailable: true },
      { id: "6F", isAvailable: true },
      { id: "7A", isAvailable: true },
      { id: "7B", isAvailable: true },
      { id: "7C", isAvailable: true },
      { id: "7D", isAvailable: true },
      { id: "7E", isAvailable: true },
      { id: "7F", isAvailable: true },
      { id: "8A", isAvailable: true },
      { id: "8B", isAvailable: true },
      { id: "8C", isAvailable: true },
      { id: "8D", isAvailable: true },
      { id: "8E", isAvailable: true },
      { id: "8F", isAvailable: true },
      { id: "9A", isAvailable: true },
      { id: "9B", isAvailable: true },
      { id: "9C", isAvailable: true },
      { id: "9D", isAvailable: true },
      { id: "9E", isAvailable: true },
      { id: "9F", isAvailable: true },
      { id: "10A", isAvailable: true },
      { id: "10B", isAvailable: true },
      { id: "10C", isAvailable: true },
      { id: "10D", isAvailable: true },
      { id: "10E", isAvailable: true },
      { id: "10F", isAvailable: true },
    ],
  },
];

// console.log(flights);

const { v4: uuidv4 } = require("uuid");

const reservations = [
  {
    flight: "SA231",
    seat: "4D",
    givenName: "Marty",
    surname: "McFly",
    email: "marty@backfuture.com",
  },
  {
    flight: "SA231",
    seat: "4A",
    givenName: "Mori",
    surname: "Calliope",
    email: "Mori@hololive.com",
  },
  {
    _id: uuidv4(),
    flight: "SA231",
    seat: "4C",
    givenName: "Nyanners",
    surname: "McFly",
    email: "nyan@nyan.com",
  },
  {
    _id: uuidv4(),
    flight: "SA456",
    seat: "5D",
    givenName: "Korone",
    surname: "Inugami",
    email: "doog@hololive.com",
  },
  {
    _id: uuidv4(),
    flight: "SA456",
    seat: "4A",
    givenName: "Joe",
    surname: "Biden",
    email: "potus@whitehouse.gov",
  },
  {
    _id: uuidv4(),
    flight: "SA456",
    seat: "6B",
    givenName: "George",
    surname: "Washington",
    email: "wash@columbia.com",
  },
];

const batchImport = async () => {
  console.log(MONGO_URI);
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("SlingAir");
    // console.log("FLIGHTS: ", flights[0].seats[0].id);
    await db.collection("flights").insertMany(flights);
    // await db.collection("reservations").insertMany(reservations);
    console.log({
      status: 201,
      message: "This is the server response.",
      // data: flights,
    });
  } catch (err) {
    console.log({ status: 500, data: null, message: err.message });
  }
  client.close();
};

batchImport();

// module.exports = {reservations2}
