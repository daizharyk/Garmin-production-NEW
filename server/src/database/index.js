const mongoose = require("mongoose")

module.exports = async () => {
  await mongoose.connect(process.env.MONGO_CONNECTION);
  console.log("MongoDb connected");
};

