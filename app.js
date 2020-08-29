const express = require("express");
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();


//import routes
const bikeownerRoutes = require("./routes/bikeowner");
const policeOfficerRoutes = require("./routes/police_officer");
const reportRoutes = require("./routes/report");



//db connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false    
}).then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// routes middleware

// app.use("/api", logsRoutes);
app.use("/api", bikeownerRoutes);
app.use("/api", policeOfficerRoutes);
app.use("/api", reportRoutes);


const port = process.env.PORT || 8001;

app.listen(port, () => {
    console.log("Listening on port 8001");
});
