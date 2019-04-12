require('dotenv').config();
let express     = require("express"),
    load        = require("express-load"),
    bodyParser  = require("body-parser");
    
module.exports = () => {
    let app = express();

    app.set("host", process.env.HOST || "locahost");
    app.set("port", process.env.PORT || 3000);

    /* Config ejs */
    app.set("view engine", "ejs");
    app.set("views", "../app/views");

    app.use(express.static("../public"));
    app.use(bodyParser.json());

    load("modles", {cwd: "app"})
        .then("controllers")
        .then("routes")
        .into(app);

    return app;
};
