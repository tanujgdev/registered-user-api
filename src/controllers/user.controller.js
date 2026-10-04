const pool = require("../config/db");
const bcrypt = require("bcrypt");

// GET ALL USERS
exports.getUsers = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM get_registered_users()"
        );

        res.status(200).json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to get users",
            error: error.message
        });
    }
};

// GET USER BY ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM get_registered_user_by_id($1::INTEGER)",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to get user",
            error: error.message
        });
    }
};

// GET USER BY EMP CODE
exports.getUserByEmpCode = async (req, res) => {
    try {
        const { emp_code } = req.params;

        const result = await pool.query(
            "SELECT * FROM get_registered_user_by_emp_code($1::TEXT)",
            [emp_code]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to get user",
            error: error.message
        });
    }
};

// GET USER BY TELEGRAM ID
exports.getUserByTelegramId = async (req, res) => {
    try {
        const { telegram_id } = req.params;

        const result = await pool.query(
            "SELECT * FROM get_registered_user_by_telegram_id($1::BIGINT)",
            [telegram_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to get user",
            error: error.message
        });
    }
};

// CREATE USER
exports.createUser = async (req, res) => {
    try {
        const {
            telegram_id,
            full_name,
            phone,
            email,
            emp_code,
            password_hash
        } = req.body;

        if (!full_name || !phone || !emp_code || !password_hash) {
            return res.status(400).json({
                success: false,
                message: "full_name, phone, emp_code and password_hash are required"
            });
        }

        await pool.query(
            "CALL insert_registered_user($1,$2,$3,$4,$5,$6)",
            [
                telegram_id || null,
                full_name,
                phone,
                email || null,
                emp_code,
                password_hash
            ]
        );

        res.status(201).json({
            success: true,
            message: "User created successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create user",
            error: error.message
        });
    }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            telegram_id,
            full_name,
            phone,
            email,
            emp_code,
            password_hash
        } = req.body;

        if (!full_name || !phone || !emp_code || !password_hash) {
            return res.status(400).json({
                success: false,
                message: "full_name, phone, emp_code and password_hash are required"
            });
        }

        await pool.query(
            "CALL update_registered_user($1,$2,$3,$4,$5,$6,$7)",
            [
                id,
                telegram_id || null,
                full_name,
                phone,
                email || null,
                emp_code,
                password_hash
            ]
        );

        res.status(200).json({
            success: true,
            message: "User updated successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update user",
            error: error.message
        });
    }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(
            "CALL delete_registered_user($1)",
            [id]
        );

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message
        });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { emp_code, password } = req.body;

        if (!emp_code || !password) {
            return res.status(400).json({
                success: false,
                message: "emp_code and password are required"
            });
        }

        const result = await pool.query(
            "SELECT * FROM get_user_for_login($1)",
            [emp_code]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid employee code or password"
            });
        }

        const user = result.rows[0];

        const match = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid employee code or password"
            });
        }

        delete user.password_hash;

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: user
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
};


// GET     http://localhost:5000/
// GET     http://localhost:5000/api

// GET     http://localhost:5000/api/users
// GET     http://localhost:5000/api/users/1
// GET     http://localhost:5000/api/users/emp/EMP001
// GET     http://localhost:5000/api/users/telegram/123456789

// POST    http://localhost:5000/api/users
// PUT     http://localhost:5000/api/users/1
// DELETE  http://localhost:5000/api/users/1

// POST    http://localhost:5000/api/login