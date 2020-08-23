const express = require("express");
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');



require('dotenv').config();
// import mongoose

//import routes
const categoryRoutes = require("./routes/category");
const keywordRoutes = require("./routes/keyword");



//db connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true    
}).then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// routes middleware

app.use("/api", categoryRoutes);
app.use("/api", keywordRoutes);


const port = process.env.PORT || 8001;

app.listen(port, () => {
    console.log("Listening on port 8001");
});
