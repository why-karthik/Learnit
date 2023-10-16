// auth.js
// Replace this with your actual authorization logic.
const { User, Course, Review } = require('./dbConnection');

function isStrongPassword(password) {
    // Check if the password has at least 8 characters
    if (password.length < 8) {
        return false;
    }

    // Check if the password contains at least one numerical digit
    if (!/\d/.test(password)) {
        return false;
    }

    // Check if the password contains at least one special character
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
        return false;
    }

    // If all checks pass, the password is considered strong
    return true;
}


async function authorize(username, password) {
    try {
        const user = await User.findOne({ email: username }).exec();
        if (user && user.password === password) {
            console.log(user._id);
            return user._id;
        } else {
            console.log('User not found or incorrect password');
            return user._id;
        }
    } catch (err) {
        console.error(err);
        // Handle the error here
        return false;
    }
}


function validateForm(password, confirmPassword) {

    // Create a new user instance
    if (password === confirmPassword){
        if(isStrongPassword(password)){
            return true
        }
    }
    
}

module.exports = { authorize, validateForm };







