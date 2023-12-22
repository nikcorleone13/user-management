const User_Management = require("./models/userManagement");

const signup = async (userObj) => {
  try {
    const new_User = new User_Management({
      email: userObj.email,
      username: userObj.username,
      password: userObj.password,
      name: userObj.name,
      profilePictureURL: userObj.profilePictureURL,
    });
    const saved_User = await new_User.save();
    console.log("Saved", saved_User);
    return saved_User;
  } catch (error) {
    console.error("Error: ", error);
    return error;
  }
};

const login = async (userDetails) => {
  const login_Email = userDetails.email;
  const login_Password = userDetails.password;
  try {
    const userFound = await User_Management.findOne({ email: login_Email });
    return userFound;
  } catch (error) {
    return error;
  }
};

const changePassword = async (userEmail, new_Password) => {
  console.log("CREDS REC", userEmail, new_Password);
  try {
    const userFound = await User_Management.findOne({ email: userEmail });
    await userFound.updateOne({ password: new_Password });
    return userFound;
  } catch (error) {
    return error;
  }
};

const updateProfilePicture = async (userDetails) => {
  const login_Email = userDetails.email;
  const new_ProfilePicture = userDetails.newProfilePicture;
  try {
    const userFound = await User_Management.findOne({ email: login_Email });
    await userFound.updateOne({ profilePictureURL: new_ProfilePicture });
    return userFound;
  } catch (error) {
    return error;
  }
};

const updateContactDetails = async (userDetails) => {
  const login_Email = userDetails.email;
  const new_Phone = userDetails.newPhone;
  try {
    const userFound = await User_Management.findOne({ email: login_Email });
    await userFound.updateOne({ phone: new_Phone });
    return userFound;
  } catch (error) {
    return error;
  }
};

const findUserByPhoneNumber = async (userPhone) => {
  try {
    const userFound = await User_Management.findOne({ phone: userPhone });
    console.log("phone",userFound);
    return userFound;
  } catch (error) {
    return error;
  }
};

module.exports = {
  signup,
  login,
  changePassword,
  updateContactDetails,
  updateProfilePicture,
  findUserByPhoneNumber,
};
