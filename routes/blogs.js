const multer = require("multer");
const {
  createBlog,
  getBlogs,
  getBlogsById,
  deleteBlogsById,
} = require("../controllers/blogController");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const router = require("express").Router();

router.post("/create", upload.single("avatar"), createBlog);
router.get("/get", getBlogs);
router.get("/get/:id", getBlogsById);
router.delete("/delete/:id", deleteBlogsById);

module.exports = router;
