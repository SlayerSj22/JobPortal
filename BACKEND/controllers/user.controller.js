import { User } from "../models/users.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    // console.log(fullName,email,phoneNumber,password,role);

    const file =req.file;
    const fileUri= getDataUri(file);
    const cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content)

    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Please enter all the required fields",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exsists with this email address",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile:{
        profilePhoto:cloudinaryResponse.secure_url
      }
    });

    const newUser = {
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile:{
        profilePhoto:cloudinaryResponse.secure_url
      }
    };

    return res.status(200).json({
      message: "user registered successfully",
      success: true,
      user: newUser,
      // user send only important fields to front end later check logic from videotube
    });
  } catch (error) {
    console.log("Error in register route:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "please enter all the login credentials",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password", success: false });
    }

    //check role is correct or not

    if (role !== user.role) {
      return res.status(200).json({
        message: "Account doesnot exsist with current role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const resUser={
        fullName:user.fullName,
        email:user.email,
        phoneNumber:user.phoneNumber,
        role:user.role,
        profile:user.profile
    }

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `welcome back ${user.fullName} `,
        success: true,
        user:resUser

        // user same logic of register user
      });
  } catch (error) {
    console.log(error);
    // complete proper response format later like apiError
  }
};

const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
  
    const file = req.file;
    // cloudinary ayega idhar
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }
    // updating data

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    if(cloudResponse){
        user.profile.resume = cloudResponse.secure_url // save the cloudinary url
        user.profile.resumeOriginalName = file.originalname // Save the original file name
    }

    await user.save();

    let updatedUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,

    };

    // console.log(updatedUser.profile);
    

    return res.status(200).json({
      message: "Profile updated successfully.",
      user:updatedUser,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export { register, login, logout, updateProfile };
