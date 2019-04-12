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
    app.set("views", `${__dirname}/../app/views/pages`);

    app.use(express.static( `${__dirname}/../public`));
    app.use(bodyParser.json());

    load("models", {cwd: "app"})
        .then("controllers")
        .then("routes")
        .into(app);

    return app;
};
