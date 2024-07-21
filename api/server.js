const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("../app.js");
dotenv.config();

const PORT = process.env.PORT || 5000;

//Middleware

//Connect to MongoDB

const mongoURL = process.env.MONGO_URI.replace(
  /PASSWORD/,
  process.env.MONGO_PASSWORD
);

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection Established 😁 !!"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
