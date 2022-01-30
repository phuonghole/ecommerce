require("dotenv").config();
const express = require("express");
const cors = require("cors");
const file = require("express-fileupload");
const cookies = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookies());
app.use(
  file({
    useTempFiles: true,
  })
);
const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);

const colors = require("colors");
const mongoose = require("mongoose");
mongoose
  .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log("> Connected...".bgCyan))
  .catch((err) =>
    console.log(
      `> Error while connecting to mongoDB : ${err.message}`.underline.red
    )
  );
const userRoute = require("./routers/userRoute");
app.use("/user", userRoute);
const categoryRoute = require("./routers/categoryRoute");
app.use("/api", categoryRoute);
const uploadRoute = require("./routers/uploadRoute");
app.use("/api", uploadRoute);
const productRoute = require("./routers/productRoute");
app.use("/api", productRoute);
const paymentRoute = require("./routers/paymentRoute");
app.use("/api", paymentRoute);


const path=require("path")
if(process.env.NODE_ENV === 'production'){
  app.use(express.static("client/build"))
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname, 'client','build',"index.html"))
  })
}