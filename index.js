const express = require("express");
const app = express();
const path = require('path');

const db = require("./model/index.js");
db.sequelize.sync({ force: false });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const createRoutes = require("./routes/blogs.js");
const authRoutes = require("./routes/auth.js");


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api", createRoutes);
app.use("/auth", authRoutes);

let PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is started in ${PORT}`);
});
