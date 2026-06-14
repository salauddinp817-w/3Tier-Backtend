const express = require("express");
const router = express.Router();
const db = require("../db");


// ✅ CREATE TABLE ON START (runs once when file is loaded)
db.query(`
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`, (err) => {
    if (err) {
        console.error("Error creating tasks table:", err);
    } else {
        console.log("Tasks table is ready");
    }
});


// GET all tasks
router.get("/", (req, res) => {
    db.query("SELECT * FROM tasks", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});


// ADD task
router.post("/", (req, res) => {
    const { title } = req.body;

    db.query("INSERT INTO tasks (title) VALUES (?)", [title], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Task added" });
    });
});


// DELETE task
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM tasks WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Task deleted" });
    });
});

module.exports = router;
