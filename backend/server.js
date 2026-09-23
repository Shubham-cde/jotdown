
const connectDB = require("./src/config/db");

require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
