const express = require("express")

const bodyParser = require('body-parser');
//connect with mongodb
const { connection } = require("./helpers/dbConect");

const app = express();

const cors = require("cors");
//dotenv to access .env
require("dotenv").config();

const port = process.env.PORT || 3000

app.use(cors());

//to parse JSON and URLENCODED req.bodies
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
// app.use(bodyParser.json({ limit: '100mb' }));
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//     limit: '100mb',
//     extended: true
// }));


//set ejs folders virtually in public
app.use(express.static(__dirname + "/public"));

//send to routers
app.use("/", require("./routers/entryRouters"))


//call function connects to db
connection()

//let app to listen to port 
app.listen(port, () => {
    console.log(`App listening to ${port}`)
})