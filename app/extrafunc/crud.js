const { User, Course, Review } = require('./dbConnection');

function AddUser(firstName, lastName, username, password) {
    
    const newUser = new User({
        fname: firstName,
        lname: lastName,
        email: username,
        password: password, // You should hash the password before storing it in the database for security
    });

    // Save the new user to the database
    newUser.save();
    return newUser._id
}

function findUser(userId){
    User.find({_id: userId})
            .exec()
            .then((user) => {
                console.log(user)
                return user
            })
            .catch((err)=>{
                console.log(err)
            });
}

async function getUserFirstName(userId) {
    try {
      const user = await User.find({ _id: userId }).exec();
      if (user.length > 0) {
        return user[0].fname;
      } else {
        return null; // Handle the case where no user is found
      }
    } catch (err) {
      console.error(err);
      throw err; // You can choose to handle the error here or propagate it
    }
}


async function getCourses() {
    try {
      const courses = await Course.find({}).exec();
      return courses;
    } catch (err) {
      console.error(err);
      throw err; // You can choose to handle the error here or propagate it
    }
}


  


module.exports = { AddUser, findUser, getUserFirstName, getCourses};