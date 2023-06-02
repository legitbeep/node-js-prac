// const app = require('./server');
import app from "./server";
import * as dotenv from "dotenv";
import config from "./config";

const PORT = config.port;

dotenv.config();

app.listen(PORT, () => {
  console.log(`Server started on port : ${PORT}`);
});
