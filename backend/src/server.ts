import { app } from "./app.js";
import { connectDB } from "./config/db.config.js";

const PORT = 3000;
const server = app.listen(PORT);
connectDB();
server.on("listening", () => {
  console.log(`Server is listening on port ${PORT}`);
  setInterval(() => {
    fetch("https://backend-gazg.onrender.com").then((res) => {
      // fetch("http://localhost:3000").then((res) => {
      console.log(res.status);
    }).catch(() => { });
  }, 60000);
});
