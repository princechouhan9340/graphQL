const { verifyPassword, hashPassword } = require("../crypto/crypto");
const User = require("../model/user.model");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

const SECRET_KEY = 'your_secret_key';

// Generate a token
function generateToken(payload) {
  const token = jwt.sign(payload, SECRET_KEY); // 1 hour expiry
  return token;
}

function decodeJWTToken(token) {
    return jwt.verify(token, SECRET_KEY);
  }


async function getUsers(){
    try {
        const users = await User.find();
        if (!users) {
            throw new Error("No users found");
        }
        return users;
    } catch (error) {
        throw new Error("Error fetching users: " + error.message);
    }
}

async function getUser(_id) {
    try {
        const user = await User.findOne({ _id: new objectId(_id) });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        throw new Error("Error fetching user: " + error.message);
    }
}

async function createUser(userData) {
    try {
        const { email, password } = userData;
        const user = await User.findOne({ email });
        if (user) {
            throw new Error("User already exists");
        }
        const hashedPassword = hashPassword(password);
        const newUser = new User({
            ...userData,
            password: hashedPassword,
        });
        return await newUser.save();
    } catch (error) {
        throw new Error("Error creating user: " + error.message);
    }
}

async function updateUser(userData) {
    try {
        const { email, password } = userData;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        if (password) {
            const hashedPassword = hashPassword(password);
            user.password = hashedPassword;
        }
        user.firstName = userData.firstName || user.firstName;
        user.lastName = userData.lastName || user.lastName;
        user.profileImg = userData.profileImg || user.profileImg;
        await user.save();
        return user;
    } catch (error) {
        throw new Error("Error updating user: " + error.message);
    }
}

async function loginUser (email, password) {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = verifyPassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        const token = generateToken({ _id: user._id, email: user.email });
        return {token}
    } catch (error) {
        throw new Error("Error logging in user: " + error.message);
    }
}

const deleteUser = async (email) => {
    try {
        const user = await User.findOneAndDelete({ email });
        if (!user) {
            throw new Error("User not found");
        }
        return { message: "User deleted successfully" };
    } catch (error) {
        throw new Error("Error deleting user: " + error.message);  
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    loginUser,
    deleteUser,
    decodeJWTToken
}


