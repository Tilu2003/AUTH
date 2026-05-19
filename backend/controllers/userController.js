import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerUser(req, res) {
    try {
        const data = req.body;
        const existing = await User.findOne({ email: data.email });
        if (existing) {
            return res.status(409).json({ error: "Email already registered" });
        }

        const hashed = await bcrypt.hash(data.password, 10);
        const user = new User({ ...data, password: hashed });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: "Registration failed" });
    }
}

export function loginUser(req, res) {
    const data = req.body;

    User.findOne({ email: data.email }).then((user) => {
        if (user == null) {
            res.status(404).json({ error: "User not found" });
        } else {
            const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);

            if (isPasswordCorrect) {
                const token = jwt.sign(
                    {
                        Name: user.Name,
                        email: user.email,
                        postal_code: user.postal_code,
                    },
                    process.env.JWT_SECRET 
                );

                res.json({ message: "Login successful", token: token });
            } else {
                res.status(401).json({ error: "Login failed" });
            }
        }
    });
}