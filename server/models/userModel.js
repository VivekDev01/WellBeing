import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    confirmPassword: {
        type: String,
        required: [true, "Confirm your password"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isDoctor: {
        type: Boolean,
        default: false
    },
    isHospital: {
        type: Boolean,
        default: false
    },
    Notification: {
        type: Array,
        default: []
    },
    seenNotification: {
        type: Array,
        default: []
    },
});

const userModel = mongoose.model('user', userSchema);

export default userModel;

