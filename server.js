require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("==========================================");
    console.log(" Registered User API Started");
    console.log(" Server: http://localhost:" + PORT);
    console.log(" API:    http://localhost:" + PORT + "/api");
    console.log("==========================================");
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
