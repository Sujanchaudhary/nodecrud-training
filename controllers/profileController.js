const { profile } = require("../model");

// Edit user profile
exports.editProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, age } = req.body;

    const image = req.file.path;

    // Find the user's profile
    let profile = await profile.findOne({ userId });

    // If the user has no profile, return an error
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    // Update the profile with the new values
    profile.firstName = firstName || profile.firstName;
    profile.lastName = lastName || profile.lastName;
    profile.age = age || profile.age;
    profile.image = image || profile.image

    // Save the updated profile
    await profile.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profile, // Optionally, you can send the updated profile data back to the client
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error while updating profile",
      error: error.message, // Optionally, you can send the error message back to the client for debugging
    });
  }
};
