require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const security = require("./routes/security");
const routes = require("./routes/routes");
const about = require("./routes/about");
const jobs = require("./routes/jobs");
const projects = require("./routes/projects");
const courses = require("./routes/courses");
const contact = require("./routes/contact");
const files = require("./routes/files");
const serveFavicon = require("serve-favicon");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

// app.use(serveFavicon(path.join(__dirname, "favicon.ico")));
app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.set("view engine", "pug");

app.use(security);

app.use(routes);

app.use("/about", about);

app.use("/experience", jobs);

app.use("/projects", projects);

app.use("/courses", courses);

app.use("/contact", contact);

app.use(files);

app.listen(port);