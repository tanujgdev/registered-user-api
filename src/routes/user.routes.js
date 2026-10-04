const express = require("express");

const {
    getUsers,
    getUserById,
    getUserByEmpCode,
    getUserByTelegramId,
    createUser,
    updateUser,
    deleteUser,
    login
} = require("../controllers/user.controller");

const router = express.Router();

// API Health
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Registered User API is running",
        version: "1.0.0"
    });
});

// GET
router.get("/users/emp/:emp_code", getUserByEmpCode);
router.get("/users/telegram/:telegram_id", getUserByTelegramId);
router.get("/users/:id", getUserById);
router.get("/users", getUsers);

// POST
router.post("/users", createUser);

// PUT
router.put("/users/:id", updateUser);

// DELETE
router.delete("/users/:id", deleteUser);

// LOGIN
router.post("/login", login);

module.exports = router;