require("dotenv").config({path: "./config.env"});
const express = require('express');
const app = express();
const cors = require('cors');

const connectDB = require('./server/config/db');
const errorHandler = require("./server/middleware/error");
connectDB();

// middlewares
app.use(express.json());
app.use( express.urlencoded({ extended: true }) );
app.use('/api/auth', require('./server/routes/auth'));
app.use('/api/user', require('./server/routes/user'));
app.use('/api/private', require('./server/routes/private'));
app.use(cors());

// Error handler should be last piece of middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
    console.log("Logged Error: " + err);
    server.close(() => process.exit(1));
})