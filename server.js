let app = require("./config/express")();

app.listen(app.get("port"), () => {
    console.log(`App running in ${app.get("host")}:${app.get("port")}`);
});