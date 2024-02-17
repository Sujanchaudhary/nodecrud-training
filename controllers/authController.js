const bcrypt = require("bcrypt");
const { auth } = require("../model");
const { where } = require("sequelize");
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashpassword = await bcrypt.hash(password, 8);

    const registerUser = new auth({ email, password: hashpassword });
    await registerUser.save();

    res.status(200).json({
      success: true,
      message: "register user successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error while creating",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUser = await auth.findOne({ where: { email: req.body.email } });

    if (!isUser) {
      return res.status(400).json({
        success: false,
        message: "Email not found",
      });
    }

    const hashpassword = await bcrypt.compare(password, isUser.password);
    if (!hashpassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }
    let token = jwt.sign({ id: isUser.id }, "secret-key", { expiresIn: "1h" });
    res.status(200).json({
      success: true,
      token: `Bearer ${token}`,
      message: "success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error while creating",
    });
  }
};
