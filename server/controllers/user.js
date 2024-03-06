import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginController = async (req, res) => {
    const { userName, password } = req.body;
    try {
        if (!(userName && password)) {
            return res.status(400).send({
                success: false,
                error: "Invalid input. Please enter username and password.",
            });
        }
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).send({
                success: false,
                error: "User doesn't exist. Please register.",
            });
        }

        if (!(user.userName === userName && bcrypt.compareSync(password, user.hashedPassword))) {
            return res.status(401).send({
                success: false,
                error: "Username or password is incorrect.",
            });
        }

        const token = jwt.sign({
            _id: user._id,
            userName: user.userName
        }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

        res.cookie("auth", token,{ secure: true, sameSite: 'Lax'}).send({
            success: true,
            data: "Logged in successfully.",
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            error: "Internal server error",
        });
    }
};

export const registerController = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        if (!(userName && email && password)) {
            return res.status(400).send({
                success: false,
                error: "Invalid input. Please provide username, email, and password.",
            });
        }

        const isUser = await User.findOne({ email });

        if (isUser) {
            return res.status(409).send({
                success: false,
                error: "User already exists.",
            });
        }

        const salt = bcrypt.genSaltSync(11);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = new User({ userName, email, hashedPassword });
        await newUser.save();

        res.send({
            success: true,
            data: "Registration successful",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error: "Internal server error",
        });
    }
};

export const getPostController = async (req, res) => {
    res.send({
        success:true,
        message: "Got Post Details"
    });
};
