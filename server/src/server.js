const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db.config.js");
const errorHandler = require("./middleware/errorHandler.middleware.js");
const api = require("./routes/api.js");
require("dotenv").config();

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", api);
// Error Handler
app.use(errorHandler);

app.listen(process.env.PORT, async () => {
    await connectDB();
    console.log(`Server started at ${process.env.PORT}.`);
});
