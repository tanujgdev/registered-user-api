const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Registered User API is running"
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

module.exports = app;
