const express = require("express");
const app = express();

// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({extended: true}));

// const session = require("express-session");
// const sessionConfig = require("./config/cookie_session/cookie_session_config");
// app.use(session(sessionConfig.sessionConfig));

// const cookieParser = require("cookie-parser");
// app.use(cookieParser());

const router = require("./src/routers/router")(app);

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/", router); 

app.listen(3000, () => console.log("3000서버 연동"));