import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


//controller for user login 
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User doesn't  exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: 'Invalid Credentials' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Controller for user sign up
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //checking user already exist 
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        //check email and password are valid
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid Email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Enter strong password" })
        }

        //hashing /*Salt is random data appended to a password before it is processed by a cryptographic hash function */
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //create account 

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id)
        res.json({ success: true, token })



    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//controller for Admin login 

const adminLogin = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {

            const token = jwt.sign(
                {
                    email,
                    role: "admin",
                },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            return res.json({
                success: true,
                token,
            });

        } else {

            return res.json({
                success: false,
                message: "Invalid credentials",
            });

        }

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message,
        });

    }
};

export { loginUser, registerUser, adminLogin }

