const Application = require("./app/server")
const Database = "mongodb://127.0.0.1:27017/storeDB"
new Application(5000, Database)