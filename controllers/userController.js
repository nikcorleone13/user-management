const userMethods = require("../services/mongoService");
const bcrypt = require("bcrypt");

const userSignup = async (req, res) => {
  try {
    const userBody = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userBody.password, salt);

    const newUser = await userMethods.signup({
      ...userBody,
      password: hashedPassword,
    });
    if (newUser) {
      res.status(201).json({ message: "Successfully created user", newUser });
    }
    res.status(400).json({ message: "Unable to create" });
  } catch (error) {
    console.error("Error", error);
  }
};

const userLogin = async (req, res) => {
  const userDetails = req.body;
  console.log("login", userDetails);

  try {
    if (userDetails.email && userDetails.password) {
      const user = await userMethods.login(userDetails);
      console.log("user found", user);
      if (user) {
        const encryptedPassword = await bcrypt.compare(
          userDetails.password,
          user.password
        );
        if (encryptedPassword) {
          res.status(200).json({ message: "Login successful" });
          next();
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      }
    } else {
      res.status(404).json({ message: "No user Found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const changePassword = async (req, res) => {
  const { email, password, newPassword } = req.body;

  try {
    // validating body
    if (email && password && newPassword) {
      userDetails = {
        email: email,
        password: password,
      };
      const user = await userMethods.login(userDetails);
      console.log("user found", user);

      //   logging in
      if (user) {
        const encryptedPassword = await bcrypt.compare(password, user.password);

        if (encryptedPassword) {
          console.log("Login successful");
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(newPassword, salt);
          const userEmail = email;
          const new_Password = hashedPassword;
          const change = await userMethods.changePassword(
            userEmail,
            new_Password
          );

          //   changed ?
          if (change) {
            res.status(200).json({ message: "Password Changed Successfully" });
          } else {
            res.status(404).json({ message: "Error in changing" });
          }
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      }
    } else {
      res.status(404).json({ message: "Invalid Body" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateProfile = async (req, res) => {
  const { email, password, profilePicture } = req.body;

  try {
    // validating body
    if (email && password && profilePicture) {
      userDetails = {
        email: email,
        password: password,
      };
      const user = await userMethods.login(userDetails);

      //   logging in
      if (user) {
        const encryptedPassword = await bcrypt.compare(password, user.password);

        if (encryptedPassword) {
          console.log("Login successful");
          const userDetailsforDB = {
            email: email,
            newProfilePicture: profilePicture,
          };
          const changeImg = await userMethods.updateProfilePicture(
            userDetailsforDB
          );
          console.log("change", changeImg);

          //changed img?
          if (changeImg) {
            res.status(200).json({ message: "Profile Changed Successfully" });
          } else {
            res.status(404).json({ message: "Error in changing" });
          }
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      }
    } else {
      res.status(404).json({ message: "Invalid Body" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateContact = async (req, res) => {
  const { password, newPhone } = req.body;
  const email = req.params.email;
  try {
    // validating body
    if (email && password && newPhone) {
      userDetails = {
        email: email,
        password: password,
      };
      const user = await userMethods.login(userDetails);

      //   logging in
      if (user) {
        const encryptedPassword = await bcrypt.compare(password, user.password);

        if (encryptedPassword) {
          console.log("Login successful");
          const userDetailsforDB = {
            email: email,
            newPhone: newPhone,
          };
          const changeContact = await userMethods.updateContactDetails(
            userDetailsforDB
          );
          console.log("change", changeContact);

          //changed img?
          if (changeContact) {
            res.status(200).json({ message: "Contact Changed Successfully" });
          } else {
            res.status(404).json({ message: "Error in changing" });
          }
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      }
    } else {
      res.status(404).json({ message: "Invalid Body" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const findByPhone = async (req,res) => {
  const phoneNumber = req.params.phoneNumber;
  try {
    const user = await userMethods.findUserByPhoneNumber(phoneNumber);
    if (user) {
      res.status(200).json({message:`User with phone number ${phoneNumber} is`, user});
    } else {
      res.json(404).json({ message: "User Not Found " });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
module.exports = {
  userSignup,
  userLogin,
  changePassword,
  updateProfile,
  updateContact,
  findByPhone,
};
