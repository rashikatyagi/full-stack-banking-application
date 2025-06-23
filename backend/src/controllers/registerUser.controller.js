import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { generateCustomerId } from "../utils/generateCustomerID.js";
import jwt from "jsonwebtoken";

// JWT generator
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const registerUser = asyncHandler( async (req, res) => {
    // take the data
    const {name, email, password} = req.body;

    // validation
    if(!name || !email || !password){
        throw new ApiError(400, "All fields are required!");
    }
    if([name, email, password].some( (field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required!");
    }

    // generate customer id
    const customerId = generateCustomerId();

    // check if user exists using -> customer id and email
    const existedUser = await User.findOne({
        $or : [{customerId}, {email}]
    })
    if(existedUser){
        throw new ApiError(400, "User already exists!");
    }

    // create user
    const user = await User.create({customerId, name, email, password});
    if(!user) {
        throw new ApiError(500, "Something went wrong while registering the user!");
    }

    const createdUser = await User.findById(user._id).select(
        "-password"
    );

    // generate JWT
    const token = generateToken(createdUser._id);

    // sending response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

export { registerUser }