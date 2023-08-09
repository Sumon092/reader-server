const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();

const port = process.env.PORT || 5000;

const bootstrap = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("database connected");
    app.listen(port, () =>
      console.log(`book server listening on port ${port}`)
    );
  } catch (error) {
    console.log(error.message);
  }
};
bootstrap();
