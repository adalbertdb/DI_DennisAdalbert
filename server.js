require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL database!");
});

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    connection.query("SELECT * FROM users", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post("/users", (req, res) => {
    const { name, email } = req.body;
    connection.query(
        "INSERT INTO users (name, email) VALUES (?, ?)",
        [name, email],
        (err, results) => {
            if (err) throw err;
            res.json({ id: results.insertId, name, email });
        }
    );
});

app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    connection.query(
        "UPDATE users SET name = ?, email = ? WHERE id = ?",
        [name, email, id],
        (err, results) => {
            if (err) throw err;
            res.json({ message: "User updated successfully" });
        }
    );
});