const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.post("/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        firstName,
        lastName,
        email,
        password: hashedPassword
    };

    let users = [];
    if (fs.existsSync("users.json")) {
        users = JSON.parse(fs.readFileSync("users.json"));
    }

    users.push(user);
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

    res.json({ message: "Registration successful!" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
