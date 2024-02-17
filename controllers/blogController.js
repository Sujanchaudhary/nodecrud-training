const { blogs } = require("../model");

exports.createBlog = async (req, res) => {
  let data = {
    name: req.body.name,
    desc: req.body.desc,
    avatar: req.file.path
  };
  let createdBlog = await blogs.create(data);
  if (createdBlog) {
    res.status(200).json({
      data: createdBlog,
      message: "Created Successfully",
    });
  }

  console.log(createdBlog);
};

exports.getBlogs = async (req, res) => {
  let result = await blogs.findAll();
  res.status(200).send(result);
};

exports.getBlogsById = async (req, res) => {
  let result = await blogs.findByPk(req.params.id);
  res.status(200).send(result);
};

exports.deleteBlogsById = async (req, res) => {
  let result = await blogs.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
};

exports.updateBlog = async (req, res) => {
  // Get all the blog posts from the database and send them back to the client side
  let result = await blogs.update({
    ...req.body,
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({
    success: true,
    message: "Updated successfully",
  });
};
